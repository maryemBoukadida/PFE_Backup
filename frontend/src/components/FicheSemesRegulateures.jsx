import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SignatureCanvas from "react-signature-canvas";
import { getFicheSemesRegulateures,enregistrerFicheSemesRegulateures,envoyerFicheSemesRegulateures   } from "./apiservices/api";
import { motion, AnimatePresence } from "framer-motion";
import '../styles/FicheSemesRegulateures.css';

const FicheSemesRegulateures = () => {
  const [fiche, setFiche] = useState(null);
  const [loading, setLoading] = useState(true);
  const sigCanvas = useRef(null);

  useEffect(() => {
    chargerFiche();
  }, []);

  const chargerFiche = async () => {
    try {
      const data = await getFicheSemesRegulateures();
      const dateObj = data.date ? new Date(data.date) : null;
      setFiche({ ...data, date: dateObj });
    } catch (error) {
      console.error("Erreur chargement fiche :", error);
    } finally {
      setLoading(false);
    }
  };
  const handleEnregistrer = async () => {
    try {
      // Ajouter signature en base64 si nécessaire
      const signatureData = sigCanvas.current?.isEmpty() ? null : sigCanvas.current.toDataURL();
      const dataToSave = { ...fiche, signature: signatureData };
      const result = await enregistrerFicheSemesRegulateures(fiche._id, dataToSave);
      alert(result.message);
    } catch (error) {
      console.error("Erreur enregistrement :", error);
      alert("Erreur lors de l'enregistrement !");
    }
  };
  const handleEnvoyer = async () => {
  try {
    // Vérifier si la signature doit être sauvegardée avant l'envoi
    const signatureData = sigCanvas.current?.isEmpty() ? null : sigCanvas.current.toDataURL();
    const dataToSave = { ...fiche, signature: signatureData };

    // On sauvegarde d'abord
    await enregistrerFicheSemesRegulateures(fiche._id, dataToSave);

    // Puis on envoie
    const result = await envoyerFicheSemesRegulateures(fiche._id);
    alert(result.message);
  } catch (error) {
    console.error("Erreur envoi fiche :", error);
    alert("Erreur lors de l'envoi de la fiche !");
  }
};
  const handleBoucleChange = (categorie, nomBoucle, champ, valeur) => {
    setFiche((prev) => ({
      ...prev,
      boucles: {
        ...prev.boucles,
        [categorie]: {
          ...prev.boucles[categorie],
          [nomBoucle]: {
            ...prev.boucles[categorie][nomBoucle],
            [champ]: valeur,
          },
        },
      },
    }));
  };

  const handleBoucleSubFieldChange = (categorie, nomBoucle, subField, champ, valeur) => {
    setFiche((prev) => ({
      ...prev,
      boucles: {
        ...prev.boucles,
        [categorie]: {
          ...prev.boucles[categorie],
          [nomBoucle]: {
            ...prev.boucles[categorie][nomBoucle],
            [subField]: {
              ...prev.boucles[categorie][nomBoucle][subField],
              [champ]: valeur,
            },
          },
        },
      },
    }));
  };

  if (loading) return <p className="loading">Chargement...</p>;
  if (!fiche) return <p className="loading">Aucune fiche trouvée</p>;

  return (
    <div className="fiche-container">
      <div className="fiche-header">
        <h2>
          Fiche d'inspection Semestrielle Régulateurs
          {fiche.date && (
            <span className="fiche-date">({fiche.date.toLocaleDateString()})</span>
          )}
        </h2>
        
      </div>

      <AnimatePresence>
        {Object.entries(fiche.boucles).map(([categorie, boucles]) => (
          <motion.div
            key={categorie}
            className="fiche-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <h3>{categorie}</h3>
            {Object.entries(boucles).map(([nomBoucle, details]) => (
              <div key={nomBoucle} className="boucle-card">
                <h4>{nomBoucle}</h4>
                <div className="input-group">
                  <label>Type Puissance:<input type="text" value={details.Type_Puissance || ""} onChange={(e) => handleBoucleChange(categorie, nomBoucle, "Type_Puissance", e.target.value)} /></label>
                  <label>Longueur:<input type="text" value={details.Longueur_M || ""} onChange={(e) => handleBoucleChange(categorie, nomBoucle, "Longueur_M", e.target.value)} /></label>
                  <label>Continuité Théorique:<input type="text" value={details.Continuite_Theorique_Ohm || ""} onChange={(e) => handleBoucleChange(categorie, nomBoucle, "Continuite_Theorique_Ohm", e.target.value)} /></label>
                  <label>Continuité Mesurée:<input type="text" value={details.Continuite_Mesuree_Ohm || ""} onChange={(e) => handleBoucleChange(categorie, nomBoucle, "Continuite_Mesuree_Ohm", e.target.value)} /></label>
                  <label>Nombre de feux:<input type="text" value={details.Nombre_de_feux || ""} onChange={(e) => handleBoucleChange(categorie, nomBoucle, "Nombre_de_feux", e.target.value)} /></label>
                </div>

                <div className="input-group">
                  <h5>Résultats</h5>
                  <label>Isolement:<input type="text" value={details.Resultats?.Isolement_Ohm || ""} onChange={(e) => handleBoucleSubFieldChange(categorie, nomBoucle, "Resultats", "Isolement_Ohm", e.target.value)} /></label>
                  <label>Tension Test:<input type="text" value={details.Resultats?.Tension_test_Vcc || ""} onChange={(e) => handleBoucleSubFieldChange(categorie, nomBoucle, "Resultats", "Tension_test_Vcc", e.target.value)} /></label>
                  <label>Courant Test:<input type="text" value={details.Resultats?.Courant_test_Ac || ""} onChange={(e) => handleBoucleSubFieldChange(categorie, nomBoucle, "Resultats", "Courant_test_Ac", e.target.value)} /></label>
                </div>

                <div className="input-group">
                  <h5>Test</h5>
                  <label>Durée:<input type="text" value={details.Test?.Duree || ""} onChange={(e) => handleBoucleSubFieldChange(categorie, nomBoucle, "Test", "Duree", e.target.value)} /></label>
                </div>

                <div className="input-group">
                  <label>Parafoudres:<input type="text" value={details.Verification_parafoudres || ""} onChange={(e) => handleBoucleChange(categorie, nomBoucle, "Verification_parafoudres", e.target.value)} /></label>
                  <label>Commentaires:<input type="text" value={details.Commentaires || ""} onChange={(e) => handleBoucleChange(categorie, nomBoucle, "Commentaires", e.target.value)} /></label>
                </div>
              </div>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="verifications-generales">
        <h3>Vérifications générales</h3>
        <label>Remontées défaut:<input type="text" value={fiche.verifications_generales?.Remontees_defaut || ""} onChange={(e) => setFiche({ ...fiche, verifications_generales: { ...fiche.verifications_generales, Remontees_defaut: e.target.value } })} /></label>
        <label>Etat général:<input type="text" value={fiche.verifications_generales?.Etat_general_equipements || ""} onChange={(e) => setFiche({ ...fiche, verifications_generales: { ...fiche.verifications_generales, Etat_general_equipements: e.target.value } })} /></label>
        <label>Analyse archivage:<input type="text" value={fiche.verifications_generales?.Analyse_archivage_cahiers || ""} onChange={(e) => setFiche({ ...fiche, verifications_generales: { ...fiche.verifications_generales, Analyse_archivage_cahiers: e.target.value } })} /></label>
      </div>
<div className="fiche-info">
          <label>Date :</label>
          <DatePicker
            selected={fiche.date}
            onChange={(date) => setFiche({ ...fiche, date })}
            dateFormat="yyyy-MM-dd"
            className="datepicker"
          />
          <label>Technicien :</label>
          <input
            type="text"
            value={fiche.Technicien_Operateurs || ""}
            onChange={(e) => setFiche({ ...fiche, Technicien_Operateurs: e.target.value })}
          />
        </div>
      <div className="observations">
        <h3>Observations</h3>
        <textarea rows={3} value={fiche.observations || ""} onChange={(e) => setFiche({ ...fiche, observations: e.target.value })} />
      </div>

      <div className="signature-section">
        <h3>Signature</h3>
        <SignatureCanvas ref={sigCanvas} penColor="black" canvasProps={{ width: 400, height: 150, className: "sigCanvas" }} />
      </div>
<div className="action-buttons" style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
  <button className="btn-enregistrer" onClick={handleEnregistrer}>Enregistrer</button>
  <button className="btn-envoyer" onClick={handleEnvoyer}>Envoyer</button>
</div>


    </div>
  );
};

export default FicheSemesRegulateures;
