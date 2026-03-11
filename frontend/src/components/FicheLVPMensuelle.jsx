// frontend/components/FicheLVPMensuelle.jsx
import React, { useEffect, useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import '../styles/FicheLVPMensuelle.css';

import { getFicheLVP, enregistrerFicheLVP as apiEnregistrerFicheLVP ,envoyerFicheLVP } from './apiservices/api';

export default function FicheLVPMensuelle() {
  const [fiche, setFiche] = useState(null);
  const [localFiche, setLocalFiche] = useState(null);

  // Pagination tableau global
  const [currentPage, setCurrentPage] = useState(1); // 1 = Est, 2 = Ouest
  const totalPages = 2; // juste 2 tableaux

  // Ref pour le signature canvas
  const sigCanvas = useRef(null);

  useEffect(() => {
const fetchFiche = async () => {
  try {
    const data = await getFicheLVP(); // Assurez-vous que getFicheLVP appelle /latest si id non fourni
    setFiche(data);
    setLocalFiche(JSON.parse(JSON.stringify(data)));
  } catch (err) {
    console.error(err);
  }
};
    fetchFiche();
  }, []);

  if (!localFiche) return <p>Chargement de la fiche LVP...</p>;

  const handleChange = (section, index, field, value) => {
    const updated = { ...localFiche };
    updated[section][index][field] = value;
    setLocalFiche(updated);
  };

  const renderTableau = () => {
    if (currentPage === 1) {
      return (
        <>
          <h3>Feux LVP Est</h3>
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>État général</th>
                <th>Interventions</th>
                <th>Observations</th>
              </tr>
            </thead>
            <tbody>
              {localFiche.feuxLVPEast.map((ligne, i) => (
                <tr key={i}>
                  <td>{ligne.position}</td>
                  <td>
                    <select
                      value={ligne.etatGeneralBalise}
                      onChange={(e) =>
                        handleChange(
                          'feuxLVPEast',
                          i,
                          'etatGeneralBalise',
                          e.target.value
                        )
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
                      value={ligne.interventions}
                      onChange={(e) =>
                        handleChange(
                          'feuxLVPEast',
                          i,
                          'interventions',
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ligne.observations}
                      onChange={(e) =>
                        handleChange(
                          'feuxLVPEast',
                          i,
                          'observations',
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    } else if (currentPage === 2) {
      return (
        <>
          <h3>Feux LVP Ouest</h3>
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>État général</th>
                <th>Interventions</th>
                <th>Observations</th>
              </tr>
            </thead>
            <tbody>
              {localFiche.feuxLVPWest.map((ligne, i) => (
                <tr key={i}>
                  <td>{ligne.position}</td>
                  <td>
                    <select
                      value={ligne.etatGeneralBalise}
                      onChange={(e) =>
                        handleChange(
                          'feuxLVPWest',
                          i,
                          'etatGeneralBalise',
                          e.target.value
                        )
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
                      value={ligne.interventions}
                      onChange={(e) =>
                        handleChange(
                          'feuxLVPWest',
                          i,
                          'interventions',
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ligne.observations}
                      onChange={(e) =>
                        handleChange(
                          'feuxLVPWest',
                          i,
                          'observations',
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }
  };

  // 🔹 Sauvegarder la signature dans localFiche
  const saveSignature = () => {
    if (sigCanvas.current) {
      const dataUrl = sigCanvas.current.toDataURL();
      setLocalFiche({ ...localFiche, signature: dataUrl });
    }
  };

  // 🔹 Effacer la signature
  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setLocalFiche({ ...localFiche, signature: '' });
    }
  };
  // 🔹 Fonction pour enregistrer la fiche
const handleEnregistrerFiche = async () => {
  try {
    if (!localFiche._id) {
      return alert("Impossible d'enregistrer : ID de fiche manquant !");
    }
    await apiEnregistrerFicheLVP(localFiche._id, localFiche);
    alert("Fiche enregistrée avec succès !");
  } catch (err) {
    console.error(err);
    alert("Erreur lors de l'enregistrement de la fiche.");
  }
};
// Fonction pour envoyer la fiche
const handleEnvoyerFiche = async () => {
  try {
    if (!localFiche._id) {
      return alert("Enregistrez la fiche avant de l'envoyer !");
    }
    await envoyerFicheLVP(localFiche._id);
    alert("Fiche LVP envoyée avec succès !");
  } catch (err) {
    console.error(err);
    alert("Erreur lors de l'envoi de la fiche !");
  }
};
  return (
    <div className="fiche-lvp-mensuelle">
      <h2 className="fiche-title">
  Fiche LVP - Mensuelle
  {localFiche.date && (
    <span className="fiche-date"> ({localFiche.date})</span>
  )}
</h2>

      {/* 🔹 Tableau avec pagination */}
      {renderTableau()}
      <div style={{ margin: '10px 0' }}>
        <div className="pagination-controls">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          <span>
            Page {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      </div>

      {/* 🔹 Observations générales */}
      <h3>Observations générales</h3>
      <textarea
        value={localFiche.observationsGenerales}
        onChange={(e) =>
          setLocalFiche({
            ...localFiche,
            observationsGenerales: e.target.value,
          })
        }
        rows={3}
        cols={50}
      />

      {/* 🔹 Date et Technicien */}
      <div style={{ marginTop: '15px' }}>
        <p>
  <strong>Date :</strong>{' '}
  <input
    type="date"  // ← ici
    value={localFiche.date}
    onChange={(e) =>
      setLocalFiche({ ...localFiche, date: e.target.value })
    }
  />
</p>
        <p>
          <strong>Technicien :</strong>{' '}
          <input
            type="text"
            value={localFiche.technicien}
            onChange={(e) =>
              setLocalFiche({ ...localFiche, technicien: e.target.value })
            }
          />
        </p>
      </div>

      {/* 🔹 Signature */}
      <div style={{ marginTop: '15px' }}>
        <h3>Signature</h3>
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{
            width: 400,
            height: 150,
            className: 'sigCanvas',
            style: { border: '1px solid #000' },
          }}
        />
        <div style={{ marginTop: '5px' }}>
          <button onClick={saveSignature} style={{ marginRight: '5px' }}>
            Enregistrer
          </button>
          <button onClick={clearSignature}>Effacer</button>
        </div>
        {localFiche.signature && (
          <div style={{ marginTop: '10px' }}>
            <strong>Signature sauvegardée :</strong>
            <br />
            <img
              src={localFiche.signature}
              alt="Signature"
              style={{ border: '1px solid #000' }}
            />
          </div>
        )}
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
  <button onClick={handleEnregistrerFiche} style={{ backgroundColor: "#2a5ea3" }}>
    Enregistrer la fiche
  </button>
  <button
  onClick={handleEnvoyerFiche}
  style={{ backgroundColor: "#28a745", color: "#fff", marginLeft: "10px" }}
>
  Envoyer la fiche
</button>
</div>
    </div>
  );
}
