import React, { useEffect, useState, useRef } from 'react';
import { 
  getFicheSemesPostes, 
  enregistrerFicheSemesPostes, 
  envoyerFicheSemesPostes ,
  creerFicheSemesPostes
} from './apiservices/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SignatureCanvas from 'react-signature-canvas';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/FicheSemesPostes.css';
const initialFiche = {
  type: "fiche_semes_postes",
  titre: "FICHE SEMESTRIELLE DES POSTES",
  blocs: [
    {
      titre: "POSTE SST1",
      elements: [
        { verification: "Etat général", etat: "", interventions: "", observations: "" },
        { verification: "Cahier de suivi", etat: "", interventions: "", observations: "" },
        { verification: "Rangement, accessibilité et documentation", etat: "", interventions: "", observations: "" },
        { verification: "Propreté du sol, des murs et présence de rongeurs ou d'oiseaux", etat: "", interventions: "", observations: "" },
        { verification: "Etanchéité et climatisation", etat: "", interventions: "", observations: "" },
        { verification: "Schémas synoptiques et étiquetage", etat: "", interventions: "", observations: "" },
        { verification: "Contrôle autonomie alimentations N°1 et N°2 de rack", etat: "", interventions: "", observations: "" },
        { verification: "Contrôle autonomie alimentations spécifiques", etat: "", interventions: "", observations: "" },
        { verification: "Switch N°1 et N°2", etat: "", interventions: "", observations: "" },
        { verification: "Parafoudre L1 et L2", etat: "", interventions: "", observations: "" },
        { verification: "Contrôle caniveaux et présence des plaques de couverture", etat: "", interventions: "", observations: "" }
      ]
    },
    {
      titre: "POSTE SST2",
      elements: [
        { verification: "Etat général", etat: "", interventions: "", observations: "" },
        { verification: "Cahier de suivi", etat: "", interventions: "", observations: "" },
        { verification: "Rangement, accessibilité et documentation", etat: "", interventions: "", observations: "" },
        { verification: "Propreté du sol, des murs et présence de rongeurs ou d'oiseaux", etat: "", interventions: "", observations: "" },
        { verification: "Etanchéité et climatisation", etat: "", interventions: "", observations: "" },
        { verification: "Schémas synoptiques et étiquetage", etat: "", interventions: "", observations: "" },
        { verification: "Contrôle autonomie alimentations N°1 et N°2 de rack", etat: "", interventions: "", observations: "" },
        { verification: "Contrôle autonomie alimentations spécifiques", etat: "", interventions: "", observations: "" },
        { verification: "Switch N°1 et N°2", etat: "", interventions: "", observations: "" },
        { verification: "Parafoudre L1 et L2", etat: "", interventions: "", observations: "" },
        { verification: "Contrôle caniveaux et présence des plaques de couverture", etat: "", interventions: "", observations: "" }
      ]
    },
    {
      titre: "POSTE TC",
      elements: [
        { verification: "TGBT", etat: "", interventions: "", observations: "" },
        { verification: "Rangement et accessibilité", etat: "", interventions: "", observations: "" },
        { verification: "Contrôle autonomie alimentations spécifiques (IHM)", etat: "", interventions: "", observations: "" },
        { verification: "Composants para surtensions (IHM)", etat: "", interventions: "", observations: "" },
        { verification: "Test des composants de rechange (IHM)", etat: "", interventions: "", observations: "" },
        { verification: "Switch", etat: "", interventions: "", observations: "" }
      ]
    }
  ],
  observations_generales: "",
  date: "",
  technicien_operateures: "",
  signature: ""
};
export default function FicheSemesPostes() {
const [fiche, setFiche] = useState(initialFiche);
const [ficheId, setFicheId] = useState(null);
  const [date, setDate] = useState(null);
  const signatureRef = useRef();



 

  const handleChange = (blocIndex, elementIndex, champ, valeur) => {
  const newFiche = { ...fiche };
  newFiche.blocs[blocIndex].elements[elementIndex][champ] = valeur;
  setFiche(newFiche);
};

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    hover: { scale: 1.03, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' },
  };
const renderBloc = (bloc, bi) => (
  <div key={bi} className="bloc">
    <h3>{bloc.titre}</h3>

    <table>
      <thead>
        <tr>
          <th>Element</th>
          <th>Etat</th>
          <th>Interventions</th>
          <th>Observations</th>
        </tr>
      </thead>

      <tbody>
        {bloc.elements.map((el, ei) => (
          <tr key={ei}>
            <td>{el.verification}</td>

            <td>
              <select
                value={el.etat}
                onChange={(e) =>
                  handleChange(bi, ei, "etat", e.target.value)
                }
              >
                <option value=""></option>
                <option value="OK">OK</option>
                <option value="HS">HS</option>
                <option value="A_VERIFIER">A vérifier</option>
              </select>
            </td>

            <td>
              <input
                value={el.interventions}
                onChange={(e) =>
                  handleChange(bi, ei, "interventions", e.target.value)
                }
              />
            </td>

            <td>
              <input
                value={el.observations}
                onChange={(e) =>
                  handleChange(bi, ei, "observations", e.target.value)
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


  // Enregistrer la fiche
const handleSave = async () => {
  try {
    const ficheToSend = {
      ...fiche,
      date: date || new Date(),
      signature: signatureRef.current
        ? signatureRef.current.toDataURL()
        : ""
    };

    let res;

    if (ficheId) {
      res = await enregistrerFicheSemesPostes(ficheId, ficheToSend);
    } else {
      res = await creerFicheSemesPostes(ficheToSend);
    }

    setFicheId(res._id);
    alert("Fiche enregistrée ✅");

  } catch (err) {
    console.error("ERREUR BACK :", err.response?.data || err);
    alert("Erreur enregistrement ❌");
  }
};

  // Envoyer la fiche
 const handleSend = async () => {
  if (!ficheId) {
    alert("Veuillez enregistrer d'abord");
    return;
  }

  try {
    await envoyerFicheSemesPostes(ficheId);
    alert("Fiche envoyée ✅");
  } catch (err) {
    console.error(err);
    alert("Erreur envoi ❌");
  }
};

  return (
    <motion.div className="fiche-container" variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <div className="fiche-header">
        <h2>
          Fiche Inspection Semestrielle des Postes
          {date && <span className="date-affiche"> - {date.toLocaleDateString()}</span>}
        </h2>
        <DatePicker
  selected={date}
  onChange={(d) => {
    setDate(d);
    setFiche({ ...fiche, date: d });
  }}
  dateFormat="dd/MM/yyyy"
  placeholderText="Choisir la date"
/>
      </div>

      {/* POSTES */}
      <AnimatePresence>
        {fiche.blocs.map((bloc, index) => renderBloc(bloc, index))}
      </AnimatePresence>

      {/* Observations générales */}
      <div className="obs-section">
        <h3>Observations Générales</h3>
        <textarea
          value={fiche.observations_generales}
          onChange={(e) => setFiche({ ...fiche, observations_generales: e.target.value })}
        />
      </div>

      {/* Technicien opérateur */}
      <div className="technicien-section">
        <h3>Technicien opérateur</h3>
        <input
          type="text"
          value={fiche.technicien_operateures || ''}
          onChange={(e) => setFiche({ ...fiche, technicien_operateures: e.target.value })}
          placeholder="Nom du technicien"
        />
      </div>

      {/* Signature */}
      <div className="signature-section">
        <h3>Signature du technicien</h3>
        <SignatureCanvas
          penColor="black"
          canvasProps={{ width: 400, height: 150, className: 'signature-canvas' }}
          ref={signatureRef}
        />
        <button className="clear-btn" onClick={() => signatureRef.current.clear()}>
          Effacer
        </button>
      </div>

      {/* Boutons Enregistrer et Envoyer */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button className="clear-btn" onClick={handleSave} style={{ backgroundColor: '#2ecc71' }}>
          Enregistrer
        </button>
        <button className="clear-btn" onClick={handleSend} style={{ backgroundColor: '#3498db' }}>
          Envoyer
        </button>
      </div>
    </motion.div>
  );
}