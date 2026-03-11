import React, { useEffect, useState, useRef } from 'react';
import { getFichePostes, enregistrerFichePostes ,envoyerFichePostes  } from './apiservices/api';
import SignatureCanvas from 'react-signature-canvas';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/FichePostes.css';

export default function FichePostesMensuelle() {
  const [fiche, setFiche] = useState(null);
  const sigCanvas = useRef(null);
  const [loading, setLoading] = useState(false);
const [observationsGenerales, setObservationsGenerales] = useState('');

  useEffect(() => {
    const fetchFiche = async () => {
      try {
        const data = await getFichePostes();
        setFiche(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFiche();
  }, []);

  if (!fiche) return <p>Chargement...</p>;

  // Modifier une cellule
  const handleChange = (poste, index, field, value) => {
    const updated = { ...fiche };
    updated[poste][index][field] = value;
    setFiche(updated);
  };

  // Modifier champs bas
  const handleInfoChange = (field, value) => {
    setFiche({ ...fiche, [field]: value });
  };

  // Récupérer la signature en base64
  const saveSignature = () => {
  if (sigCanvas.current) {
    const signatureData = sigCanvas.current.toDataURL('image/png');
    handleInfoChange('signature', signatureData);
  }
};

  // Enregistrer la fiche
 const handleSave = async () => {
  try {
    setLoading(true);

    let signatureData = "";
    if (sigCanvas.current) {
      signatureData = sigCanvas.current.toDataURL('image/png');
    }

    // Créer un nouvel objet fiche avec la signature
    const ficheAvecSignature = { ...fiche, signature: signatureData };

    const res = await enregistrerFichePostes(fiche._id, ficheAvecSignature);
    alert(res.message || 'Fiche enregistrée !');
  } catch (error) {
    console.error(error);
    alert('Erreur lors de l’enregistrement.');
  } finally {
    setLoading(false);
  }
};

  const renderRows = (poste, data) => {
    return data.map((row, index) => (
      <tr key={index}>
        {index === 0 && (
          <td rowSpan={data.length} className="posteCell">
            {poste}
          </td>
        )}

        <td className="elementCell">{row.element}</td>

        <td>
          <select
            value={row.etat}
            onChange={(e) => handleChange(poste, index, 'etat', e.target.value)}
          >
            <option value="">--</option>
            <option value="OK">OK</option>
            <option value="HS">HS</option>
          </select>
        </td>

        <td>
          <textarea
            value={row.interventions}
            onChange={(e) =>
              handleChange(poste, index, 'interventions', e.target.value)
            }
          />
        </td>

        <td>
          <textarea
            value={row.observations}
            onChange={(e) =>
              handleChange(poste, index, 'observations', e.target.value)
            }
          />
        </td>
      </tr>
    ));
  };

const handleEnvoyer = async () => {
  try {
    if (!fiche.technicien || fiche.technicien.trim() === "") {
      alert("Veuillez remplir le nom du technicien avant d'envoyer !");
      return;
    }

    const res = await envoyerFichePostes(fiche._id);
    alert(res.message || "Fiche envoyée à l'admin !");
  } catch (error) {
    console.error(error);
    alert("Erreur lors de l'envoi de la fiche");
  }
};
  return (
    <div>
      <div className="titleContainer">
        <h2>
          Fiche Poste Mensuelle
          {fiche.date && (
            <span className="dateTitle">
              {' '}
              - {new Date(fiche.date).toLocaleDateString()}
            </span>
          )}
        </h2>
      </div>

      <table className="ficheTable">
        <thead>
          <tr>
            <th>Poste</th>
            <th>Element</th>
            <th>Etat</th>
            <th>Interventions</th>
            <th>Observations</th>
          </tr>
        </thead>

        <tbody>
          {renderRows('posteSST1', fiche.posteSST1)}
          {renderRows('posteSST2', fiche.posteSST2)}
          {renderRows('posteTC', fiche.posteTC)}
        </tbody>
      </table>

      <br />

      {/* Informations bas */}
      <div className="infos">
        <label>Observations générales :</label>
        <textarea
  placeholder="Écrire les observations ici..."
  rows="4"
  value={observationsGenerales}
  onChange={(e) => setObservationsGenerales(e.target.value)}
/>  

        <label>Technicien :</label>
        <input
  value={fiche.technicien}
  onChange={(e) => handleInfoChange('technicien', e.target.value)}
/>

        <br />

        <DatePicker
          selected={fiche.date ? new Date(fiche.date) : null}
          onChange={(date) => handleInfoChange('date', date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Choisir une date"
        />
      </div>

      <br />

      {/* Signature */}
      <div>
        <h3>Signature</h3>

        <SignatureCanvas
          penColor="black"
          canvasProps={{
            width: 400,
            height: 150,
            className: 'signatureCanvas',
          }}
          ref={sigCanvas}
        />

        <br />

        <button onClick={() => sigCanvas.current.clear()}>Effacer</button>
      </div>

      <br />

      {/* Bouton Enregistrer */}
      <button onClick={handleSave} disabled={loading}>
        {loading ? 'Enregistrement...' : 'Enregistrer la fiche'}
      </button>
         <button onClick={handleEnvoyer}>Envoyer</button>

    </div>
  );
}