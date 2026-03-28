import React, { useState, useEffect, useRef } from 'react';
import '../styles/Brigade.css';
import SignatureCanvas from 'react-signature-canvas';
import { FaSave } from 'react-icons/fa';
import {
  enregistrerFicheBrigade,
  envoyerFicheBrigade,
} from './apiservices/api';

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

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getCurrentHour = () => currentTime.getHours();
  const getActiveBloc = () => {
    const h = getCurrentHour();
    if (h >= 8 && h < 14) return 'matin';
    if (h >= 14 && h < 20) return 'apresMidi';
    return 'nuit';
  };
  const activeBloc = getActiveBloc();

  const blocsOrder = ['matin', 'apresMidi', 'nuit'];
  const titles = {
    matin: 'Bloc 1 : Matin (8h-14h)',
    apresMidi: 'Bloc 2 : Après-midi (14h-20h)',
    nuit: 'Bloc 3 : Nuit (20h-8h)',
  };

  const [currentPage, setCurrentPage] = useState(0);

  const createEmptyRow = () => ({ consigne: '', inspection: '' });
  const createTech = () => ({ nom: '', signature: '' });

  const [blocs, setBlocs] = useState({
    matin: [createEmptyRow()],
    apresMidi: [createEmptyRow()],
    nuit: [createEmptyRow()],
  });

  const [techniciens, setTechniciens] = useState({
    matin: [createTech()],
    apresMidi: [createTech()],
    nuit: [createTech()],
  });

  const currentBloc = blocsOrder[currentPage];
  // const isActive = activeBloc === currentBloc;
  const isActive = currentBloc === 'nuit' ? true : activeBloc === currentBloc;

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
        blocsBrigade: blocs,
        techniciens,
      };
      const savedFiche = await enregistrerFicheBrigade(dataToSave);
      setFicheId(savedFiche._id);
      alert('✅ Fiche Brigade sauvegardée avec succès !');

      console.log(`✅ ${currentBloc} enregistré:`, dataToSave);

      // Sauvegarde locale également
      localStorage.setItem(
        `brigade_${currentBloc}_${today}`,
        JSON.stringify(dataToSave)
      );
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
                <th>Consignes</th>
                <th>Inspection</th>
              </tr>
            </thead>
            <tbody>
              {blocs[currentBloc].map((row, index) => (
                <tr key={index}>
                  <td>
                    <textarea
                      value={row.consigne}
                      disabled={!isActive}
                      onChange={(e) =>
                        handleChange(index, 'consigne', e.target.value)
                      }
                      rows="2"
                      placeholder="Saisir les consignes..."
                    />
                  </td>
                  <td>
                    <textarea
                      value={row.inspection}
                      disabled={!isActive}
                      onChange={(e) =>
                        handleChange(index, 'inspection', e.target.value)
                      }
                      rows="2"
                      placeholder="Saisir les inspections..."
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

        {/* TECHNICIENS */}
        <div className="section">
          <h4>Techniciens et Signatures</h4>
          <table className="techniciens-table">
            <thead>
              <tr>
                <th>Nom du technicien</th>
                <th>Signature</th>
              </tr>
            </thead>
            <tbody>
              {techniciens[currentBloc].map((tech, index) => (
                <TechRow
                  key={`${currentBloc}-${index}`}
                  tech={tech}
                  index={index}
                  currentBloc={currentBloc}
                  isActive={isActive}
                  handleTechChange={handleTechChange}
                  setTechniciens={setTechniciens}
                />
              ))}
            </tbody>
          </table>
          <button className="add-btn" onClick={addTech} disabled={!isActive}>
            👤 Ajouter un technicien
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
