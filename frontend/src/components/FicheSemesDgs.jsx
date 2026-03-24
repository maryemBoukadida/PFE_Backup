import React, { useEffect, useState, useRef } from "react";
import {
  getFicheSemesDgs,
  enregistrerFicheSemesDgs,
  envoyerFicheSemesDgs
} from "./apiservices/api";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SignatureCanvas from "react-signature-canvas";

import "../styles/FicheSemesDgs.css";

/* ================= INITIAL DATA ================= */
const initialFicheDGS = {
  type: "fiche_semestrielle_dgs",
  titre: "Fiche Inspection Semestrielle DGS",

  date: "",
  designation: "",
  lieu_installation: "",
  technicien: "",
  signature: "",

  blocs: [
    {
      titre: "Propreté",
      elements: [
        { verification: "La fenêtre frontale de l’afficheur", normal: false, anomalie: false, observations: "" },
        { verification: "Boîtier de commande opérateur", normal: false, anomalie: false, observations: "" }
      ]
    },
    {
      titre: "Porte du bloc laser",
      elements: [
        { verification: "Examiner le joint de porte du bloc laser", normal: false, anomalie: false, observations: "" }
      ]
    },
    {
      titre: "Miroirs du bloc laser",
      elements: [
        { verification: "L’étalonnage du télémètre à laser", normal: false, anomalie: false, observations: "" },
        { verification: "Vérifier les miroirs de balayage", normal: false, anomalie: false, observations: "" },
        { verification: "Nettoyer les miroirs du laser", normal: false, anomalie: false, observations: "" },
        { verification: "Nettoyer les lentilles du laser", normal: false, anomalie: false, observations: "" }
      ]
    },
    {
      titre: "Boutons d’arrêt d’urgence",
      elements: [
        { verification: "Le fonctionnement d’arrêt d’urgence", normal: false, anomalie: false, observations: "" }
      ]
    },
    {
      titre: "Capteur de température",
      elements: [
        { verification: "Capteur de température", normal: false, anomalie: false, observations: "" }
      ]
    },
    {
      titre: "Autres vérifications",
      elements: [
        { verification: "Afficheur et bloc laser", normal: false, anomalie: false, observations: "" },
        { verification: "Vérifier les ventilateurs", normal: false, anomalie: false, observations: "" }
      ]
    }
  ]
};

export default function FicheSemesDgs() {
  const [fiche, setFiche] = useState(initialFicheDGS);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);

  const signatureRef = useRef();

  /* ================= FETCH ================= */
 useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getFicheSemesDgs();

      if (data && data.blocs) {
        setFiche(data);
        if (data.date) setDate(new Date(data.date));
      } else {
        // fallback si backend renvoie rien ou structure incorrecte
        setFiche(initialFicheDGS);
      }

    } catch (err) {
      console.error(err);
      setFiche(initialFicheDGS);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  /* ================= UPDATE ================= */
  const handleChange = (blocIndex, elementIndex, field, value) => {
    const updated = { ...fiche };

    const elem = updated.blocs[blocIndex].elements[elementIndex];

    if (field === "normal" && value) {
      elem.normal = true;
      elem.anomalie = false;
      elem.observations = "RAS";
    } else if (field === "anomalie" && value) {
      elem.normal = false;
      elem.anomalie = true;
      elem.observations = "";
    } else {
      elem[field] = value;
    }

    setFiche(updated);
  };

  /* ================= SAVE ================= */
 const handleSave = async () => {
  try {
    if (!fiche._id) {
      return alert("Erreur : ID fiche manquant");
    }

    const updated = {
      ...fiche,
      date: date ? date.toISOString() : fiche.date,
      signature: signatureRef.current?.isEmpty()
        ? ""
        : signatureRef.current.toDataURL()
    };

    await enregistrerFicheSemesDgs(fiche._id, updated);

    alert("Fiche enregistrée avec succès");
  } catch (err) {
    console.error(err);
    alert("Erreur enregistrement");
  }
};

  /* ================= SEND ================= */
  const handleSend = async () => {
  try {
    if (!fiche._id) {
      return alert("Erreur : ID fiche manquant");
    }

    if (!fiche.technicien || fiche.technicien.trim() === "") {
      return alert("Veuillez saisir le technicien");
    }

    await envoyerFicheSemesDgs(fiche._id);

    alert("Fiche envoyée avec succès");
  } catch (err) {
    console.error(err);
    alert("Erreur envoi");
  }
};

  /* ================= UI ================= */
  return (
    <div className="fiche-container">
      <h2>{fiche.titre}</h2>

      <div className="fiche-header">
        <input
          placeholder="Désignation"
          value={fiche.designation}
          onChange={(e) =>
            setFiche({ ...fiche, designation: e.target.value })
          }
        />

        <input
          placeholder="Lieu d’installation"
          value={fiche.lieu_installation}
          onChange={(e) =>
            setFiche({ ...fiche, lieu_installation: e.target.value })
          }
        />

        <DatePicker
          selected={date}
          onChange={(d) => {
            setDate(d);
            setFiche({ ...fiche, date: d });
          }}
          placeholderText="Choisir date"
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className="table-card">
        <table className="inspection-table">
          <thead>
            <tr>
              <th>Contrôle</th>
              <th>Normal</th>
              <th>Anomalie</th>
              <th>Observations</th>
            </tr>
          </thead>

          <tbody>
{fiche?.blocs?.map((bloc, bi) => (
                <React.Fragment key={bi}>
                <tr>
                  <td colSpan="4" className="section-title">
                    {bloc.titre}
                  </td>
                </tr>

                {bloc.elements.map((elem, ei) => (
                  <tr key={ei}>
                    <td>{elem.verification}</td>

                    <td>
                      <input
                        type="checkbox"
                        checked={elem.normal}
                        onChange={(e) =>
                          handleChange(bi, ei, "normal", e.target.checked)
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="checkbox"
                        checked={elem.anomalie}
                        onChange={(e) =>
                          handleChange(bi, ei, "anomalie", e.target.checked)
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        value={elem.observations}
                        onChange={(e) =>
                          handleChange(
                            bi,
                            ei,
                            "observations",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="obs-section">
        <h3>Observations générales</h3>
        <textarea
          value={fiche.observations}
          onChange={(e) =>
            setFiche({ ...fiche, observations: e.target.value })
          }
        />
      </div>

      <div className="technicien-section">
        <h3>Technicien</h3>
        <input
          value={fiche.technicien}
          onChange={(e) =>
            setFiche({ ...fiche, technicien: e.target.value })
          }
        />
      </div>

      <div className="signature-section">
        <h3>Signature</h3>
        <SignatureCanvas
          ref={signatureRef}
          penColor="black"
          canvasProps={{ width: 400, height: 150 }}
        />
        <button onClick={() => signatureRef.current.clear()}>
          Effacer
        </button>
      </div>

      <div className="button-section">
        <button onClick={handleSave}>Enregistrer</button>
        <button onClick={handleSend}>Envoyer</button>
      </div>
    </div>
  );
}