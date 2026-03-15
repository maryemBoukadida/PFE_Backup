import React, { useEffect, useState, useRef } from "react";
import {
  getFicheAnnVoie,
  enregistrerFicheAnnVoie,
  envoyerFicheAnnVoie
} from "./apiservices/api";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SignatureCanvas from "react-signature-canvas";
import '../styles/FicheVoieAnnuelle.css';

export default function FicheVoieAnnuelle() {

  const [fiche, setFiche] = useState(null);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const signatureRef = useRef();

  useEffect(() => {

    const fetchFiche = async () => {
      try {

        const data = await getFicheAnnVoie();

        setFiche(data);
        setDate(data.date ? new Date(data.date) : new Date());

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiche();

  }, []);

  if (loading) return <p>Chargement...</p>;
  if (!fiche) return <p>Aucune fiche trouvée</p>;



  // ================= MAJ PANNEAUX =================
  const updatePanneau = (panneau, element, field, value) => {

    const newFiche = { ...fiche };

    newFiche.panneaux[panneau][element][field] = value;

    setFiche(newFiche);

  };



  // ================= MAJ ROT =================
  const updateRot = (rot, element, field, value) => {

    const newFiche = { ...fiche };

    newFiche.ROTs[rot][element][field] = value;

    setFiche(newFiche);

  };



  const handleSave = async () => {

    try {

      const updated = {
        ...fiche,
        date: date ? date.toISOString() : fiche.date,
        signature: signatureRef.current.isEmpty()
          ? ""
          : signatureRef.current.toDataURL()
      };

      await enregistrerFicheAnnVoie(fiche._id, updated);

      alert("Fiche enregistrée avec succès");

    } catch (err) {
      console.error(err);
      alert("Erreur enregistrement");
    }

  };



  const handleSend = async () => {

    try {

      if (!fiche.techniciens_operateurs || fiche.techniciens_operateurs.length === 0) {
        return alert("Veuillez saisir les techniciens");
      }

      await envoyerFicheAnnVoie(fiche._id);

      alert("Fiche envoyée avec succès");

    } catch (err) {
      console.error(err);
      alert("Erreur envoi");
    }

  };



  return (
    <div className="fiche-container">

      <h2>Fiche Annuelle Voie</h2>
     <div className="date-section">
  <span className="date-display">
    {date ? date.toLocaleDateString() : ""}
  </span>
</div>

      {/* ================= PANNEAUX ================= */}
<div className="table-card" style={{ animationDelay: "0.1s" }}>
  <table className="inspection-table">
    <thead>
      <tr>
        <th>Panneaux indicateurs</th>
        <th>Panneau</th>
        <th>Élément</th>
        <th>État</th>
        <th>Interventions</th>
        <th>Observations</th>
      </tr>
    </thead>
    <tbody>
      {(() => {
        const panneauxEntries = Object.entries(fiche.panneaux);
        const totalRows = panneauxEntries.reduce(
          (acc, [_, elements]) => acc + Object.keys(elements).length,
          0
        );
        let firstRow = true;
        return panneauxEntries.map(([panneauNom, elements]) => {
          const elementEntries = Object.entries(elements);
          return elementEntries.map(([elementNom, elementData], index) => (
            <tr key={panneauNom + elementNom}>
              {firstRow && (
                <td rowSpan={totalRows} className="vertical-title">
                  Panneaux indicateurs
                </td>
              )}
              {firstRow && (firstRow = false)}

              {index === 0 && (
                <td rowSpan={elementEntries.length} style={{ fontWeight: "bold" }}>
                  {panneauNom}
                </td>
              )}

              <td>{elementNom}</td>

              <td>
                <select
                  value={elementData.Etat || ""}
                  onChange={(e) =>
                    updatePanneau(panneauNom, elementNom, "Etat", e.target.value)
                  }
                >
                  <option value="">--</option>
                  <option value="OK">OK</option>
                  <option value="HS">HS</option>
                </select>
              </td>

              <td>
                <input
                  type="text"
                  value={elementData.Interventions || ""}
                  onChange={(e) =>
                    updatePanneau(panneauNom, elementNom, "Interventions", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="text"
                  value={elementData.Observations || ""}
                  onChange={(e) =>
                    updatePanneau(panneauNom, elementNom, "Observations", e.target.value)
                  }
                />
              </td>
            </tr>
          ));
        });
      })()}
    </tbody>
  </table>
</div>

{/* ================= ROT ================= */}
<div className="table-card" style={{ animationDelay: "0.5s" }}>
  <table className="inspection-table">
    <thead>
      <tr>
        <th>ROTs</th>
        <th>ROT</th>
        <th>Élément</th>
        <th>État</th>
        <th>Interventions</th>
        <th>Observations</th>
      </tr>
    </thead>
    <tbody>
      {(() => {
        const rotEntries = Object.entries(fiche.ROTs);
        const totalRows = rotEntries.reduce(
          (acc, [_, elements]) => acc + Object.keys(elements).length,
          0
        );
        let firstRow = true;
        return rotEntries.map(([rotNom, elements]) => {
          const elementEntries = Object.entries(elements);
          return elementEntries.map(([elementNom, elementData], index) => (
            <tr key={rotNom + elementNom}>
              {firstRow && (
                <td rowSpan={totalRows} className="vertical-title">
                  ROTs
                </td>
              )}
              {firstRow && (firstRow = false)}

              {index === 0 && (
                <td rowSpan={elementEntries.length} style={{ fontWeight: "bold" }}>
                  {rotNom}
                </td>
              )}

              <td>{elementNom}</td>

              <td>
                <select
                  value={elementData.Etat || ""}
                  onChange={(e) =>
                    updateRot(rotNom, elementNom, "Etat", e.target.value)
                  }
                >
                  <option value="">--</option>
                  <option value="OK">OK</option>
                  <option value="HS">HS</option>
                </select>
              </td>

              <td>
                <input
                  type="text"
                  value={elementData.Interventions || ""}
                  onChange={(e) =>
                    updateRot(rotNom, elementNom, "Interventions", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="text"
                  value={elementData.Observations || ""}
                  onChange={(e) =>
                    updateRot(rotNom, elementNom, "Observations", e.target.value)
                  }
                />
              </td>
            </tr>
          ));
        });
      })()}
    </tbody>
  </table>
</div>



      {/* ================= DATE ================= */}

      <div style={{ marginTop: "15px" }}>

        <label>Date :</label>

        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          dateFormat="dd/MM/yyyy"
        />

      </div>



      {/* ================= OBS ================= */}

      <h3>Observations générales</h3>

      <textarea
        value={fiche.observations_generales}
        onChange={(e) =>
          setFiche({
            ...fiche,
            observations_generales: e.target.value
          })
        }
      />



      {/* ================= TECHNICIENS ================= */}

      <h3>Techniciens</h3>

      <input
        type="text"
        value={fiche.techniciens_operateurs}
        onChange={(e) =>
          setFiche({
            ...fiche,
            techniciens_operateurs: e.target.value
          })
        }
      />
      {/* ================= SIGNATURE ================= */}
      <h3>Signature</h3>

      <SignatureCanvas
        ref={signatureRef}
        penColor="black"
        canvasProps={{
          width: 400,
          height: 150,
          className: "signature-canvas"
        }}
      />

      <button onClick={() => signatureRef.current.clear()}>
        Effacer
      </button>

      {/* ================= BOUTONS ================= */}
      <div style={{ marginTop: "20px" }}>

        <button onClick={handleSave}>
          Enregistrer
        </button>

        <button onClick={handleSend}>
          Envoyer
        </button>

      </div>

    </div>
  );
}