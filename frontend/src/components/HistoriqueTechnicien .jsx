import React, { useEffect, useState } from 'react';
import {
  getHistoriqueTechnicienActions,
  getFicheCorrectiveDetail,
} from './apiservices/api';

export default function HistoriqueTechnicien() {
  const [actions, setActions] = useState([]);
  const [ficheDetail, setFicheDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Charger tout l'historique
  useEffect(() => {
    const fetchActions = async () => {
      try {
        const data = await getHistoriqueTechnicienActions();
        console.log('🔥 DATA API :', data);
        setActions(data || []);
      } catch (err) {
        console.error('Erreur récupération historique :', err);
        setActions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchActions();
  }, []);

  // 🔥 Voir détails d'une fiche
  const voirDetailsFiche = async (ficheId) => {
    if (!ficheId) return;
    try {
      const fiche = await getFicheCorrectiveDetail(ficheId);
      setFicheDetail(fiche);
    } catch (err) {
      console.error('Erreur récupération fiche :', err);
    }
  };

  // 🔥 Rendu récursif pour objets complexes
  const renderFicheContent = (data) => {
    if (!data) return <span>--</span>;
    if (Array.isArray(data))
      return data.map((item, idx) => (
        <div key={idx}>{renderFicheContent(item)}</div>
      ));
    if (typeof data === 'object')
      return Object.entries(data).map(([key, value]) => (
        <div key={key} style={{ marginLeft: 10, marginBottom: 4 }}>
          <strong>{key}:</strong>{' '}
          {typeof value === 'object'
            ? renderFicheContent(value)
            : value || '--'}
        </div>
      ));
    return <span>{data.toString()}</span>;
  };

  return (
    <div>
      <h2>Historique Technicien</h2>

      {loading && <p>Chargement...</p>}
      {!loading && actions.length === 0 && <p>Aucune action trouvée</p>}

      {actions.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#eee' }}>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Description</th>
              <th>Observations</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {actions.map((act) => (
              <tr key={act._id}>
                <td>{act.date ? new Date(act.date).toLocaleString() : '--'}</td>
                <td>{act.typeFiche || '--'}</td>
                <td>{act.description || '--'}</td>
                <td>{act.observations || '--'}</td>
                <td>{act.status || '--'}</td>
                <td>
                  <button
                    onClick={() => voirDetailsFiche(act.fiche_corrective_id)}
                  >
                    Voir détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {ficheDetail && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 8,
              width: '80%',
              maxHeight: '90%',
              overflowY: 'auto',
            }}
          >
            <h3>Détails de la fiche</h3>
            {renderFicheContent(ficheDetail)}
            <button
              style={{ marginTop: 10 }}
              onClick={() => setFicheDetail(null)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
