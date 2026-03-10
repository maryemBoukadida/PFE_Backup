import React, { useEffect, useState } from 'react';
import {
  getFichePiste,
  updateFichePiste,
  envoyerFichePiste,
} from './apiservices/api';
import '../styles/FichePiste.css';

export default function FichePisteMensuelle() {
  const [fiche, setFiche] = useState(null);
  const [currentZoneIndex, setCurrentZoneIndex] = useState(0);

  useEffect(() => {
    fetchFiche();
  }, []);

  const fetchFiche = async () => {
    const data = await getFichePiste();
    setFiche(data);
  };

  const handleChange = (
    zoneIndex,
    verifIndex,
    field,
    value,
    isBord = false
  ) => {
    const newFiche = { ...fiche };

    if (isBord) {
      newFiche.zones[zoneIndex][field] = value;

      // Si état OK, intervention désactivée et observation = RAS
      if (field === 'etat' && value === 'OK') {
        newFiche.zones[zoneIndex].intervention = '';
        newFiche.zones[zoneIndex].observation = 'RAS';
      } else if (field === 'etat') {
        newFiche.zones[zoneIndex].observation = '';
      }
    } else {
      newFiche.zones[zoneIndex].verifications[verifIndex][field] = value;

      // Si état OK, intervention désactivée et observation = RAS
      if (field === 'etat' && value === 'OK') {
        newFiche.zones[zoneIndex].verifications[verifIndex].intervention = '';
        newFiche.zones[zoneIndex].verifications[verifIndex].observation = 'RAS';
      } else if (field === 'etat') {
        newFiche.zones[zoneIndex].verifications[verifIndex].observation = '';
      }
    }

    setFiche(newFiche);
  };

  const handleSave = async () => {
    await updateFichePiste(fiche._id, fiche);
    alert('Fiche enregistrée !');
  };

  if (!fiche) return <p>Chargement...</p>;

  const zone = fiche.zones[currentZoneIndex];
  const isZoneComplete = (zone) => {
    if (zone.verifications && zone.verifications.length > 0) {
      return zone.verifications.every(
        (v) =>
          v.etat &&
          v.observation !== '' &&
          (v.etat === 'OK' || v.intervention !== '')
      );
    } else {
      return (
        zone.etat &&
        zone.observation !== '' &&
        (zone.etat === 'OK' || zone.intervention !== '')
      );
    }
  };

  const isFicheComplete = () => {
    return fiche.zones.every((z) => isZoneComplete(z));
  };

  const handleSend = async () => {
    await envoyerFichePiste(fiche._id);

    alert("Fiche envoyée à l'admin");
  };
  return (
    <div className="fiche-container">
      <h2>
        Fiche inspection mensuelle PISTE{' '}
        {fiche.date && (
          <span
            style={{
              fontWeight: 'normal',
              fontSize: '16px',
              marginLeft: '10px',
            }}
          >
            ({new Date(fiche.date).toLocaleDateString()})
          </span>
        )}
      </h2>

      {/* Pagination zones */}
      <div className="pagination">
        <button
          className="nav-btn"
          disabled={currentZoneIndex === 0}
          onClick={() => setCurrentZoneIndex(currentZoneIndex - 1)}
        >
          ◀ Précédent
        </button>

        <div className="zones-grid">
          {fiche.zones.map((z, idx) => (
            <div
              key={idx}
              className={`zone-btn 
          ${idx === currentZoneIndex ? 'active-zone' : ''} 
          ${isZoneComplete(z) ? 'zone-complete' : ''}`}
              onClick={() => setCurrentZoneIndex(idx)}
            >
              <span className="zone-number">{idx + 1}</span>
              <span className="zone-name">{z.nom}</span>

              {isZoneComplete(z) && <span className="zone-check">✔</span>}
            </div>
          ))}
        </div>

        <button
          className="nav-btn"
          disabled={currentZoneIndex === fiche.zones.length - 1}
          onClick={() => setCurrentZoneIndex(currentZoneIndex + 1)}
        >
          Suivant ▶
        </button>
      </div>

      {/* Zone actuelle */}
      <div className="zone-fiche">
        <h3>{zone.nom}</h3>

        {zone.verifications && zone.verifications.length > 0 ? (
          <div className="verifications-grid">
            {zone.verifications.map((verif, idx) => (
              <div className="verif-card" key={idx}>
                <strong>{verif.element}</strong>
                <select
                  value={verif.etat}
                  onChange={(e) =>
                    handleChange(currentZoneIndex, idx, 'etat', e.target.value)
                  }
                >
                  <option value="">--</option>
                  <option value="OK">OK</option>
                  <option value="HS">HS</option>
                </select>
                <input
                  type="text"
                  placeholder="Intervention"
                  value={verif.intervention}
                  disabled={verif.etat === 'OK'} // <-- ici
                  onChange={(e) =>
                    handleChange(
                      currentZoneIndex,
                      idx,
                      'intervention',
                      e.target.value
                    )
                  }
                />

                <input
                  type="text"
                  placeholder="Observation"
                  value={verif.observation}
                  readOnly={verif.etat === 'OK'} // rend la valeur RAS non modifiable
                  onChange={(e) =>
                    handleChange(
                      currentZoneIndex,
                      idx,
                      'observation',
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="bord-piste">
            <label>Etat: </label>
            <select
              value={zone.etat || ''}
              onChange={(e) =>
                handleChange(
                  currentZoneIndex,
                  null,
                  'etat',
                  e.target.value,
                  true
                )
              }
            >
              <option value="">--</option>
              <option value="OK">OK</option>
              <option value="HS">HS</option>
            </select>

            <label>Intervention: </label>
            <input
              value={zone.intervention || ''}
              disabled={zone.etat === 'OK'}
              onChange={(e) =>
                handleChange(
                  currentZoneIndex,
                  null,
                  'intervention',
                  e.target.value,
                  true
                )
              }
            />

            <label>Observation: </label>
            <input
              value={zone.observation || ''}
              readOnly={zone.etat === 'OK'}
              onChange={(e) =>
                handleChange(
                  currentZoneIndex,
                  null,
                  'observation',
                  e.target.value,
                  true
                )
              }
            />
          </div>
        )}
      </div>

      <textarea
        placeholder="Observations générales"
        value={fiche.observationsGenerales}
        onChange={(e) =>
          setFiche({ ...fiche, observationsGenerales: e.target.value })
        }
        className="observations"
      />

      <input
        type="text"
        placeholder="Technicien Operateures"
        value={fiche.techniciensOperateurs[0] || ''}
        onChange={(e) =>
          setFiche({ ...fiche, techniciensOperateurs: [e.target.value] })
        }
        className="technicien-input"
      />
      <input
        type="date"
        value={
          fiche.date ? new Date(fiche.date).toISOString().split('T')[0] : ''
        }
        onChange={(e) => setFiche({ ...fiche, date: e.target.value })}
        className="date-input"
        style={{ marginTop: '10px', display: 'block' }}
      />

      <button onClick={handleSave} className="save-btn">
        Enregistrer
      </button>
      <button
        onClick={handleSend}
        disabled={!isFicheComplete()}
        className="save-btn"
        style={{
          backgroundColor: isFicheComplete() ? '#2ecc71' : '#bdc3c7',
          cursor: isFicheComplete() ? 'pointer' : 'not-allowed',
        }}
      >
        Envoyer
      </button>
    </div>
  );
}
