import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import SignatureCanvas from "react-signature-canvas";
import "react-datepicker/dist/react-datepicker.css";
//import "../styles/FicheTGBT.css";
import axios from "axios";
import {
  enregistrerFicheAnnTgbt,
  envoyerFicheAnnTgbt,
} from "./apiservices/api";

// ================= INITIAL DATA =================
const FICHE_TGBT_API = "http://localhost:5000/api/fiche-ann-tgbt";

const initialFiche = {
  date: new Date(),
  postes: [
    {
      nom: "POSTE SST1",
      elements: [
        { nom: "Propreté", etat: "", interventions: "", observations: "" },
        { nom: "Serrages des bornes aux niveau TGBT", etat: "", interventions: "", observations: "" },
        { nom: "Mesure de la prise de terre", etat: "", interventions: "", observations: "" },
        { nom: "Contrôle d'isolement au niveau TGBT", etat: "", interventions: "", observations: "" },
        { nom: "Continuités des conducteurs depuis TGBT", etat: "", interventions: "", observations: "" },
        { nom: "Continuités des liaisons équipotentielles", etat: "", interventions: "", observations: "" },
      ],
    },
    {
      nom: "POSTE SST2",
      elements: [
        { nom: "Propreté", etat: "", interventions: "", observations: "" },
        { nom: "Serrages des bornes aux niveau TGBT", etat: "", interventions: "", observations: "" },
        { nom: "Mesure de la prise de terre", etat: "", interventions: "", observations: "" },
        { nom: "Contrôle d'isolement au niveau TGBT", etat: "", interventions: "", observations: "" },
        { nom: "Continuités des conducteurs depuis TGBT", etat: "", interventions: "", observations: "" },
        { nom: "Continuités des liaisons équipotentielles", etat: "", interventions: "", observations: "" },
      ],
    },
  ],
  observations_generales: "",
  technicien_operateurs: "",
  signature: "",
};

export default function FicheTGBTAnnuelle() {
  const [fiche, setFiche] = useState(initialFiche);
  const [date, setDate] = useState(new Date());
  const [ficheId, setFicheId] = useState(null);

  const signatureRef = useRef();

  // ================= UPDATE ELEMENT =================
  const updateElement = (posteIndex, elementIndex, field, value) => {
    setFiche((prev) => {
      const updated = { ...prev };

      const postes = [...updated.postes];
      const elements = [...postes[posteIndex].elements];

      elements[elementIndex] = {
        ...elements[elementIndex],
        [field]: value,
      };

      postes[posteIndex] = {
        ...postes[posteIndex],
        elements,
      };

      return { ...updated, postes };
    });
  };

  // ================= SAVE =================
const handleSave = async () => {
  try {
    const updated = {
      ...fiche,
      date: date.toISOString(),
      signature: signatureRef.current.isEmpty()
        ? ""
        : signatureRef.current.toDataURL(),
    };

    let res;

    // 🔥 SI PAS D'ID → CREATE
    if (!fiche._id) {
      res = await axios.post(FICHE_TGBT_API, updated); // ⚠️ POST
    } else {
      res = await enregistrerFicheAnnTgbt(fiche._id, updated);
    }

    setFiche(res.data);
    setFicheId(res.data._id);

    alert("Fiche enregistrée ✅");
  } catch (err) {
    console.error(err);
    alert("Erreur enregistrement ❌");
  }
};

  // ================= SEND =================
  const handleSend = async () => {
    if (!ficheId) return alert("Enregistrer d'abord !");

    try {
      await envoyerFicheAnnTgbt(ficheId);
      alert("Fiche envoyée ✅");
    } catch (err) {
      console.error(err);
      alert("Erreur envoi ❌");
    }
  };

  // ================= UI =================
  return (
    <div className="fiche-container">
      <h2>Fiche Annuelle TGBT</h2>

      {/* DATE */}
      <div>
        <label>Date :</label>
        <DatePicker selected={date} onChange={(d) => setDate(d)} />
      </div>

      {/* TABLE */}
      <table className="table">
        <thead>
          <tr>
            <th>Élément</th>
            <th>État</th>
            <th>Interventions</th>
            <th>Observations</th>
          </tr>
        </thead>

        <tbody>
          {fiche.postes.map((poste, posteIndex) => (
            <React.Fragment key={poste.nom}>
              <tr>
                <td colSpan="4" className="poste">
                  {poste.nom}
                </td>
              </tr>

              {poste.elements.map((el, elIndex) => (
                <tr key={el.nom}>
                  <td>{el.nom}</td>

                  <td>
                    <select
                      value={el.etat}
                      onChange={(e) =>
                        updateElement(posteIndex, elIndex, "etat", e.target.value)
                      }
                    >
                      <option value="">--</option>
                      <option value="OK">OK</option>
                      <option value="HS">HS</option>
                    </select>
                  </td>

                  <td>
                    <input
                      value={el.interventions}
                      onChange={(e) =>
                        updateElement(
                          posteIndex,
                          elIndex,
                          "interventions",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <input
                      value={el.observations}
                      onChange={(e) =>
                        updateElement(
                          posteIndex,
                          elIndex,
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

      {/* OBSERVATIONS */}
      <div>
        <h3>Observations générales</h3>
        <textarea
          value={fiche.observations_generales}
          onChange={(e) =>
            setFiche({ ...fiche, observations_generales: e.target.value })
          }
        />
      </div>

      {/* TECHNICIEN */}
      <div>
        <h3>Technicien</h3>
        <input
          value={fiche.technicien_operateurs}
          onChange={(e) =>
            setFiche({ ...fiche, technicien_operateurs: e.target.value })
          }
        />
      </div>

      {/* SIGNATURE */}
      <div>
        <h3>Signature</h3>
        <SignatureCanvas
          ref={signatureRef}
          penColor="black"
          canvasProps={{ width: 400, height: 150 }}
        />
        <button onClick={() => signatureRef.current.clear()}>Effacer</button>
      </div>

      {/* BUTTONS */}
      <div>
        <button onClick={handleSave}>Enregistrer</button>
        <button onClick={handleSend}>Envoyer</button>
      </div>
    </div>
  );
}