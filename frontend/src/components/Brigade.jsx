import React, { useState, useEffect, useRef } from 'react';
import '../styles/Brigade.css';
import SignatureCanvas from 'react-signature-canvas';
import { FaSave } from 'react-icons/fa';
import {
  enregistrerFicheBrigade,
  envoyerFicheBrigade,
  getAllInventaires
} from './apiservices/api';
// Fonction pour extraire toutes les désignations des différents inventaires
function getAllDesignations(data) {
  const allArrays = [
    data.PG_gmao || [],
    data.balisage_gmao || [],
    data.autre || []
  ];

  // Fusionner et ne garder que le champ 'designation'
  const allDesignations = allArrays
    .flat() // fusionne tous les tableaux
    .map(item => item.designation)
    .filter(Boolean); // supprime les undefined/null

  // Supprimer les doublons
  return [...new Set(allDesignations)];
}
// Fonction pour récupérer tous les types et fusionner
async function fetchAllInventaires() {
  const types = ['PG', 'BALISAGE', 'AGL']; // tous les types existants
  const results = [];

  for (const type of types) {
    try {
      const data = await getAllInventaires(type);
      results.push(data);
    } catch (err) {
      console.error(`Erreur chargement inventaire ${type}:`, err);
    }
  }

  // Fusionner tous les tableaux en un seul objet comme ton API originale
  const merged = {
    PG_gmao: results[0] || [],
    balisage_gmao: results[1] || [],
    autre: results[2] || []
  };

  return merged;
}
// Composant enfant pour gérer un technicien et sa signature
function TechRow({
  tech,
  index,
  currentBloc,
  isActive,
  handleTechChange,
  setTechniciens,
}) {
  const sigRef = useRef(null);
  const [signatureLoaded, setSignatureLoaded] = useState(false);

  // Charger la signature existante quand le technicien change ou que le bloc change
  useEffect(() => {
    if (sigRef.current && tech.signature && !signatureLoaded) {
      try {
        sigRef.current.fromDataURL(tech.signature);
        setSignatureLoaded(true);
      } catch (error) {
        console.error('Erreur chargement signature:', error);
      }
    } else if (sigRef.current && !tech.signature) {
      sigRef.current.clear();
      setSignatureLoaded(false);
    }
  }, [tech.signature, signatureLoaded]);

  // Réinitialiser l'état de chargement quand le bloc change
  useEffect(() => {
    setSignatureLoaded(false);
    if (sigRef.current) {
      sigRef.current.clear();
    }
  }, [currentBloc]);

  const saveSignature = () => {
    if (!sigRef.current || !isActive) return;
    try {
      const dataURL = sigRef.current.getTrimmedCanvas().toDataURL('image/png');
      setTechniciens((prev) => {
        const updated = [...prev[currentBloc]];
        updated[index] = { ...updated[index], signature: dataURL };
        return { ...prev, [currentBloc]: updated };
      });
      setSignatureLoaded(true);
    } catch (error) {
      console.error('Erreur sauvegarde signature:', error);
    }
  };

  const clearSignature = () => {
    if (!sigRef.current || !isActive) return;
    sigRef.current.clear();
    setTechniciens((prev) => {
      const updated = [...prev[currentBloc]];
      updated[index] = { ...updated[index], signature: '' };
      return { ...prev, [currentBloc]: updated };
    });
    setSignatureLoaded(false);
  };

  return (
    <tr>
      <td>
        <input
          value={tech.nom}
          disabled={!isActive}
          onChange={(e) => handleTechChange(index, 'nom', e.target.value)}
          placeholder="Nom du technicien"
        />
      </td>
      <td className="signature-cell">
        <SignatureCanvas
          ref={sigRef}
          penColor="black"
          canvasProps={{
            width: 300,
            height: 100,
            className: 'signature-canvas',
          }}
          onEnd={saveSignature}
          clearOnDrag={false}
        />
        <button
          onClick={clearSignature}
          disabled={!isActive}
          className="clear-signature-btn"
          title="Effacer la signature"
        >
          🧹
        </button>
      </td>
    </tr>
  );
}

