import React, { useEffect, useState } from 'react';
import { getFicheDGS, envoyerFicheDGS,enregistrerFicheDGS  } from './apiservices/api';
import '../styles/FicheDGSMensuelle.css'; // <- import CSS

export default function FicheDGSMensuelle() {
  const [fiche, setFiche] = useState(null);

useEffect(() => {
  const fetchFiche = async () => {
    try {
      const data = await getFicheDGS();
      if (!data.date) {
        data.date = new Date().toISOString().split('T')[0];
      }
      setFiche(data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchFiche();
}, []);

  if (!fiche) return <p>Chargement...</p>;

  const handleChange = (index, field, value) => {
    const newFiche = { ...fiche };
    newFiche.dgs[index][field] = value;

    const d = newFiche.dgs[index];
    if (
      d.propreteFenetreFrontale === 'OK' &&
      d.propreteAfficheur === 'OK' &&
      d.boitierCommande === 'OK'
    ) {
      d.observation = 'RAS';
    } else if (d.observation === 'RAS') {
      d.observation = '';
    }

    setFiche(newFiche);
  };
const handleSend = async () => {
  try {
    const res = await envoyerFicheDGS(fiche._id);
    if (res.message) {
      alert(res.message);
    }
  } catch (error) {
    console.error("Erreur API Envoyer :", error);
    alert("Erreur lors de l'envoi de la fiche");
  }
};
const handleSave = async () => {
  try {
    await enregistrerFicheDGS(fiche._id, fiche);
    alert("Fiche enregistrée avec succès !");
  } catch (error) {
    console.error(error);
    alert("Erreur lors de l'enregistrement");
  }
};
  return (
    <div className="fiche-dgs-container">
      <h2>FICHE D’INSPECTION MENSUELLE DES DGS - {fiche.date}</h2>

      <table>
        <thead>
          <tr>
            <th>DGS</th>
            <th>Propreté fenêtre frontale</th>
            <th>Propreté afficheur</th>
            <th>Boitier commande</th>
            <th>Observation</th>
          </tr>
        </thead>
        <tbody>
          {fiche.dgs.map((item, index) => (
            <tr key={index}>
              <td>{item.numero}</td>
              <td>
                <select
                  value={item.propreteFenetreFrontale}
                  onChange={(e) =>
                    handleChange(
                      index,
                      'propreteFenetreFrontale',
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
                <select
                  value={item.propreteAfficheur}
                  onChange={(e) =>
                    handleChange(index, 'propreteAfficheur', e.target.value)
                  }
                >
                  <option value="">--</option>
                  <option value="OK">OK</option>
                  <option value="HS">HS</option>
                </select>
              </td>
              <td>
                <select
                  value={item.boitierCommande}
                  onChange={(e) =>
                    handleChange(index, 'boitierCommande', e.target.value)
                  }
                >
                  <option value="">--</option>
                  <option value="OK">OK</option>
                  <option value="HS">HS</option>
                </select>
              </td>
              <td>
                <input
                  value={item.observation}
                  onChange={(e) =>
                    handleChange(index, 'observation', e.target.value)
                  }
                  placeholder="Observation"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <textarea
        placeholder="Observation générale"
        value={fiche.observationGenerale}
        onChange={(e) =>
          setFiche({ ...fiche, observationGenerale: e.target.value })
        }
      />

      <input
        type="date"
        value={fiche.date}
        onChange={(e) => setFiche({ ...fiche, date: e.target.value })}
      />

      <input
        type="text"
        placeholder="Technicien Opérateur"
        value={fiche.technicien}
        onChange={(e) => setFiche({ ...fiche, technicien: e.target.value })}
      />
      {/* 
      <button
        onClick={handleSend}
        disabled={fiche.statut !== 'brouillon'}
        style={{
          backgroundColor: fiche.statut === 'brouillon' ? '#2ecc71' : '#bdc3c7',
          cursor: fiche.statut === 'brouillon' ? 'pointer' : 'not-allowed',
        }}
      >
        Envoyer
      </button>
      */}
      <button
  onClick={handleSave}
  style={{
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '8px 16px',
    marginRight: '10px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px'
  }}
>
  Enregistrer
</button>


      <button onClick={handleSend}>
  Envoyer
</button>
    </div>
  );
}
