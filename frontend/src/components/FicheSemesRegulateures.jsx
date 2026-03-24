import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SignatureCanvas from "react-signature-canvas";
import { getFicheSemesRegulateures,enregistrerFicheSemesRegulateures,envoyerFicheSemesRegulateures   } from "./apiservices/api";
import { motion, AnimatePresence } from "framer-motion";
import '../styles/FicheSemesRegulateures.css';
const createBoucle = () => ({
  Type_Puissance: "",
  Longueur_M: "",
  Continuite_Theorique_Ohm: "",
  Continuite_Mesuree_Ohm: "",
  Nombre_de_feux: "",
  Resultats: {
    Isolement_Ohm: "",
    Tension_test_Vcc: "",
    Courant_test_Ac: ""
  },
  Test: {
    Duree: ""
  },
  Verification_parafoudres: "",
  Commentaires: ""
});

const initialFiche = {
  type: "fiche_semestrielle_regulateurs",
  titre: "FICHE SEMESTRIELLE REGULATEURS",

  groupesRegulateurs: [
    {
      titre: "APPROCHE 09 CATI",
      boucles: {
        A1: createBoucle(),
        A2: createBoucle()
      }
    },
    {
      titre: "APPROCHE 27 CATI",
      boucles: {
        A3: createBoucle(),
        A4: createBoucle()
      }
    },
    {
      titre: "APPROCHE 27 CATII",
      boucles: {
        A5: createBoucle(),
        A6: createBoucle()
      }
    },
    {
      titre: "BORD DE PISTE",
      boucles: {
        RE1: createBoucle(),
        RE2: createBoucle()
      }
    },
    {
      titre: "AXE DE PISTE",
      boucles: {
        RC1: createBoucle(),
        RC2: createBoucle()
      }
    },
    {
      titre: "FLASHING SYSTEM",
      boucles: {
        SFLS1: createBoucle(),
        SFLS2: createBoucle()
      }
    },
    {
      titre: "TDZ",
      boucles: {
        TD1: createBoucle(),
        TD2: createBoucle()
      }
    },
    {
      titre: "SEUIL DE PISTE",
      boucles: {
        TH1: createBoucle(),
        TH2: createBoucle()
      }
    },
    {
      titre: "PAPI",
      boucles: {
        SC2: createBoucle()
      }
    },
    {
      titre: "BORD DE TAXI WAY",
      boucles: {
        TE1: createBoucle(),
        TE2: createBoucle(),
        TE3: createBoucle(),
        TE4: createBoucle(),
        TE5: createBoucle()
      }
    },
    {
      titre: "AXE DE TAXI WAY",
      boucles: {
        TC1: createBoucle(),
        TC2: createBoucle(),
        TC3: createBoucle(),
        TC4: createBoucle()
      }
    },
    {
      titre: "STOP BAR",
      boucles: {
        SB1: createBoucle(),
        SB2: createBoucle()
      }
    }
  ],

  verifications_generales: {
    Remontees_defaut: "",
    Etat_general_equipements: "",
    Analyse_archivage_cahiers: ""
  },

  observations: "",
  date: "",
  Technicien_Operateurs: "",
  signature: ""
};
const FicheSemesRegulateures = () => {
const [fiche, setFiche] = useState(initialFiche);
  const [loading, setLoading] = useState(true);
  const sigCanvas = useRef(null);

  useEffect(() => {
    chargerFiche();
  }, []);

const chargerFiche = async () => {
  try {
    const data = await getFicheSemesRegulateures();

    setFiche({
      ...initialFiche,
      ...data,
      date: data?.date ? new Date(data.date) : null
    });

  } catch (error) {
    console.error("Erreur chargement fiche :", error);
  } finally {
    setLoading(false);
  }
};
const transformToBackend = () => {
  const boucles = {};

  fiche.groupesRegulateurs.forEach(groupe => {
    boucles[groupe.titre] = groupe.boucles;
  });

  return {
    ...fiche,
    boucles
  };
};
const handleEnregistrer = async () => {
  try {
    const signatureData = sigCanvas.current?.isEmpty()
      ? null
      : sigCanvas.current.toDataURL();

    const dataToSave = {
      ...transformToBackend(),
      signature: signatureData
    };

    const result = await enregistrerFicheSemesRegulateures(fiche._id, dataToSave);
    alert(result.message);

  } catch (error) {
    console.error(error);
    alert("Erreur lors de l'enregistrement !");
  }
};
 const handleEnvoyer = async () => {
  try {
    const signatureData = sigCanvas.current?.isEmpty()
      ? null
      : sigCanvas.current.toDataURL();

    const dataToSave = {
      ...transformToBackend(),
      signature: signatureData
    };

    await enregistrerFicheSemesRegulateures(fiche._id, dataToSave);

    const result = await envoyerFicheSemesRegulateures(fiche._id);

    alert(result.message);

    // 🔥 RESET FORM
    setFiche(initialFiche);
    sigCanvas.current?.clear();

  } catch (error) {
    console.error(error);
    alert("Erreur lors de l'envoi !");
  }
};
const handleChange = (groupeIndex, boucleKey, champ, valeur) => {
  setFiche(prev => {
    const updated = { ...prev };
    updated.groupesRegulateurs = [...prev.groupesRegulateurs];

    updated.groupesRegulateurs[groupeIndex] = {
      ...updated.groupesRegulateurs[groupeIndex],
      boucles: {
        ...updated.groupesRegulateurs[groupeIndex].boucles,
        [boucleKey]: {
          ...updated.groupesRegulateurs[groupeIndex].boucles[boucleKey],
          [champ]: valeur
        }
      }
    };

    return updated;
  });
};

const handleSubChange = (groupeIndex, boucleKey, sub, champ, valeur) => {
  setFiche(prev => {
    const updated = { ...prev };
    updated.groupesRegulateurs = [...prev.groupesRegulateurs];

    updated.groupesRegulateurs[groupeIndex] = {
      ...updated.groupesRegulateurs[groupeIndex],
      boucles: {
        ...updated.groupesRegulateurs[groupeIndex].boucles,
        [boucleKey]: {
          ...updated.groupesRegulateurs[groupeIndex].boucles[boucleKey],
          [sub]: {
            ...updated.groupesRegulateurs[groupeIndex].boucles[boucleKey][sub],
            [champ]: valeur
          }
        }
      }
    };

    return updated;
  });
};

 

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
  {fiche.groupesRegulateurs.map((groupe, gi) => (
    <motion.div
      key={gi}
      className="fiche-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      <h3>{groupe.titre}</h3>

      {Object.entries(groupe.boucles).map(([key, boucle]) => (
        <div key={key} className="boucle-card">
          <h4>{key}</h4>

          <div className="input-group">
            <label>Type Puissance:</label>
            <input value={boucle.Type_Puissance} onChange={(e) => handleChange(gi, key, "Type_Puissance", e.target.value)} />

            <label>Longueur:</label>
            <input value={boucle.Longueur_M} onChange={(e) => handleChange(gi, key, "Longueur_M", e.target.value)} />

            <label>Continuité Théorique:</label>
            <input value={boucle.Continuite_Theorique_Ohm} onChange={(e) => handleChange(gi, key, "Continuite_Theorique_Ohm", e.target.value)} />

            <label>Continuité Mesurée:</label>
            <input value={boucle.Continuite_Mesuree_Ohm} onChange={(e) => handleChange(gi, key, "Continuite_Mesuree_Ohm", e.target.value)} />

            <label>Nombre de feux:</label>
            <input value={boucle.Nombre_de_feux} onChange={(e) => handleChange(gi, key, "Nombre_de_feux", e.target.value)} />
          </div>

          <div className="input-group">
            <h5>Résultats</h5>

            <input
              placeholder="Isolement"
value={boucle.Resultats?.Isolement_Ohm || ""}
              onChange={(e) => handleSubChange(gi, key, "Resultats", "Isolement_Ohm", e.target.value)}
            />

            <input
              placeholder="Tension Test"
value={boucle.Resultats.Tension_test_Vcc}
              onChange={(e) => handleSubChange(gi, key, "Resultats", "Tension_test_Vcc", e.target.value)}
            />

            <input
              placeholder="Courant Test"
              value={boucle.Resultats?.Courant_test_Ac || ""}
              onChange={(e) => handleSubChange(gi, key, "Resultats", "Courant_test_Ac", e.target.value)}
            />
          </div>

          <div className="input-group">
            <h5>Test</h5>

            <input
              placeholder="Durée"
              value={boucle.Test?.Duree || ""}
              onChange={(e) => handleSubChange(gi, key, "Test", "Duree", e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Parafoudres:</label>
            <input value={boucle.Verification_parafoudres} onChange={(e) => handleChange(gi, key, "Verification_parafoudres", e.target.value)} />

            <label>Commentaires:</label>
            <input value={boucle.Commentaires} onChange={(e) => handleChange(gi, key, "Commentaires", e.target.value)} />
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
