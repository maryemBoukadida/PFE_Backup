import React, { useEffect, useState } from "react";
import "../styles/Notification.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [selectedFiche, setSelectedFiche] = useState(null);

  const fetchNotifications = async () => {
    try {
    const res = await fetch("http://localhost:5000/api/inspections/tech/notifications");      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    }
  };
useEffect(() => {
  const loadNotifications = async () => {
    await fetchNotifications();
  };

  loadNotifications();
}, []);
  const voirFiche = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/inspections/${id}`);      const data = await res.json();
      setSelectedFiche(data);
    } catch (err) {
      console.error(err);
    }
  };

  const validerFiche = async (id) => {
    try {
      await fetch("/api/inspections/valider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inspectionId: id }),
      });
      alert("Fiche validée ✅");
      setSelectedFiche(null);
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="notification-page">
      <h2>🔔 Notifications</h2>

      <div className="notif-list">
        {notifications.length === 0 ? (
          <p>Aucune notification</p>
        ) : (
          notifications.map((n) => (
            <div key={n._id} className="notif-card">
              <p>{n.message}</p>
              <button onClick={() => voirFiche(n.dataId)}>Voir fiche</button>
            </div>
          ))
        )}
      </div>

      {selectedFiche && (
        <div className="modal">
          <div className="modal-content large">
            <h3>Fiche Inspection {selectedFiche.matricule}</h3>
            <table>
              <thead>
                <tr>
                  <th>Zone</th>
                  <th>Élément</th>
                  <th>Matin</th>
                  <th>Nuit</th>
                </tr>
              </thead>
              <tbody>
                {selectedFiche.inspections.map((item, i) => (
                  <tr key={i}>
                    <td>{item.zone}</td>
                    <td>{item.element}</td>
                    <td>{item.matin?.etat}</td>
                    <td>{item.nuit?.etat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="modal-actions">
              <button onClick={() => validerFiche(selectedFiche._id)}>✅ Valider</button>
              <button onClick={() => setSelectedFiche(null)}>❌ Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}