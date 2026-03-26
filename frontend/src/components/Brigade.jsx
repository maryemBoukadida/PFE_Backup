import React, { useState, useEffect } from 'react';
import '../styles/Brigade.css';
import SignatureCanvas from 'react-signature-canvas';
import { useRef } from 'react';
import { FaSave } from 'react-icons/fa';

export default function Brigade() {
  const today = new Date().toLocaleDateString();

  const [currentTime, setCurrentTime] = useState(new Date());

  // 🔥 Horloge en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getCurrentHour = () => currentTime.getHours();

  // 🔥 Déterminer bloc actif
  const getActiveBloc = () => {
    const h = getCurrentHour();

    if (h >= 8 && h < 14) return 'matin';
    if (h >= 14 && h < 20) return 'apresMidi';
    return 'nuit';
  };

  const activeBloc = getActiveBloc();

  const createEmptyRow = () => ({
    consigne: '',
    inspection: '',
  });

  const createTech = () => ({
    nom: '',
    signature: '',
  });

  const [blocs, setBlocs] = useState({
    matin: [createEmptyRow()],
    apresMidi: [createEmptyRow()],
    nuit: [createEmptyRow()],
  });

  const [techniciens, setTechniciens] = useState([
    { nom: '', signature: null, ref: useRef() },
  ]);

  // Ajouter ligne
  const addRow = (bloc) => {
    if (bloc !== activeBloc) return; // 🔒 bloc verrouillé

    setBlocs({
      ...blocs,
      [bloc]: [...blocs[bloc], createEmptyRow()],
    });
  };

  // Modifier ligne
  const handleChange = (bloc, index, field, value) => {
    if (bloc !== activeBloc) return; // 🔒 bloc verrouillé

    const updated = [...blocs[bloc]];
    updated[index][field] = value;

    setBlocs({
      ...blocs,
      [bloc]: updated,
    });
  };

  // Ajouter technicien
  const addTech = () => {
    setTechniciens([...techniciens, createTech()]);
  };

  const handleTechChange = (index, field, value) => {
    const updated = [...techniciens];
    updated[index][field] = value;
    setTechniciens(updated);
  };

  // 🔥 Enregistrer (simulation)
  const handleSave = (bloc) => {
    alert(`✅ Bloc ${bloc} enregistré`);
    console.log(blocs[bloc]);
  };
const clearSignature = (index) => {
  techniciens[index].ref.clear();
};
  const renderBloc = (title, blocKey) => {
    const isActive = activeBloc === blocKey;

    return (
      <div className={`bloc ${!isActive ? 'disabled' : ''}`}>
        <h3>
          {title} {isActive && '🟢 (Actif)'}
        </h3>

        <p>⏰ Heure actuelle : {currentTime.toLocaleTimeString()}</p>

        <table>
          <thead>
            <tr>
              <th>Consignes Particulières</th>
              <th>Inspection effectuée</th>
            </tr>
          </thead>
          <tbody>
            {blocs[blocKey].map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    value={row.consigne}
                    disabled={!isActive}
                    onChange={(e) =>
                      handleChange(blocKey, index, 'consigne', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    value={row.inspection}
                    disabled={!isActive}
                    onChange={(e) =>
                      handleChange(blocKey, index, 'inspection', e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="add-row-container">
          <button
            className="add-row-btn"
            disabled={!isActive}
            onClick={() => addRow(blocKey)}
          >
            ➕
          </button>
        </div>

        <button
          className="icon-save-btn"
          disabled={!isActive}
          onClick={() => handleSave(blocKey)}
        >
          <FaSave />
        </button>
      </div>
    );
  };

  return (
    <div className="brigade-container">
      <h2>Journal des Consignes particulières et de suivi : BRIGADE</h2>

      <p>📅 Date : {today}</p>

      {renderBloc('Bloc 1 : Matin ', 'matin')}
      {renderBloc('Bloc 2 : Après-midi ', 'apresMidi')}
      {renderBloc('Bloc 3 : Nuit ', 'nuit')}

      <div className="techniciens">
        <h3>Techniciens</h3>

        <table>
          <thead>
            <tr>
              <th>Nom & Prénom</th>
              <th>Signature</th>
            </tr>
          </thead>
          <tbody>
            {techniciens.map((tech, index) => (
              <tr key={index}>
                <td>
                  <input
                    value={tech.nom}
                    onChange={(e) =>
                      handleTechChange(index, 'nom', e.target.value)
                    }
                  />
                </td>
                <td>
                  <SignatureCanvas
                    ref={(ref) => (techniciens[index].ref = ref)}
                    penColor="black"
                    canvasProps={{
                      width: 300,
                      height: 100,
                      className: 'signature-canvas',
                    }}
                  />
                  <button onClick={() => clearSignature(index)}>
                    🧹 Effacer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={addTech}>➕ Ajouter technicien</button>
      </div>

      <footer className="footer">
        <p>TAVTUN/NBE-TD-FCU-FM-005-FR</p>
      </footer>
    </div>
  );
}
