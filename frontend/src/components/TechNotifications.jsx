import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
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

  // ✅ changer statut
  const handleStatus = async (dtiId, statut) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/dti/status/${dtiId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statut }),
      });

      const data = await res.json();

      <p>
        <b>Statut :</b>
        <span className={`badge ${selectedDTI.statut}`}>
          {selectedDTI.statut}
        </span>
      </p>;

      // mettre à jour local
      setSelectedDTI(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ créer fiche intervention (à adapter plus tard)
  /*
 const handleCreateFiche = async (dti) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/fiche-corrective`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dtiId: dti._id,
          equipement: dti.equipement,
          technicien: technicien,
        }),
      });

      const data = await res.json();

      // redirection
      //window.location.href = `/fiche-corrective/${data._id}`;
    } catch (err) {
      console.error(err);
    }
  };
  */
 const handleCreateFiche = () => {
  navigate("/fiche-corrective");
};

  return (
    <div>
      <h3>📌 Notifications Technicien</h3>

      {notifications.length === 0 && <p>Aucune notification</p>}

      {notifications.map((n) => (
        <div key={n._id} className="notif-card">
          <p>{n.message}</p>
          <button onClick={() => handleVoir(n)}>Voir détails</button>
        </div>
      ))}

      {/* ✅ FICHE DTI */}
      {selectedDTI && (
        <div className="dti-details">
          <h3>📄 Détail DTI</h3>

          <p>
            <b>Titre :</b> {selectedDTI.titre}
          </p>
          <p>
            <b>Équipement :</b> {selectedDTI.equipement}
          </p>
          <p>
            <b>Description :</b> {selectedDTI.description}
          </p>
          <p>
            <b>Date :</b> {new Date(selectedDTI.date).toLocaleString()}
          </p>
          <p>
            <b>Statut :</b> {selectedDTI.statut}
          </p>

          {selectedDTI.image && (
            <img
              src={`${BACKEND_URL}/uploads/${selectedDTI.image}`}
              alt="img"
              width={200}
            />
          )}

          {/* ✅ ACTIONS */}
          <div className="actions">
            <button onClick={() => handleStatus(selectedDTI._id, 'en_cours')}>
              📥 Reçu
            </button>

            <button onClick={() => handleStatus(selectedDTI._id, 'terminee')}>
              ✅ Valide
            </button>

            <button onClick={handleCreateFiche}>
                
              🛠 Créer intervention
            </button>
          </div>

          {/* ✅ FERMER */}
          <br />
          <button onClick={() => setSelectedDTI(null)}>Fermer</button>
        </div>
      )}
    </div>
  );
}
