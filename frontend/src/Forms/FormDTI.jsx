// FormDTI.jsx
import React, { useState } from "react";

export default function FormDTI({ close }) {
  const [form, setForm] = useState({
    titre: "",
    equipement: "",
    description: "",
    techniciens: [],
    date: "",
    statut: "urgente",
    image: null, // <-- pour stocker le fichier image
  });

  const BACKEND_URL = "http://localhost:5000";
const formData = new FormData();

  const handleSubmit = async () => {
    try {
      // Utiliser FormData pour inclure l'image
      const formData = new FormData();
      formData.append("titre", form.titre);
      formData.append("equipement", form.equipement);
      formData.append("description", form.description);
      formData.append("date", form.date);
      formData.append("statut", form.statut);
      form.techniciens.forEach(t => formData.append("techniciens[]", t));
      if (form.image) formData.append("image", form.image);

      const res = await fetch(`${BACKEND_URL}/api/dti`, {
        method: "POST",
        body: formData, // multipart/form-data
      });

      if (!res.ok) throw new Error("Erreur création");

      const data = await res.json();
      alert("DTI créée ✅");
      close(data.dti); // renvoie la DTI créée au parent
    } catch (err) {
      console.error(err);
      alert("❌ Erreur création DTI");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Nouvelle DTI urgente</h3>

        <input
          placeholder="Titre"
          onChange={(e) => setForm({ ...form, titre: e.target.value })}
        />
        <input
          placeholder="Équipement"
          onChange={(e) => setForm({ ...form, equipement: e.target.value })}
        />
        <textarea
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* MULTI TECHNICIEN */}
        <select
          multiple
          onChange={(e) =>
            setForm({
              ...form,
              techniciens: [...e.target.selectedOptions].map(o => o.value),
            })
          }
        >
          <option value="A001">Skander</option>
          <option value="A002">Anis</option>
          <option value="A003">Saber</option>
          <option value="A004">Walid</option>
        </select>

        {/* IMAGE UPLOAD */}
        <div>
          <label htmlFor="image">Image de l'équipement HS :</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          />
        </div>

        {/* DATE + HEURE */}
        <div>
          <label>Date et heure :</label>
          <input
            type="datetime-local"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <button onClick={() => close(null)}>Annuler</button>
          <button onClick={handleSubmit}>Créer et Envoyer</button>
        </div>
      </div>
    </div>
  );
}