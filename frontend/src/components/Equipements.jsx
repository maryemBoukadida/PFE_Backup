import React, { useState, useEffect } from "react";
import {
  getEquipements,
  createEquipement,
  updateEquipement,
  deleteEquipement
} from "./apiservices/api";

export default function EquipementsComponent() {
  const [equipements, setEquipements] = useState([]);
  const [formData, setFormData] = useState({});
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 🔹 Charger tous les équipements
  const loadEquipements = async () => {
    try {
      const data = await getEquipements();
      console.log("📦 Equipements reçus:", data);
      setEquipements(data);
    } catch (err) {
      console.error("Erreur chargement :", err);
      alert("❌ Impossible de charger les équipements");
    }
  };

  useEffect(() => {
    loadEquipements();
  }, []);

  // 🔹 Création ou modification
  const handleSubmit = async () => {
    try {
      if (editMode && currentId) {
        await updateEquipement(currentId, formData);
        alert("Équipement modifié ✅");
      } else {
        const data = await createEquipement(formData);
        alert(data.message || "Équipement créé ✅");
      }

      setShowForm(false);
      setEditMode(false);
      setCurrentId(null);
      loadEquipements();

    } catch (err) {
      console.error("Erreur fetch :", err);
      alert(err.message || "❌ Erreur serveur");
    }
  };

  // 🔹 Supprimer un équipement
  const handleDeleteClick = (equipement) => {
    setDeleteTarget(equipement);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
  if (!deleteTarget?._id) return;

  try {
    const data = await deleteEquipement(deleteTarget._id);
    alert(data.message || "Équipement supprimé ✅");
    setShowDeleteModal(false);
    setDeleteTarget(null);
    loadEquipements();
  } catch (err) {
    console.error("Erreur suppression :", err);
    alert(err.message || "❌ Impossible de contacter le serveur");
  }
};

  // 🔹 Filtrage recherche
  const filteredEquipements = equipements.filter(eq =>
    (eq.designation_equipement || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Recherche */}
      <input
        type="text"
        placeholder="Recherche..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Liste équipements */}
      <ul>
        {filteredEquipements.map(eq => (
          <li key={eq._id}>
            {eq.designation_equipement} - {eq.code_patrimoine}
            <button onClick={() => handleDeleteClick(eq)}>Supprimer</button>
            <button onClick={() => {
              setEditMode(true);
              setCurrentId(eq._id);
              setFormData(eq);
              setShowForm(true);
            }}>Modifier</button>
          </li>
        ))}
      </ul>

      {/* Modal suppression */}
      {showDeleteModal && (
        <div className="modal">
          <p>Confirmer la suppression de {deleteTarget.designation_equipement} ?</p>
          <button onClick={handleDeleteConfirmed}>Oui</button>
          <button onClick={() => setShowDeleteModal(false)}>Non</button>
        </div>
      )}

      {/* Formulaire création/modification */}
      {showForm && (
        <div className="modal">
          <h3>{editMode ? "Modifier" : "Créer"} un équipement</h3>
          <input
            placeholder="Désignation"
            value={formData.designation_equipement || ""}
            onChange={(e) => setFormData({ ...formData, designation_equipement: e.target.value })}
          />
          <input
            placeholder="Code patrimoine"
            value={formData.code_patrimoine || ""}
            onChange={(e) => setFormData({ ...formData, code_patrimoine: e.target.value })}
            disabled={editMode} // Ne pas modifier le code lors de l'édition
          />
          <button onClick={handleSubmit}>{editMode ? "Modifier" : "Créer"}</button>
          <button onClick={() => setShowForm(false)}>Annuler</button>
        </div>
      )}
    </div>
  );
}
