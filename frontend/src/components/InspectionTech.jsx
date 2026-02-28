import React, { useState, useEffect } from "react";
import { getInspections, envoyerInspectionTech} from "./apiservices/api";
import "../styles/InspectionTech.css";

export default function InspectionTech() {
  const [periode, setPeriode] = useState("JOURNALIERE");
  const [inspectionsData, setInspectionsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const allRows = inspectionsData.flatMap((insp, index) =>
    insp.inspections.map((item, i) => ({
      ...item,
      inspIndex: index,
      itemIndex: i,
    })),
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = allRows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(allRows.length / rowsPerPage);

  //condition verrouillage
  const [technicienType, setTechnicienType] = useState("matin");
  //const currentHour = new Date().getHours(); // retourne l'heure 0-23
  //Pour tester le verrouillage, simule 20h
  const currentHour = 22; // ou 21, 22…
  
  const hasMatinHS = allRows.some((item) => item.matin?.etat === "HS");
  const hasNuitHS = allRows.some((item) => item.nuit?.etat === "HS");
  
  // etat fiche envoyer
  const [ficheEnvoyee, setFicheEnvoyee] = useState(false);
/*
  useEffect(() => {
    const fetchData = async () => {
      try {
const data = await getInspections("A002", periode);
        setInspectionsData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
*/
//use effect 
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getInspections("A002", periode);

      if (data && data.inspections) {
        setInspectionsData(data.inspections);
      } else {
        // fallback : charger modèle admin si aucune sauvegarde
        const base = await getInspections();
        setInspectionsData(base);
      }

    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, [periode]);
  // fonction envoie notif
  const handleEnvoyer = async () => {
    try {
      const data = await envoyerInspectionTech({
        matricule: "A002",
        periode,
        inspections: inspectionsData,
      });
      alert(data.message || "Fiche envoyée !");
      setFicheEnvoyee(true);
    } catch (err) {
      console.error(err);
      alert(err.message || "Erreur serveur");
    }
  };
  
  // fonction corrigée pour le verrouillage
  const isLocked = (cellType, periodeJour) => {
    // Si la fiche est envoyée, tout est verrouillé
    if (ficheEnvoyee) return true;

    // Avant 20h
    if (currentHour < 20) {
      // Seules les colonnes du matin sont déverrouillées
      // Les colonnes de nuit sont verrouillées
      return periodeJour === "nuit";
    } 
    // À partir de 20h
    else {
      // Les colonnes du matin sont verrouillées
      // Les colonnes de nuit sont déverrouillées
      return periodeJour === "matin";
    }
  };

  // bouton enregistrer
  const handleEnregistrer = async () => {
    try {
      await envoyerInspectionTech({
        matricule: "A002",
        periode,
        inspections: inspectionsData,
        sauvegardeSeule: true,
      });
      alert("Travail enregistré !");
    } catch (err) {
      console.error(err);
      alert(err.message || "Erreur serveur");
    }
  };

  return (
    <div className="inspection-container">
      <h2>Fiche inspection journalière balisage</h2>

      

      {/* 🔹 Filtres */}
      <div className="inspection-header">
        <select value={periode} onChange={(e) => setPeriode(e.target.value)}>
          <option value="JOURNALIERE">Journalière</option>
          <option value="HEBDOMADAIRE">Hebdomadaire</option>
          <option value="Annuelle">Annuelle</option>
          <option value="Mensuelle">Mensuelle</option>
          <option value="Semestrielle">Semestrielle</option>
        </select>
      </div>

      {/* 🔹 Tableau */}
      <table className="inspection-table">
        <thead>
          <tr>
            <th>Zone</th>
            <th>Élément</th>
            <th>État Matin</th>
            {hasMatinHS && <th>Nbr NF</th>}
            <th>Observation</th>
            <th>Intervention</th>
            <th>État Nuit</th>
            {hasNuitHS && <th>Nbr NF</th>}
            <th>Observation</th>
            <th>Intervention</th>
          </tr>
        </thead>

        <tbody>
          {currentRows.map((item) => {
            const index = item.inspIndex;
            const i = item.itemIndex;

            return (
              <tr key={`${index}-${i}`}>
                <td>{item.zone}</td>
                <td>{item.element}</td>

                {/* ===== MATIN ===== */}
                <td>
                  <select
                    className={`etat-select ${
                      item.matin?.etat === "OK"
                        ? "etat-ok"
                        : item.matin?.etat === "HS"
                          ? "etat-hs"
                          : ""
                    }`}
                    value={item.matin?.etat || ""}
                    onChange={(e) => {
                      const newData = [...inspectionsData];
                      newData[index].inspections[i].matin.etat = e.target.value;

                      if (e.target.value === "HS") {
                        newData[index].inspections[i].matin.nbrNF = "";
                      } else {
                        newData[index].inspections[i].matin.nbrNF = "";
                      }

                      setInspectionsData(newData);
                    }}
                    disabled={isLocked("etat", "matin")}
                  >
                    <option value="">--</option>
                    <option value="OK">OK</option>
                    <option value="HS">HS</option>
                  </select>
                </td>

                {/* ✅ Nbr NF MATIN (affiché seulement si HS) */}
                {hasMatinHS && (
                  <td>
                    {item.matin?.etat === "HS" && (
                      <input
                        type="number"
                        placeholder="Nbr NF"
                        value={item.matin?.nbrNF || ""}
                        onChange={(e) => {
                          const newData = [...inspectionsData];
                          newData[index].inspections[i].matin.nbrNF =
                            e.target.value;
                          setInspectionsData(newData);
                        }}
                        disabled={isLocked("nbrNF", "matin")}
                      />
                    )}
                  </td>
                )}

                <td>
                  {item.matin?.etat === "OK" ? null : (
                    <input
                      type="text"
                      value={item.matin?.observation || ""}
                      onChange={(e) => {
                        const newData = [...inspectionsData];
                        newData[index].inspections[i].matin.observation =
                          e.target.value;
                        setInspectionsData(newData);
                      }}
                      disabled={isLocked("observation", "matin")}
                    />
                  )}
                </td>

                <td>
                  {item.matin?.etat === "OK" ? null : (
                    <input
                      type="text"
                      value={item.matin?.intervention || ""}
                      onChange={(e) => {
                        const newData = [...inspectionsData];
                        newData[index].inspections[i].matin.intervention =
                          e.target.value;
                        setInspectionsData(newData);
                      }}
                      disabled={isLocked("intervention", "matin")}
                    />
                  )}
                </td>

                {/* ===== NUIT ===== */}
                <td>
                  <select
                    className={`etat-select ${
                      item.nuit?.etat === "OK"
                        ? "etat-ok"
                        : item.nuit?.etat === "HS"
                          ? "etat-hs"
                          : ""
                    }`}
                    value={item.nuit?.etat || ""}
                    onChange={(e) => {
                      const newData = [...inspectionsData];
                      newData[index].inspections[i].nuit.etat = e.target.value;

                      if (e.target.value === "HS") {
                        newData[index].inspections[i].nuit.nbrNF = "";
                      } else {
                        newData[index].inspections[i].nuit.nbrNF = "";
                      }

                      setInspectionsData(newData);
                    }}
                    disabled={isLocked("etat", "nuit")}
                  >
                    <option value="">--</option>
                    <option value="OK">OK</option>
                    <option value="HS">HS</option>
                  </select>
                </td>

                {/* ✅ Nbr NF NUIT */}
                {hasNuitHS && (
                  <td>
                    {item.nuit?.etat === "HS" && (
                      <input
                        type="number"
                        placeholder="Nbr NF"
                        value={item.nuit?.nbrNF || ""}
                        onChange={(e) => {
                          const newData = [...inspectionsData];
                          newData[index].inspections[i].nuit.nbrNF =
                            e.target.value;
                          setInspectionsData(newData);
                        }}
                        disabled={isLocked("nbrNF", "nuit")}
                      />
                    )}
                  </td>
                )}

                <td>
                  {item.nuit?.etat === "OK" ? null : (
                    <input
                      type="text"
                      value={item.nuit?.observation || ""}
                      onChange={(e) => {
                        const newData = [...inspectionsData];
                        newData[index].inspections[i].nuit.observation =
                          e.target.value;
                        setInspectionsData(newData);
                      }}
                      disabled={isLocked("observation", "nuit")}
                    />
                  )}
                </td>

                <td>
                  {item.nuit?.etat === "OK" ? null : (
                    <input
                      type="text"
                      value={item.nuit?.intervention || ""}
                      onChange={(e) => {
                        const newData = [...inspectionsData];
                        newData[index].inspections[i].nuit.intervention =
                          e.target.value;
                        setInspectionsData(newData);
                      }}
                      disabled={isLocked("intervention", "nuit")}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 🔹 Bouton Envoyer en dehors du tableau */}
      <div className="send-container">
        <button className="save-btn" onClick={handleEnregistrer}>
          Enregistrer
        </button>
        <button className="send-btn" onClick={handleEnvoyer}>
          Envoyer
        </button>
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Précédent
        </button>

        <span>
          Page {currentPage} / {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}