import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/TechNotifications.css';

export default function TechNotifications({ technicien }) {
  const [notifications, setNotifications] = useState([]);
  const [selectedDTI, setSelectedDTI] = useState(null);
  const navigate = useNavigate();
  const BACKEND_URL = 'http://localhost:5000';

  useEffect(() => {
    console.log('Technicien connecté :', technicien);
    if (!technicien) return;
    loadNotifications();
  }, [technicien]);

  const loadNotifications = async () => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/notifications-tech/${technicien}`
      );
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVoir = async (notif) => {
    try {
      await fetch(`${BACKEND_URL}/api/notifications-tech/read/${notif._id}`, {
        method: 'POST',
      });

      setSelectedDTI(notif.dtiId);
      loadNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatus = async (dtiId, statut) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/dti/status/${dtiId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statut }),
      });

      const data = await res.json();
      setSelectedDTI(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateFiche = () => {
    navigate("/fiche-corrective");
  };

  // Fonction pour obtenir la classe CSS du statut
  const getStatusClass = (statut) => {
    switch(statut) {
      case 'urgente': return 'status-urgent';
      case 'en_cours': return 'status-in-progress';
      case 'terminee': return 'status-completed';
      default: return '';
    }
  };

  return (
    <div className="tech-notifications-container">
      <div className="notifications-header">
        <h3>🔔 Notifications</h3>
        <span className="notifications-count">{notifications.length}</span>
      </div>

      {notifications.length === 0 ? (
        <div className="empty-notifications">
          <div className="empty-icon">📭</div>
          <p>Aucune notification</p>
        </div>
      ) : (
        <div className="notifications-list">
          {notifications.map((n) => (
            <div key={n._id} className="notification-card">
              <div className="notification-content">
                <span className="notification-icon">🔔</span>
                <p className="notification-message">{n.message}</p>
              </div>
              <button 
                onClick={() => handleVoir(n)} 
                className="btn-voir"
              >
                Voir détails →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal pour les détails DTI */}
      {selectedDTI && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>📋 Détail DTI</h3>
              <button 
                onClick={() => setSelectedDTI(null)} 
                className="btn-close"
              >
                ✕
              </button>
            </div>

            <div className="dti-details">
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Titre</label>
                  <p>{selectedDTI.titre}</p>
                </div>

                <div className="detail-item">
                  <label>Équipement</label>
                  <p>{selectedDTI.equipement}</p>
                </div>

                <div className="detail-item full-width">
                  <label>Description</label>
                  <p className="description-text">{selectedDTI.description}</p>
                </div>

                <div className="detail-item">
                  <label>Date</label>
                  <p>{new Date(selectedDTI.date).toLocaleString('fr-FR')}</p>
                </div>

                <div className="detail-item">
                  <label>Statut</label>
                  <span className={`status-badge ${getStatusClass(selectedDTI.statut)}`}>
                    {selectedDTI.statut}
                  </span>
                </div>
              </div>

              {selectedDTI.image && (
                <div className="image-container">
                  <label>Image jointe</label>
                  <img
                    src={`${BACKEND_URL}/uploads/${selectedDTI.image}`}
                    alt="DTI"
                    className="dti-image"
                  />
                </div>
              )}

              <div className="action-buttons">
                <button 
                  onClick={() => handleStatus(selectedDTI._id, 'en_cours')}
                  className="btn-action btn-received"
                >
                  <span>📥</span> Reçu
                </button>

                <button 
                  onClick={() => handleStatus(selectedDTI._id, 'terminee')}
                  className="btn-action btn-validate"
                >
                  <span>✅</span> Valider
                </button>

                <button 
                  onClick={handleCreateFiche}
                  className="btn-action btn-intervention"
                >
                  <span>🛠</span> Créer intervention
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}