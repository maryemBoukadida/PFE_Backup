// DTI.jsx
import React, { useEffect, useState } from "react";
import FormDTI from "../Forms/FormDTI";
import "../styles/DTI.css";

export default function DTI() {
  const [dtiList, setDtiList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null); // null = pas encore cliqué
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1; // 1 DTI par page comme demandé
  const BACKEND_URL = "http://localhost:5000";
const enCours = dtiList.filter(d => d.statut === "en_cours");
  // Charger toutes les DTI
  const loadDTI = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/dti`);
      const data = await res.json();
      setDtiList(data);
    } catch (err) {
      console.error("Erreur chargement DTI :", err);
    }
  };
/*
  useEffect(() => {
    loadDTI();
  }, []);
*/
useEffect(() => {
  loadDTI();

  const interval = setInterval(() => {
    loadDTI(); // refresh auto
  }, 3000); // chaque 3 secondes

  return () => clearInterval(interval);
}, []);
  // Filtrer par statut
  const urgentes = dtiList.filter(d => d.statut === "urgente");
  const normales = dtiList.filter(d => d.statut === "normale");
  const terminees = dtiList.filter(d => d.statut === "terminee");

  // Obtenir la liste selon le filtre
  const filteredList = activeFilter
    ? dtiList.filter(d => d.statut === activeFilter)
    : [];

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentDTI = filteredList.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  const formatTotal = (count) => `${count} demande${count > 1 ? "s" : ""}`;

  return (
    <div>
      <h2>📌 Gestion DTI</h2>

      {/* CARDS */}
      <div className="cards-container">
        <div className="card">
          <h3>🚨 DTI Urgentes</h3>
          <p>({formatTotal(urgentes.length)})</p>
          <button
            onClick={() => {
              setActiveFilter("urgente");
              setCurrentPage(1);
            }}
          >
            VOIR
          </button>
          <button onClick={() => setShowForm(true)}>➕</button>
        </div>

        <div className="card">
          <h3>📋 DTI Normales</h3>
          <p>({formatTotal(normales.length)})</p>
          <button
            onClick={() => {
              setActiveFilter("normale");
              setCurrentPage(1);
            }}
          >
            VOIR
          </button>
        </div>

        <div className="card">
          <h3>✅ Terminées</h3>
          <p>({formatTotal(terminees.length)})</p>
          <button
            onClick={() => {
              setActiveFilter("terminee");
              setCurrentPage(1);
            }}
          >
            VOIR
          </button>
        </div>
        <div className="card">
  <h3>🟠 En cours</h3>
  <p>({formatTotal(enCours.length)})</p>
  <button
    onClick={() => {
      setActiveFilter("en_cours");
      setCurrentPage(1);
    }}
  >
    VOIR
  </button>
</div>
      </div>

      {/* LISTE DTI */}
      {activeFilter && (
        <div className="table-container">
          <h3>
            Liste des DTI{" "}
            {activeFilter === "urgente"
              ? "urgentes"
              : activeFilter === "normale"
              ? "normales"
              : "terminées"}
          </h3>

          <table>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Équipement</th>
                <th>Techniciens assignés</th>
                <th>Statut</th>
                <th>Date & Heure</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {currentDTI.map(d => (
                <tr key={d._id}>
                  <td>{d.titre}</td>
                  <td>{d.equipement}</td>
                  <td>{d.techniciens.join(", ")}</td>
                 <td>
  {d.statut === "urgente" && <span className="badge urgent">🚨 Urgente</span>}
  {d.statut === "normale" && <span className="badge normal">📋 Normale</span>}
  {d.statut === "en_cours" && <span className="badge encours">🟠 En cours</span>}
  {d.statut === "terminee" && <span className="badge done">✅ Terminée</span>}
</td>
                  <td>{new Date(d.date).toLocaleString()}</td>
                  <td>
                    {d.image && (
                      <img
                        src={`${BACKEND_URL}/uploads/${d.image}`}
                        alt="équipement"
                        width={100}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Précédent
              </button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODAL CREATION */}
      {showForm && (
        <FormDTI
          close={(newDTI) => {
            setShowForm(false);
            if (newDTI) setDtiList(prev => [newDTI, ...prev]);
          }}
        />
      )}
    </div>
  );
}