export default function Brigade() {
  const today = new Date().toLocaleDateString();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [ficheId, setFicheId] = useState(null);
  const [equipements, setEquipements] = useState([]);

  useEffect(() => {
    
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
useEffect(() => {
  async function fetchEquipements() {
    try {
      const allData = await fetchAllInventaires(); // utilise la fonction fusionnée
      const designations = getAllDesignations(allData); // récupère uniquement les noms
      setEquipements(designations); // mets à jour l'état
    } catch (err) {
      console.error('Erreur chargement équipements:', err);
    }
  }

  fetchEquipements();
}, []);
  const getCurrentHour = () => currentTime.getHours();
  const getActiveBloc = () => {
    const h = getCurrentHour();
    if (h >= 8 && h < 20) return 'jour';
    return 'nuit';
  };
  const activeBloc = getActiveBloc();

  const blocsOrder = ['jour', 'nuit'];

  const titles = {
    jour: 'Shift Jour (08h - 20h)',
    nuit: 'Shift Nuit (20h - 08h)',
  };

  const [currentPage, setCurrentPage] = useState(0);

  const createEmptyRow = () => ({
    typeIntervention: '',
    natureTravaux: '',
    lieu: '',
    natureMaintenance: '',
    naturePreventive: '',
    action: '',
    technicien: '',
    panne: '',
    cause: '',
    dateDetection: '',
    dateReparation: '',
    DureeEnMinute: '',
    pieces: '',
    quantite: '',
  });
  const createTech = () => ({ nom: '', signature: '' });

  const [blocs, setBlocs] = useState({
    jour: [createEmptyRow()],
    nuit: [createEmptyRow()],
  });

  const [techniciens, setTechniciens] = useState({
    jour: [createTech()],
    nuit: [createTech()],
  });

  const currentBloc = blocsOrder[currentPage];
   const isActive = currentBloc === 'nuit' ? true : activeBloc === currentBloc;
 // const isActive = activeBloc === currentBloc;
  // ---------------- ACTIONS ----------------

  const addRow = () => {
    if (!isActive) return;
    setBlocs((prev) => ({
      ...prev,
      [currentBloc]: [...prev[currentBloc], createEmptyRow()],
    }));
  };

const handleChange = (index, field, value) => {
  if (!isActive) return;

  setBlocs((prev) => {
    const updated = [...prev[currentBloc]];
    updated[index][field] = value;

    // Calcul automatique de la durée en minutes
    const dateDetection = updated[index].dateDetection
      ? new Date(updated[index].dateDetection)
      : null;
    const dateReparation = updated[index].dateReparation
      ? new Date(updated[index].dateReparation)
      : null;

    if (dateDetection && dateReparation) {
      const diffMs = dateReparation - dateDetection;
      const diffMin = Math.max(0, Math.round(diffMs / 60000)); // millisecondes → minutes
      updated[index]['DureeEnMinute'] = diffMin; // ⚡ mettre à jour le champ existant
    } else {
      updated[index]['DureeEnMinute'] = '';
    }

    return { ...prev, [currentBloc]: updated };
  });
};

  const addTech = () => {
    if (!isActive) return;
    setTechniciens((prev) => ({
      ...prev,
      [currentBloc]: [...prev[currentBloc], createTech()],
    }));
  };

  const handleTechChange = (index, field, value) => {
    if (!isActive) return;
    setTechniciens((prev) => {
      const updated = [...prev[currentBloc]];
      updated[index][field] = value;
      return { ...prev, [currentBloc]: updated };
    });
  };

  const handleSave = async () => {
    try {
      const dataToSave = {
        date: new Date(),
        bloc: currentBloc, // 👈 important
        data: blocs[currentBloc], // 👈 seulement jour OU nuit
      };

      const savedFiche = await enregistrerFicheBrigade(dataToSave);
      setFicheId(savedFiche._id);

      alert('✅ Bloc sauvegardé avec succès !');
    } catch (err) {
      console.error(err);
      alert('❌ Erreur lors de la sauvegarde.');
    }
  };

  const handleSend = async () => {
    if (!ficheId) {
      alert('⚠️ Vous devez d’abord sauvegarder la fiche !');
      return;
    }
    try {
      const finalData = {
        date: today,
        heure: currentTime.toLocaleTimeString(),
        blocsBrigade: blocs,
        techniciens,
        ficheId,
      };

      await envoyerFicheBrigade(ficheId);
      alert('📤 Fiche Brigade envoyée avec succès !');

      console.log('📤 Envoi de la fiche finale:', finalData);
    } catch (err) {
      console.error(err);
      alert('❌ Erreur lors de l’envoi.');
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="brigade-container">
      <h2>Journal BRIGADE</h2>
      <p>📅 {today}</p>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="pagination-btn"
        >
          ⬅ Précédent
        </button>
        <span className="bloc-title">{titles[currentBloc]}</span>
        <button
          disabled={currentPage === blocsOrder.length - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="pagination-btn"
        >
          Suivant ➡
        </button>
      </div>

      {/* BLOC */}
      <div className={`bloc ${!isActive ? 'disabled' : 'active'}`}>
        <div className="bloc-header">
          <h3>
            {titles[currentBloc]}
            {isActive && <span className="active-indicator"> 🟢 Actif</span>}
            {!isActive && (
              <span className="inactive-indicator"> 🔒 Verrouillé</span>
            )}
          </h3>
          <p>⏰ {currentTime.toLocaleTimeString()}</p>
        </div>

        {/* TABLE LIGNES */}
        <div className="section">
          <h4>Consignes et Inspections</h4>
          <table className="brigade-table">
            <thead>
              <tr>
                <th>Type intervention</th>
                <th>Nature travaux</th>
                <th>Lieu</th>
                <th>Nature maintenance</th>
                <th>Nature maintenance préventive</th>
                <th>Action effectuée</th>
                <th>Technicien</th>
                <th>Panne</th>
                <th>Cause</th>
                <th>Date détection</th>
                <th>Date réparation</th>
                <th>Durée (min)</th>
                <th>Pièces remplacées</th>
                <th>Quantité</th>
              </tr>
            </thead>
            <tbody>
              {blocs[currentBloc].map((row, index) => (
                <tr key={index}>
                  {/* Type intervention */}
                  <td>
                    <select
                      value={row.typeIntervention}
                      disabled={!isActive}
                      onChange={(e) =>
                        handleChange(index, 'typeIntervention', e.target.value)
                      }
                    >
                      <option value="">-- Choisir --</option>
                      <option value="balisage">Balisage</option>
                      <option value="production">Production</option>
                    </select>
                  </td>

                  {/* Nature travaux */}
                  <td>
                    <input
                      value={row.natureTravaux}
                      disabled={!isActive}
                      onChange={(e) =>
                        handleChange(index, 'natureTravaux', e.target.value)
                      }
                    />
                  </td>

                  {/* Lieu */}
                  <td>
                    <input
                      value={row.lieu}
                      disabled={!isActive}
                      onChange={(e) =>
                        handleChange(index, 'lieu', e.target.value)
                      }
                    />
                  </td>

                  {/* Nature maintenance */}
                  <td>
                    <select
                      value={row.natureMaintenance}
                      disabled={!isActive}
                      onChange={(e) =>
                        handleChange(index, 'natureMaintenance', e.target.value)
                      }
                    >
                      <option value="">-- Choisir --</option>
                      <option value="preventif">Préventif</option>
                      <option value="curatif">Curatif</option>
                    </select>
                  </td>

                  {/* Nature maintenance préventive */}
                  <td>
                    <select
                      value={row.naturePreventive}
                      disabled={!isActive}
                      onChange={(e) =>
                        handleChange(index, 'naturePreventive', e.target.value)
                      }
                    >
                      <option value="">-- Choisir --</option>
                      <option value="journaliere">Journalière</option>
                      <option value="semestrielle">Semestrielle</option>
                      <option value="annuelle">Annuelle</option>
                    </select>
                  </td>

                  {/* Action */}
                  <td>
                    <input
                      value={row.action}
                      disabled={!isActive}
                      onChange={(e) =>
                        handleChange(index, 'action', e.target.value)
                      }
                    />
                  </td>

                  {/* Technicien */}
                  <td>
                    <input
                      value={row.technicien}
                      disabled={!isActive}
                      onChange={(e) =>
                        handleChange(index, 'technicien', e.target.value)
                      }
                    />
                  </td>

                  {/* Panne */}
                  <td>
                    <input
                      value={row.panne}
                      disabled={!isActive}
                      onChange={(e) =>
                        handleChange(index, 'panne', e.target.value)
                      }
                    />
                  </td>

                  {/* Cause */}
                  <td>
                    <input
                      value={row.cause}
                      disabled={!isActive}
                      onChange={(e) =>
                        handleChange(index, 'cause', e.target.value)
                      }
                    />
                  </td>

                  {/* Date détection */}
                  <td>
                    <input
                      type="datetime-local"
                      value={row.dateDetection}
                      disabled={!isActive}
                      onChange={(e) =>
                        handleChange(index, 'dateDetection', e.target.value)
                      }
                    />
                  </td>

                  {/* Date réparation */}
                  <td>
                    <input
                      type="datetime-local"
                      value={row.dateReparation}
                      disabled={!isActive}
                      onChange={(e) =>
                        handleChange(index, 'dateReparation', e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.DureeEnMinute}
                      disabled
                      placeholder="Auto"
                    />
                  </td>
<td>
  <select
    value={row.pieces}
    disabled={!isActive}
    onChange={(e) => handleChange(index, 'pieces', e.target.value)}
  >
    <option value="">-- Choisir équipement --</option>
    {equipements.map((eq, idx) => (
      <option key={idx} value={eq}>
        {eq}
      </option>
    ))}
  </select>
</td>

                  {/* Quantité */}
                  <td>
                    <input
                      type="number"
                      value={row.quantite}
                      disabled={!isActive}
                      onChange={(e) =>
                        handleChange(index, 'quantite', e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-btn" disabled={!isActive} onClick={addRow}>
            ➕ Ajouter une ligne
          </button>
        </div>

        <div className="action-buttons">
          <button
            className="save-btn"
            onClick={handleSave}
            disabled={!isActive}
          >
            <FaSave /> Enregistrer le bloc
          </button>

          {currentBloc === 'nuit' && (
            <button className="send-btn" onClick={handleSend} disabled={false}>
              📤 Envoyer la fiche
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
