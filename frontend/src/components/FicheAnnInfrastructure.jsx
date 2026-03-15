import React, { useState } from 'react';
import { enregistrerFicheAnnInfrastructure,envoyerFicheAnnInfrastructure } from './apiservices/api';

const initialFiche = {
  PISTE: {
    'Fin de la Piste 27': {},
    'Fin de la Piste 09': {},
    'Seuil de la Piste 27': {},
    'Seuil de la Piste 09': {},
    'Zone de touchée des roues': {},
    'Axe de la Piste': {},
    Retil: {},
    'Bord de la Piste': {},
    'Bord de Taxi way': {},
    'CL de Taxi way': {},
    'STOP BARRE-RGL': {},
    'SST1-SST2': {},
  },
  observationsGenerales: '',
  date: '',
  techniciens_operateurs: [],
};

const verifications = [
  'Vérification que les regards et chambres de tirage ne constituent pas un obstacle et leur intégrité mécanique',
  'Vérification visuelle de l’état des connexions du circuit de terre',
  'Vérification de la propreté intérieure des regards et chambres de tirage',
  'Vérification des saignées',
  'Mise à jour des plans',
];

export default function FicheAnnInfrastructure() {
  const [fiche, setFiche] = useState(initialFiche);
const [ficheId, setFicheId] = useState(null);
  const handleChange = (zone, verification, champ, valeur) => {
    const newFiche = { ...fiche };

    if (!newFiche.PISTE[zone][verification]) {
      newFiche.PISTE[zone][verification] = {
        etat: '',
        intervention_a_faire: '',
        observation: '',
      };
    }

    newFiche.PISTE[zone][verification][champ] = valeur;

    setFiche(newFiche);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await enregistrerFicheAnnInfrastructure(fiche);

    setFicheId(res._id);

    alert("Fiche enregistrée");

  } catch (err) {
    console.error(err);
    alert("Erreur enregistrement");
  }
};
const handleEnvoyer = async () => {

  if (!ficheId) {
    alert("Enregistrer la fiche avant l'envoi");
    return;
  }

  try {

    await envoyerFicheAnnInfrastructure(ficheId);

    alert("Fiche envoyée avec succès");

  } catch (err) {

    console.error(err);

    alert("Erreur lors de l'envoi");

  }
};

  return (
    <div>
      <h2>Fiche Annuelle Infrastructure</h2>

      <form onSubmit={handleSubmit}>
        <label>Date :</label>

        <input
          type="date"
          value={fiche.date}
          onChange={(e) => setFiche({ ...fiche, date: e.target.value })}
        />

        <br />
        <br />

        <table border="1">
          <thead>
            <tr>
              <th>Zone</th>

              <th>Vérification</th>

              <th>Etat</th>

              <th>Intervention à faire</th>

              <th>Observation</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(fiche.PISTE).map((zone) =>
              verifications.map((verification, index) => (
                <tr key={zone + verification}>
                  {index === 0 && (
                    <td rowSpan={verifications.length}>{zone}</td>
                  )}

                  <td>{verification}</td>

                  <td>
                    <select
                      onChange={(e) =>
                        handleChange(zone, verification, 'etat', e.target.value)
                      }
                    >
                      <option value=""></option>
                      <option value="OK">OK</option>
                      <option value="HS">HS</option>
                    </select>
                  </td>

                  <td>
                    <input
                      type="text"
                      onChange={(e) =>
                        handleChange(
                          zone,
                          verification,
                          'intervention_a_faire',
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      onChange={(e) =>
                        handleChange(
                          zone,
                          verification,
                          'observation',
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <br />

        <label>Observations générales</label>

        <textarea
          value={fiche.observationsGenerales}
          onChange={(e) =>
            setFiche({ ...fiche, observationsGenerales: e.target.value })
          }
        />
<label>Technicien :</label>
<input
  type="text"
  value={fiche.techniciens_operateurs[0] || ""}
  onChange={(e) =>
    setFiche({ ...fiche, techniciens_operateurs: [e.target.value] })
  }
/>
<br /><br />

        <br />
        <br />

        <button type="submit">Enregistrer</button>
        <button
  type="button"
  onClick={handleEnvoyer}
>
  Envoyer
</button>
      </form>
    </div>
  );
}
