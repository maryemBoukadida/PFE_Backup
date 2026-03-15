import React, { useEffect, useState } from "react";
import { getHistoriqueActions } from "./apiservices/api";

export default function HistoriqueActions() {
  const [actions, setActions] = useState([]);

useEffect(() => {
  const fetchActions = async () => {
    try {
      const data = await getHistoriqueActions(); // URL corrigée
      setActions(data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchActions();
}, []);

  return (
    <div>
      <h2>Historique des Actions</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ backgroundColor: "#eee" }}>
            <th>Date</th>
            <th>Type</th>
            <th>Message</th>
            <th>Utilisateur</th>
          </tr>
        </thead>
        <tbody>
          {actions.map((act) => (
            <tr key={act._id}>
              <td>{new Date(act.date).toLocaleString()}</td>
              <td>{act.type}</td>
              <td>{act.message}</td>
              <td>{act.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
