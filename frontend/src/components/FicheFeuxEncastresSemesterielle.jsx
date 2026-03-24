import React, { useEffect, useState, useRef } from 'react';
import {
  getFicheFeuxEncastres,
  enregistrerFicheFeuxEncastres,
  envoyerFicheFeuxEncastres,
  creerFicheFeuxEncastres 
} from './apiservices/api';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SignatureCanvas from 'react-signature-canvas';

import '../styles/FicheFeuxEncastres.css';

const initialFiche = {
  type: "feux_encastres_sem",
  emplacements: [
    {
      nom: "Fin de la Piste 27",
      elements: [
        { nom: "Etat général", etat: "", interventions: "", observations: "" },
        { nom: "Etanchéité de balise", etat: "", interventions: "", observations: "" },
        { nom: "Etat général des saignées", etat: "", interventions: "", observations: "" },
        { nom: "Scellement et calage", etat: "", interventions: "", observations: "" },
        { nom: "Propreté intérieure de l'embase", etat: "", interventions: "", observations: "" },
        { nom: "Connectique, étanchéité, propreté", etat: "", interventions: "", observations: "" },
        { nom: "Nettoyage des feux", etat: "", interventions: "", observations: "" },
        { nom: "Examen visuel d’état des prismes et d’intégrité", etat: "", interventions: "", observations: "" },
        { nom: "Etat de surface", etat: "", interventions: "", observations: "" },
        { nom: "Etat de fixation : présence des écrous et serrage", etat: "", interventions: "", observations: "" }
      ]
    },

    {
      nom: "Fin de la Piste 09",
      elements: [
        { nom: "Etat général", etat: "", interventions: "", observations: "" },
        { nom: "Etanchéité de balise", etat: "", interventions: "", observations: "" },
        { nom: "Etat général des saignées", etat: "", interventions: "", observations: "" },
        { nom: "Scellement et calage", etat: "", interventions: "", observations: "" },
        { nom: "Propreté intérieure de l'embase", etat: "", interventions: "", observations: "" },
        { nom: "Connectique, étanchéité, propreté", etat: "", interventions: "", observations: "" },
        { nom: "Nettoyage des feux", etat: "", interventions: "", observations: "" },
        { nom: "Examen visuel d’état des prismes et d’intégrité", etat: "", interventions: "", observations: "" },
        { nom: "Etat de surface", etat: "", interventions: "", observations: "" },
        { nom: "Etat de fixation : présence des écrous et serrage", etat: "", interventions: "", observations: "" }
      ]
    },

    {
      nom: "Seuil de la Piste 27",
      elements: [
        { nom: "Etat général", etat: "", interventions: "", observations: "" },
        { nom: "Etanchéité de balise", etat: "", interventions: "", observations: "" },
        { nom: "Etat général des saignées", etat: "", interventions: "", observations: "" },
        { nom: "Scellement et calage", etat: "", interventions: "", observations: "" },
        { nom: "Propreté intérieure de l'embase", etat: "", interventions: "", observations: "" },
        { nom: "Connectique, étanchéité, propreté", etat: "", interventions: "", observations: "" },
        { nom: "Nettoyage des feux", etat: "", interventions: "", observations: "" },
        { nom: "Examen visuel d’état des prismes et d’intégrité", etat: "", interventions: "", observations: "" },
        { nom: "Etat de surface", etat: "", interventions: "", observations: "" },
        { nom: "Etat de fixation : présence des écrous et serrage", etat: "", interventions: "", observations: "" }
      ]
    },

    {
      nom: "Seuil de la Piste 09",
      elements: [ { nom: "Etat général", etat: "", interventions: "", observations: "" },
        { nom: "Etanchéité de balise", etat: "", interventions: "", observations: "" },
        { nom: "Etat général des saignées", etat: "", interventions: "", observations: "" },
        { nom: "Scellement et calage", etat: "", interventions: "", observations: "" },
        { nom: "Propreté intérieure de l'embase", etat: "", interventions: "", observations: "" },
        { nom: "Connectique, étanchéité, propreté", etat: "", interventions: "", observations: "" },
        { nom: "Nettoyage des feux", etat: "", interventions: "", observations: "" },
        { nom: "Examen visuel d’état des prismes et d’intégrité", etat: "", interventions: "", observations: "" },
        { nom: "Etat de surface", etat: "", interventions: "", observations: "" },
        { nom: "Etat de fixation : présence des écrous et serrage", etat: "", interventions: "", observations: "" } ]
    },

    {
      nom: "Zone de touchée des roues",
      elements: [  { nom: "Etat général", etat: "", interventions: "", observations: "" },
        { nom: "Etanchéité de balise", etat: "", interventions: "", observations: "" },
        { nom: "Etat général des saignées", etat: "", interventions: "", observations: "" },
        { nom: "Scellement et calage", etat: "", interventions: "", observations: "" },
        { nom: "Propreté intérieure de l'embase", etat: "", interventions: "", observations: "" },
        { nom: "Connectique, étanchéité, propreté", etat: "", interventions: "", observations: "" },
        { nom: "Nettoyage des feux", etat: "", interventions: "", observations: "" },
        { nom: "Examen visuel d’état des prismes et d’intégrité", etat: "", interventions: "", observations: "" },
        { nom: "Etat de surface", etat: "", interventions: "", observations: "" },
        { nom: "Etat de fixation : présence des écrous et serrage", etat: "", interventions: "", observations: "" }]
    },

    {
      nom: "Axe de la Piste",
      elements: [ { nom: "Etat général", etat: "", interventions: "", observations: "" },
        { nom: "Etanchéité de balise", etat: "", interventions: "", observations: "" },
        { nom: "Etat général des saignées", etat: "", interventions: "", observations: "" },
        { nom: "Scellement et calage", etat: "", interventions: "", observations: "" },
        { nom: "Propreté intérieure de l'embase", etat: "", interventions: "", observations: "" },
        { nom: "Connectique, étanchéité, propreté", etat: "", interventions: "", observations: "" },
        { nom: "Nettoyage des feux", etat: "", interventions: "", observations: "" },
        { nom: "Examen visuel d’état des prismes et d’intégrité", etat: "", interventions: "", observations: "" },
        { nom: "Etat de surface", etat: "", interventions: "", observations: "" },
        { nom: "Etat de fixation : présence des écrous et serrage", etat: "", interventions: "", observations: "" } ]
    },

    {
      nom: "Retil",
      elements: [  { nom: "Etat général", etat: "", interventions: "", observations: "" },
        { nom: "Etanchéité de balise", etat: "", interventions: "", observations: "" },
        { nom: "Etat général des saignées", etat: "", interventions: "", observations: "" },
        { nom: "Scellement et calage", etat: "", interventions: "", observations: "" },
        { nom: "Propreté intérieure de l'embase", etat: "", interventions: "", observations: "" },
        { nom: "Connectique, étanchéité, propreté", etat: "", interventions: "", observations: "" },
        { nom: "Nettoyage des feux", etat: "", interventions: "", observations: "" },
        { nom: "Examen visuel d’état des prismes et d’intégrité", etat: "", interventions: "", observations: "" },
        { nom: "Etat de surface", etat: "", interventions: "", observations: "" },
        { nom: "Etat de fixation : présence des écrous et serrage", etat: "", interventions: "", observations: "" } ]
    },

    {
      nom: "CL EAST TAXI WAY",
      elements: [  { nom: "Etat général", etat: "", interventions: "", observations: "" },
        { nom: "Etanchéité de balise", etat: "", interventions: "", observations: "" },
        { nom: "Etat général des saignées", etat: "", interventions: "", observations: "" },
        { nom: "Scellement et calage", etat: "", interventions: "", observations: "" },
        { nom: "Propreté intérieure de l'embase", etat: "", interventions: "", observations: "" },
        { nom: "Connectique, étanchéité, propreté", etat: "", interventions: "", observations: "" },
        { nom: "Nettoyage des feux", etat: "", interventions: "", observations: "" },
        { nom: "Examen visuel d’état des prismes et d’intégrité", etat: "", interventions: "", observations: "" },
        { nom: "Etat de surface", etat: "", interventions: "", observations: "" },
        { nom: "Etat de fixation : présence des écrous et serrage", etat: "", interventions: "", observations: "" } ]
    },

    {
      nom: "CL WEST TAXI WAY",
      elements: [  { nom: "Etat général", etat: "", interventions: "", observations: "" },
        { nom: "Etanchéité de balise", etat: "", interventions: "", observations: "" },
        { nom: "Etat général des saignées", etat: "", interventions: "", observations: "" },
        { nom: "Scellement et calage", etat: "", interventions: "", observations: "" },
        { nom: "Propreté intérieure de l'embase", etat: "", interventions: "", observations: "" },
        { nom: "Connectique, étanchéité, propreté", etat: "", interventions: "", observations: "" },
        { nom: "Nettoyage des feux", etat: "", interventions: "", observations: "" },
        { nom: "Examen visuel d’état des prismes et d’intégrité", etat: "", interventions: "", observations: "" },
        { nom: "Etat de surface", etat: "", interventions: "", observations: "" },
        { nom: "Etat de fixation : présence des écrous et serrage", etat: "", interventions: "", observations: "" } ]
    }
  ],

  date: "",
  technicien_operateur: "",
  observations_generales: "",
  signature: ""
};
export default function FicheFeuxEncastresSemesterielle() {

const [fiche, setFiche] = useState(initialFiche);
const [ficheId, setFicheId] = useState(null);
 const sigCanvas = useRef(null);

 

useEffect(() => {
  const fetchFiche = async () => {
    const data = await getFicheFeuxEncastres();

    if (!data) return;

    const emplacements = data.emplacements?.length
      ? data.emplacements
      : initialFiche.emplacements;

    setFiche({
      ...initialFiche,
      ...data,
      emplacements
    });
  };

  fetchFiche();
}, []);

  if (!fiche) return <p>Chargement...</p>;

 const handleChange = (empIndex, elIndex, field, value) => {
  const newFiche = { ...fiche };

  newFiche.emplacements[empIndex].elements[elIndex][field] = value;

  setFiche(newFiche);
};

const handleSave = async () => {
  try {
    const signature =
      sigCanvas.current && !sigCanvas.current.isEmpty()
        ? sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
        : "";

    let updatedFiche = {
      ...fiche,
      signature
    };

    let result;

    if (!ficheId) {
      // ✅ SUPPRIMER L’ID POUR EVITER DUPLICATE KEY
      delete updatedFiche._id;

      result = await creerFicheFeuxEncastres(updatedFiche);
      setFicheId(result._id);

    } else {
      result = await enregistrerFicheFeuxEncastres(ficheId, updatedFiche);
    }

    setFiche(updatedFiche);

    alert("Fiche enregistrée ✅");

  } catch (err) {
    console.error("🔥 ERREUR FRONT :", err.response?.data || err);
    alert("Erreur enregistrement ❌");
  }
};

const handleSend = async () => {
  if (!ficheId) {
    return alert("Enregistrer d'abord !");
  }

  try {
    await envoyerFicheFeuxEncastres(ficheId);
    alert("Fiche envoyée ✅");
  } catch (err) {
    console.error("🔥 ERREUR SEND :", err.response?.data || err);
    alert("Erreur envoi ❌");
  }
};
 

  return (

    <div className="ficheContainer">

      <h2 className="ficheTitle">

        Fiche Feux Encastres Semestrielle

        {fiche.date && (
          <span> - {new Date(fiche.date).toLocaleDateString()}</span>
        )}

      </h2>

      <table className="ficheTable">

        <thead>

          <tr>

            <th>Emplacement</th>
            <th>Elément</th>
            <th>Etat</th>
            <th>Intervention</th>
            <th>Observations</th>

          </tr>

        </thead>

        <tbody>
  {fiche.emplacements?.map((emp, empIndex) => (
    <React.Fragment key={empIndex}>
      {emp.elements.map((el, elIndex) => (
        <tr key={elIndex}>
          
          {elIndex === 0 && (
            <td rowSpan={emp.elements.length}>
              {emp.nom}
            </td>
          )}

          <td>{el.nom}</td>

          <td>
            <select
              value={el.etat}
              onChange={(e) =>
                handleChange(empIndex, elIndex, "etat", e.target.value)
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
              value={el.interventions}
              onChange={(e) =>
                handleChange(empIndex, elIndex, "interventions", e.target.value)
              }
            />
          </td>

          <td>
            <input
              type="text"
              value={el.observations}
              onChange={(e) =>
                handleChange(empIndex, elIndex, "observations", e.target.value)
              }
            />
          </td>

        </tr>
      ))}
    </React.Fragment>
  ))}
</tbody>

      </table>

      <div className="infos">

     <div>
  <label>Date :</label>
  <DatePicker
    selected={fiche.date ? new Date(fiche.date) : null}
    onChange={(date) => setFiche({ ...fiche, date: date.toISOString() })}
  />
</div>

      <div>
  <label>Observations :</label>
  <textarea
    value={fiche.observations_generales}
    onChange={(e) =>
      setFiche({ ...fiche, observations_generales: e.target.value })
    }
  />
</div>

     <input
  type="text"
  value={fiche.technicien_operateur}
  onChange={(e) =>
    setFiche({ ...fiche, technicien_operateur: e.target.value })
  }
/>

        <div>

          <label>Signature :</label>

          <div className="signatureBox">

            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                width: 400,
                height: 150
              }}
            />

          </div>

        </div>

        <div className="buttons">

          <button
            className="btn btnClear"
            onClick={() => sigCanvas.current.clear()}
          >
            Effacer
          </button>

          <button
            className="btn btnSave"
            onClick={handleSave}
          >
            Enregistrer
          </button>

          <button
            className="btn btnSend"
            onClick={handleSend}
          >
            Envoyer
          </button>

        </div>

      </div>

    </div>

  );

}