import React, { useEffect, useState, useRef } from 'react';
import { getFicheFeuxObstacles ,enregistrerFicheFeuxObstacles ,envoyerFicheFeuxObstacles  } from './apiservices/api';
import SignatureCanvas from 'react-signature-canvas';
import '../styles/FicheFeuxObstacles.css';

export default function FicheFeuxObstaclesMensuelle() {
  const [fiche, setFiche] = useState(null);
  const sigCanvas = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFicheFeuxObstacles();
      setFiche(data);
    };
    fetchData();
  }, []);

  // 🔹 Gestion des changements dans le tableau
  const handleChange = (index, field, value) => {
    const newFiche = { ...fiche };
    newFiche.installations[index][field] = value;

    const alim = newFiche.installations[index].alimentation;
    const lampe = newFiche.installations[index].lampe;

    if (alim === 'OK' && lampe === 'OK') {
      newFiche.installations[index].observations = 'R.A.S';
    }

    setFiche(newFiche);
  };

  if (!fiche) return <p>Chargement...</p>;
// 🔹 Enregistrer la fiche
  const handleEnregistrer = async () => {
    try {
      const id = fiche._id;
      const res = await enregistrerFicheFeuxObstacles(id, fiche);
      alert(res.message || "Fiche enregistrée !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement !");
    }
  };
  //envoie
  const handleEnvoyer = async () => {
    try {
      await envoyerFicheFeuxObstacles(fiche._id);
      alert("Fiche envoyée ! Notification envoyée à l'admin");
      setFiche({ ...fiche, statut: "Envoyée" });
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi !");
    }
  };

  return (
    <div className="fiche-container">
      {/* TITRE */}
      <h2>
        Fiche inspection Feux d'obstacles
        {fiche.date && <span>({fiche.date})</span>}
      </h2>

      {/* TABLEAU DES INSTALLATIONS */}
      <table className="fiche-table">
        <thead>
          <tr>
            <th>Lieu Installation</th>
            <th>Alimentation</th>
            <th>Lampe</th>
            <th>Observation</th>
          </tr>
        </thead>
        <tbody>
          {fiche.installations.map((item, index) => (
            <tr key={index}>
              <td>{item.lieuInstallation}</td>
              <td>
                <select
                  value={item.alimentation}
                  onChange={(e) =>
                    handleChange(index, 'alimentation', e.target.value)
                  }
                >
                  <option value="">--</option>
                  <option value="OK">OK</option>
                  <option value="HS">HS</option>
                </select>
              </td>
              <td>
                <select
                  value={item.lampe}
                  onChange={(e) => handleChange(index, 'lampe', e.target.value)}
                >
                  <option value="">--</option>
                  <option value="OK">OK</option>
                  <option value="HS">HS</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={item.observations}
                  onChange={(e) => {
                    const newFiche = { ...fiche };
                    newFiche.installations[index].observations = e.target.value;
                    setFiche(newFiche);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DATE */}
      <div className="input-group">
        <label>Date :</label>
        <input
          type="date"
          value={fiche.date || ''}
          onChange={(e) => {
            const newFiche = { ...fiche };
            newFiche.date = e.target.value;
            setFiche(newFiche);
          }}
        />
      </div>

      {/* OBSERVATION GENERALE */}
      <div className="input-group">
        <label>Observation Générale :</label>
        <input
          type="text"
          value={fiche.observationGenerale || ''}
          onChange={(e) => {
            const newFiche = { ...fiche };
            newFiche.observationGenerale = e.target.value;
            setFiche(newFiche);
          }}
        />
      </div>

      {/* TECHNICIEN */}
      <div className="input-group">
        <label>Technicien :</label>
        <input
          type="text"
          value={fiche.technicien || ''}
          onChange={(e) => {
            const newFiche = { ...fiche };
            newFiche.technicien = e.target.value;
            setFiche(newFiche);
          }}
        />
      </div>

      {/* SIGNATURE */}
      <div className="signature-block">
        <label>Signature :</label>
        <SignatureCanvas
          penColor="black"
          canvasProps={{
            width: 400,
            height: 150,
            className: 'signatureCanvas',
          }}
          ref={sigCanvas}
        />

        <div>
          <button
            onClick={() => {
              const signatureImage = sigCanvas.current
                .getTrimmedCanvas()
                .toDataURL('image/png');
              const newFiche = { ...fiche };
              newFiche.signature = signatureImage;
              setFiche(newFiche);
            }}
          >
            Enregistrer signature
          </button>

          <button
            onClick={() => sigCanvas.current.clear()}
            style={{ marginLeft: '10px' }}
          >
            Effacer
          </button>
        </div>

        {fiche.signature && (
          <img src={fiche.signature} alt="Signature" />
        )}
      </div>
      <div style={{ marginTop: 20 }}>
        <button onClick={handleEnregistrer}>Enregistrer</button>
        <button onClick={handleEnvoyer} style={{ marginLeft: 10 }}>Envoyer</button>

      </div>
    </div>
  );
}