import React, { useState } from 'react';
import { enregistrerFicheEffar, envoyerFicheEffar } from './apiservices/api';

const initialFiche = {
  fiches: [
    "EFF09-4","EFF09-3","EFF09-2","EFF09-1",
    "EFF27-1","EFF27-2","EFF27-3","EFF27-4"
  ].map(fiche => ({
    fiche,
    verifications: {
      panneaux_solaires: { etat: '', intervention_a_faire: '', observation: '' },
      haut_parleur: {
        "1": { etat: '', intervention_a_faire: '', observation: '' },
        "2": { etat: '', intervention_a_faire: '', observation: '' },
      },
      transmission: { etat: '', intervention_a_faire: '', observation: '' },
      telecommande: { etat: '', intervention_a_faire: '', observation: '' },
      modem: { etat: '', intervention_a_faire: '', observation: '' },
      batterie: { etat: '', intervention_a_faire: '', observation: '' },
      fusible: { etat: '', intervention_a_faire: '', observation: '' },
    }
  })),
  observations_generales: '',
  date: '',
  technicien_operateur: '',
  signature: ''
};

export default function FicheEffar() {
  const [fiche, setFiche] = useState(initialFiche);
  const [ficheId, setFicheId] = useState(null);

  const handleChange = (ficheIndex, verificationKey, subKey, champ, valeur) => {
    const newFiche = { ...fiche };
    if (subKey) {
      if (!newFiche.fiches[ficheIndex].verifications[verificationKey][subKey]) {
        newFiche.fiches[ficheIndex].verifications[verificationKey][subKey] = {
          etat: '', intervention_a_faire: '', observation: ''
        };
      }
      newFiche.fiches[ficheIndex].verifications[verificationKey][subKey][champ] = valeur;
    } else {
      newFiche.fiches[ficheIndex].verifications[verificationKey][champ] = valeur;
    }
    setFiche(newFiche);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await enregistrerFicheEffar(fiche);
      setFicheId(res._id);
      alert('Fiche Effaroucheur enregistrée !');
    } catch (err) {
      console.error(err);
      alert('Erreur enregistrement fiche');
    }
  };

  const handleEnvoyer = async () => {
    if (!ficheId) return alert('Enregistrez la fiche avant envoi');
    try {
      await envoyerFicheEffar(ficheId);
      alert('Fiche envoyée avec succès');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de l’envoi');
    }
  };

  return (
    <div>
      <h2>Fiche Annuelle Effaroucheur</h2>
      <form onSubmit={handleSubmit}>
        <label>Date :</label>
        <input
          type="date"
          value={fiche.date}
          onChange={(e) => setFiche({ ...fiche, date: e.target.value })}
        />

        <br /><br />

        <table border="1">
          <thead>
            <tr>
              <th>Fiche</th>
              <th>Vérification</th>
              <th>Sub-item</th>
              <th>État</th>
              <th>Intervention à faire</th>
              <th>Observation</th>
            </tr>
          </thead>
          <tbody>
            {fiche.fiches.map((f, fi) =>
              Object.entries(f.verifications).map(([verifKey, verifVal]) => {
                if (typeof verifVal === 'object' && !Array.isArray(verifVal) && Object.keys(verifVal).every(k => ['etat','intervention_a_faire','observation'].includes(k))) {
                  // cas simple
                  return (
                    <tr key={`${fi}-${verifKey}`}>
                      <td>{f.fiche}</td>
                      <td>{verifKey}</td>
                      <td>-</td>
                      <td>
                        <select
                          value={verifVal.etat}
                          onChange={(e) => handleChange(fi, verifKey, null, 'etat', e.target.value)}
                        >
                          <option value=""></option>
                          <option value="OK">OK</option>
                          <option value="HS">HS</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          value={verifVal.intervention_a_faire}
                          onChange={(e) => handleChange(fi, verifKey, null, 'intervention_a_faire', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={verifVal.observation}
                          onChange={(e) => handleChange(fi, verifKey, null, 'observation', e.target.value)}
                        />
                      </td>
                    </tr>
                  )
                } else {
                  // cas sub-items (ex: haut_parleur)
                  return Object.entries(verifVal).map(([subKey, subVal]) => (
                    <tr key={`${fi}-${verifKey}-${subKey}`}>
                      <td>{f.fiche}</td>
                      <td>{verifKey}</td>
                      <td>{subKey}</td>
                      <td>
                        <select
                          value={subVal.etat}
                          onChange={(e) => handleChange(fi, verifKey, subKey, 'etat', e.target.value)}
                        >
                          <option value=""></option>
                          <option value="OK">OK</option>
                          <option value="HS">HS</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          value={subVal.intervention_a_faire}
                          onChange={(e) => handleChange(fi, verifKey, subKey, 'intervention_a_faire', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={subVal.observation}
                          onChange={(e) => handleChange(fi, verifKey, subKey, 'observation', e.target.value)}
                        />
                      </td>
                    </tr>
                  ))
                }
              })
            )}
          </tbody>
        </table>

        <br />

        <label>Observations générales :</label>
        <textarea
          value={fiche.observations_generales}
          onChange={(e) => setFiche({ ...fiche, observations_generales: e.target.value })}
        />

        <label>Technicien :</label>
        <input
          type="text"
          value={fiche.technicien_operateur}
          onChange={(e) => setFiche({ ...fiche, technicien_operateur: e.target.value })}
        />

        <br /><br />

        <button type="submit">Enregistrer</button>
        <button type="button" onClick={handleEnvoyer}>
          Envoyer
        </button>
      </form>
    </div>
  );
}