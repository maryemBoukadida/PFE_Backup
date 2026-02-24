import React, { useState } from "react";
import { createEquipement } from "../components/apiservices/api";

function FormAjoutEquip({ closeModal }) {

  const [formData, setFormData] = useState({
    designation_equipement: "",
    lieu_installation: "",
    code_patrimoine: "",
    adresse_ip: "",
    fournisseur: "",
    installateur: "",
    plaque: "",
    contact: "",
    tel_direct: "",
    gsm: "",
    tel_office: "",
    fax: "",
    feuille: "",
    quantite: "",
    type_stock: "PHG",
    excel_file: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createEquipement(formData);
      alert(res.message || "Equipement ajouté avec succès");
      closeModal();

    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Ajouter un équipement</h3>

      <input name="designation_equipement" placeholder="Désignation" onChange={handleChange} required />
      <input name="lieu_installation" placeholder="Lieu installation" onChange={handleChange} />
      <input name="code_patrimoine" placeholder="Code patrimoine" onChange={handleChange} required />
      <input name="adresse_ip" placeholder="Adresse IP" onChange={handleChange} />
      <input name="fournisseur" placeholder="Fournisseur" onChange={handleChange} />
      <input name="installateur" placeholder="Installateur" onChange={handleChange} />
      <input name="plaque" placeholder="Plaque" onChange={handleChange} />
      <input name="contact" placeholder="Contact" onChange={handleChange} />
      <input name="tel_direct" placeholder="Tel direct" onChange={handleChange} />
      <input name="gsm" placeholder="GSM" onChange={handleChange} />
      <input name="tel_office" placeholder="Tel office" onChange={handleChange} />
      <input name="fax" placeholder="Fax" onChange={handleChange} />

      {/* ✅ Quantité */}
      <input 
        type="number"
        name="quantite"
        placeholder="Quantité"
        onChange={handleChange}
        min="0"
        required
      />
      {/* ✅ Type de stock */}
      <select name="type_stock" onChange={handleChange} value={formData.type_stock}>
        <option value="PHG">PG</option>
        <option value="AGL">AGL</option>
        <option value="BALISAGE">Balisage</option>
      </select>



      <div className="modal-actions">
        <button type="submit">Enregistrer</button>
        <button type="button" onClick={closeModal}>Annuler</button>
      </div>

    </form>
  );
}

export default FormAjoutEquip;
