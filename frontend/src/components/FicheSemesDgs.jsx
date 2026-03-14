import React, { useEffect, useState, useRef } from "react";
import {
  getFicheSemesDgs,
  enregistrerFicheSemesDgs,
  envoyerFicheSemesDgs
} from "./apiservices/api";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SignatureCanvas from "react-signature-canvas";

import '../styles/FicheSemesDgs.css';

export default function FicheSemesDgs() {
  const [fiche, setFiche] = useState(null);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);

  const signatureRef = useRef();

  useEffect(() => {
    const fetchFiche = async () => {
      try {
        const data = await getFicheSemesDgs();
        setFiche(data);

        if (data["Date"]) setDate(new Date(data["Date"]));
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

  const updateEtat = (section, element, field, value) => {
    const newFiche = { ...fiche };
    const data = newFiche["Contrôle"][section][element];

    if (field === "Normal" && value) {
      data.Normal = true;
      data.Anomalie = false;
      data.Observations = "RAS";
    } else if (field === "Anomalie" && value) {
      data.Normal = false;
      data.Anomalie = true;
      data.Observations = "";
    } else {
      data[field] = value;
    }
    setFiche(newFiche);
  };

  const updateEtatSimple = (element, field, value) => {
    const newFiche = { ...fiche };
    const data = newFiche["Contrôle"][element];

    if (field === "Normal" && value) {
      data.Normal = true;
      data.Anomalie = false;
      data.Observations = "RAS";
    } else if (field === "Anomalie" && value) {
      data.Normal = false;
      data.Anomalie = true;
      data.Observations = "";
    } else {
      data[field] = value;
    }
    setFiche(newFiche);
  };

  const renderEtat = (section, element) => {
    const data = fiche["Contrôle"][section][element];

    return (
      <tr key={element}>
        <td>{element}</td>
        <td>
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={data.Normal}
              onChange={(e) => updateEtat(section, element, "Normal", e.target.checked)}
            />
            <span className="checkmark"></span>
          </label>
        </td>
        <td>
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={data.Anomalie}
              onChange={(e) => updateEtat(section, element, "Anomalie", e.target.checked)}
            />
            <span className="checkmark"></span>
          </label>
        </td>
        <td>
          <input
            type="text"
            className="input-observation"
            value={data.Observations}
            onChange={(e) => updateEtat(section, element, "Observations", e.target.value)}
          />
        </td>
      </tr>
    );
  };

  const renderEtatSimple = (element) => {
    const data = fiche["Contrôle"][element];

    return (
      <tr key={element}>
        <td>{element}</td>
        <td>
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={data.Normal}
              onChange={(e) => updateEtatSimple(element, "Normal", e.target.checked)}
            />
            <span className="checkmark"></span>
          </label>
        </td>
        <td>
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={data.Anomalie}
              onChange={(e) => updateEtatSimple(element, "Anomalie", e.target.checked)}
            />
            <span className="checkmark"></span>
          </label>
        </td>
        <td>
          <input
            type="text"
            className="input-observation"
            value={data.Observations}
            onChange={(e) => updateEtatSimple(element, "Observations", e.target.value)}
          />
        </td>
      </tr>
    );
  };

  const renderSectionTitle = (title) => {
    return (
      <tr key={title}>
        <td colSpan="4" className="section-title">
          {title}
        </td>
      </tr>
    );
  };

  const handleSave = async () => {
    try {
      const updated = {
        ...fiche,
        "Date": date ? date.toISOString() : fiche["Date"],
        "Signature": signatureRef.current.isEmpty() ? "" : signatureRef.current.toDataURL()
      };
      await enregistrerFicheSemesDgs(fiche._id, updated);
      alert("Fiche enregistrée avec succès");
    } catch (err) {
      console.error(err);
      alert("Erreur enregistrement");
    }
  };

  const handleSend = async () => {
    try {
      if (!fiche["Technicien Operateures"] || fiche["Technicien Operateures"].trim() === "") {
        return alert("Veuillez saisir le technicien");
      }
      await envoyerFicheSemesDgs(fiche._id);
      alert("Fiche envoyée avec succès");
    } catch (err) {
      console.error(err);
      alert("Erreur envoi");
    }
  };

  return (
    <div className="fiche-container">
      <div className="fiche-header-top">
        <h2>Fiche Inspection Semestrielle DGS</h2>
        {date && <h3>Le : {date.toLocaleDateString()}</h3>}
      </div>

      <div className="fiche-header">
        <input
          type="text"
          placeholder="Désignation"
          value={fiche["Désignation"]}
          onChange={(e) => setFiche({ ...fiche, "Désignation": e.target.value })}
        />
        <input
          type="text"
          placeholder="Lieu d’installation"
          value={fiche["Lieu d’installation"]}
          onChange={(e) => setFiche({ ...fiche, "Lieu d’installation": e.target.value })}
        />
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
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
            {renderSectionTitle("Propreté")}
            {renderEtat("Propreté", "La fenêtre frontale de l’afficheur")}
            {renderEtat("Propreté", "Boîtier de commande opérateur")}

            {renderSectionTitle("Porte du bloc laser")}
            {renderEtat("Porte du bloc laser", "Examiner le joint de porte du bloc laser")}

            {renderSectionTitle("Miroirs du bloc laser")}
            {renderEtat("Miroirs du bloc laser", "L’étalonnage du télémètre à laser")}
            {renderEtat("Miroirs du bloc laser", "Vérifier les miroirs de balayage")}
            {renderEtat("Miroirs du bloc laser", "Nettoyer les miroir du laser")}
            {renderEtat("Miroirs du bloc laser", "Nettoyer les lentilles du laser")}

            {renderSectionTitle("Boutons d’arrêt d’urgence")}
            {renderEtat("Boutons d’arrêt d’urgence", "Le fonctionnement d’arrêt d’urgence")}

            {renderSectionTitle("Capteur de température")}
            {renderEtat("Capteur de température", "Capteur de température")}

            {renderSectionTitle("Autres vérifications")}
            {renderEtatSimple("Afficheur et bloc laser")}
            {renderEtatSimple("Vérifier les ventilateurs")}
          </tbody>
        </table>
      </div>

      <div className="obs-section">
        <h3>Observations générales</h3>
        <textarea
          value={fiche["Observations générales"]}
          onChange={(e) => setFiche({ ...fiche, "Observations générales": e.target.value })}
        />
      </div>

      <div className="technicien-section">
        <h3>Technicien Operateures</h3>
        <input
          type="text"
          value={fiche["Technicien Operateures"]}
          onChange={(e) => setFiche({ ...fiche, "Technicien Operateures": e.target.value })}
        />
      </div>

      <div className="signature-section">
        <h3>Signature</h3>
        <SignatureCanvas
          ref={signatureRef}
          penColor="black"
          canvasProps={{ width: 400, height: 150, className: "signature-canvas" }}
        />
        <button className="btn-clear" onClick={() => signatureRef.current.clear()}>Effacer</button>
      </div>

      <div className="button-section">
        <button className="btn-save" onClick={handleSave}>Enregistrer</button>
        <button className="btn-send" onClick={handleSend}>Envoyer</button>
      </div>
    </div>
  );
}