import React, { useEffect, useState } from "react";
import { getHistoriqueActions, getFicheDetail } from "./apiservices/api";

export default function HistoriqueActions() {
  const [actions, setActions] = useState([]);
  const [ficheDetail, setFicheDetail] = useState(null);

useEffect(() => {
  const fetchActions = async () => {
    try {
      const data = await getHistoriqueActions();
      setActions(data);
    } catch (err) {
      console.error("Erreur récupération historique actions :", err);
      setActions([]); // pour éviter que le tableau soit vide
      alert("Impossible de récupérer l'historique des actions");
    }
  };
  fetchActions();
}, []);

  // Voir les détails de n'importe quelle fiche
  const voirDetailsFiche = async (type, dataId) => {
    try {
      const fiche = await getFicheDetail(type, dataId);
      setFicheDetail(fiche);
    } catch (err) {
      console.error(err);
    }
  };

  // Fonction pour afficher dynamiquement les données d'une fiche
  const renderFicheContent = (data) => {
    if (!data) return null;

    // Si c'est un tableau, afficher chaque élément
    if (Array.isArray(data)) {
      return data.map((item, idx) => (
        <div key={idx} style={{ marginBottom: "10px" }}>
          {renderFicheContent(item)}
        </div>
      ));
    }

    // Si c'est un objet, parcourir ses clés
    if (typeof data === "object") {
      return Object.entries(data).map(([key, value]) => {
        if (value && typeof value === "object") {
          return (
            <div key={key} style={{ marginBottom: "10px", paddingLeft: "10px" }}>
              <strong>{key}:</strong>
              {renderFicheContent(value)}
            </div>
          );
        } else {
          return (
            <div key={key} style={{ marginBottom: "5px" }}>
              <strong>{key}:</strong> {value?.toString() || "--"}
            </div>
          );
        }
      });
    }

    // Si c'est une valeur simple
    return <span>{data?.toString() || "--"}</span>;
  };

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {actions.map((act) => (
            <tr key={act._id}>
              <td>{new Date(act.date).toLocaleString()}</td>
              <td>{act.type}</td>
              <td>{act.message}</td>
              <td>{act.user || "Non renseigné"}</td>
              <td>
                <button onClick={() => voirDetailsFiche(act.type, act.dataId)}>
                  Voir détails
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal pour toutes les fiches */}
      {ficheDetail && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "80%",
              maxHeight: "90%",
              overflowY: "auto",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
          >
            <h3>Détails de la fiche</h3>
            {renderFicheContent(ficheDetail)}
            <button
              onClick={() => setFicheDetail(null)}
              style={{ marginTop: "10px" }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}