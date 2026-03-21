import React, { useState } from "react";
import "../styles/GestionStock.css";
import { getDesignations, addEquipement } from "../components/apiservices/api";
import jsPDF from "jspdf";
//import html2canvas from "html2canvas";
import autoTable from "jspdf-autotable"; 

export default function GestionStock() {
  const [form, setForm] = useState({
    designation: "",
    numeroSerie: "",
    codeOracle: "",
    numeroRequisition: "",
    dateLivraison: "",
    prixTotal: "",
    prixUnitaire: "",
    quantite: "",
      unite: "", // ✅ AJOUT
    emplacement: "",
    autreEmplacement: ""
  });

  const [designations, setDesignations] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showAutre, setShowAutre] = useState(false);

  // 🔹 charger désignations
  const fetchDesignations = async (type) => {
    try {
      const data = await getDesignations(type);
      const formatted = data.map((item) => item.designation);
      setDesignations(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 changement
 const handleChange = (e) => {
  const { name, value } = e.target;

  let updated = { ...form, [name]: value };

  // 🔥 recalcul automatique
  if (name === "prixUnitaire" || name === "quantite") {
    const prix = name === "prixUnitaire" ? value : form.prixUnitaire;
    const qte = name === "quantite" ? value : form.quantite;

    if (prix && qte) {
      updated.prixTotal = Number(prix) * Number(qte);
    } else {
      updated.prixTotal = "";
    }
  }

  // 🔹 gestion emplacement
  if (name === "emplacement") {
    setShowAutre(value === "autre");
    updated.designation = "";
    setSuggestions([]);

    if (value && value !== "autre") {
      fetchDesignations(value);
    } else {
      setDesignations([]);
    }
  }

  // 🔹 recherche désignation
  if (name === "designation") {
    const filtered = designations.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  }

  setForm(updated);
};


// 🔥 SUBMIT (VERSION SIMPLE JSON)
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let emplacementFinal = form.emplacement;

    //  gestion "autre"
    if (form.emplacement === "autre") {
      if (!form.autreEmplacement) {
        alert("Veuillez saisir un emplacement");
        return;
      }
      emplacementFinal = form.autreEmplacement;
    }

    //  validation minimale
    if (!form.designation || !form.quantite || !emplacementFinal) {
      alert("Veuillez remplir designation, quantite et emplacement");
      return;
    }

    //  envoi vers API (JSON)
    const res = await addEquipement({
      designation: form.designation,
      quantite: form.quantite,
      emplacement: emplacementFinal,
      numeroSerie: form.numeroSerie,
      codeOracle: form.codeOracle,
      numeroRequisition: form.numeroRequisition,
      dateLivraison: form.dateLivraison,
      prixUnitaire: form.prixUnitaire,
      prixTotal: form.prixTotal
    });

    alert(res.message);

    // ✅ reset du formulaire
    setForm({
      designation: "",
      numeroSerie: "",
      codeOracle: "",
      numeroRequisition: "",
      dateLivraison: "",
      prixTotal: "",
      prixUnitaire: "",
      quantite: "",
      emplacement: "",
      autreEmplacement: ""
    });

    setSuggestions([]);
    setShowAutre(false);

  } catch (error) {
    console.error("❌", error);
    alert("Erreur lors de l'ajout");
  }
};

 const exportPDF = () => {
  const pdf = new jsPDF();

  let y = 20;

  pdf.setFontSize(18);
  pdf.text("Fiche Entrée Stock", 20, y);

  y += 10;
  pdf.setFontSize(12);

  const lignes = [
    `Désignation : ${form.designation}`,
    `Quantité : ${form.quantite} ${form.unite}`,
    `Prix unitaire : ${form.prixUnitaire}`,
    `Prix total : ${form.prixTotal}`,
    `Emplacement : ${form.emplacement === "autre" ? form.autreEmplacement : form.emplacement}`,
    `Numéro série : ${form.numeroSerie}`,
    `Code Oracle : ${form.codeOracle}`,
    `N° Réquisition : ${form.numeroRequisition}`,
    `Date livraison : ${form.dateLivraison}`
  ];

  lignes.forEach((ligne) => {
    pdf.text(ligne, 20, y);
    y += 8;
  });
autoTable(pdf, {
  startY: y,
  head: [["Champ", "Valeur"]],
  body: [
    ["Désignation", form.designation],
    ["Quantité", `${form.quantite} ${form.unite}`],
    ["Prix unitaire", form.prixUnitaire],
    ["Prix total", form.prixTotal],
    ["Emplacement", form.emplacement === "autre" ? form.autreEmplacement : form.emplacement],
  ],
});
  pdf.save("entree_stock.pdf");
};

  return (
    <div className="invoice-container dark">

      <h2 className="title">🧾 Nouvelle Entrée Stock</h2>

      {/* 📄 CONTENU FACTURE */}
      <div id="facture">

        <form onSubmit={handleSubmit} className="invoice-form">

          {/* EMPLACEMENT */}
          <div className="section">
            <label>Emplacement</label>
            <select name="emplacement" value={form.emplacement} onChange={handleChange}>
              <option value="">-- Choisir --</option>
              <option value="balisage">Balisage</option>
              <option value="pg">PG</option>
              <option value="autre">Autre</option>
            </select>

            {showAutre && (
              <input
                placeholder="➕ Nouvel emplacement..."
                name="autreEmplacement"
                value={form.autreEmplacement}
                onChange={handleChange}
              />
            )}
          </div>

          {/* DESIGNATION */}
          <div className="section">
            <label>Désignation</label>
            <input
              name="designation"
              value={form.designation}
              onChange={handleChange}
              placeholder="🔍 Rechercher..."
              disabled={!form.emplacement}
            />

            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setForm({ ...form, designation: s });
                      setSuggestions([]);
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* INFOS */}
          <div className="grid">
            <input name="numeroSerie" placeholder="Numéro série" onChange={handleChange} value={form.numeroSerie} />
            <input name="codeOracle" placeholder="Code Oracle" onChange={handleChange} value={form.codeOracle} />
            <input name="numeroRequisition" placeholder="N° Réquisition" onChange={handleChange} value={form.numeroRequisition} />
            <input type="date" name="dateLivraison" onChange={handleChange} value={form.dateLivraison} />
          </div>

          {/* PRIX */}
       <div className="grid">
  <input
    type="number"
    name="prixUnitaire"
    placeholder="Prix unitaire"
    onChange={handleChange}
    value={form.prixUnitaire}
  />

  {/* Quantité + unité */}
  <div style={{ display: "flex", gap: "10px" }}>
    <input
      type="number"
      name="quantite"
      placeholder="Quantité"
      onChange={handleChange}
      value={form.quantite}
      style={{ flex: 2 }}
    />

    <select
      name="unite"
      value={form.unite}
      onChange={handleChange}
      style={{ flex: 1 }}
    >
      <option value="">Unité</option>
      <option value="piece">Pièce</option>
      <option value="litre">Litre</option>
      <option value="kg">Kg</option>
      <option value="metre">Mètre</option>
      <option value="lot">Lot</option>
    </select>
  </div>

  <input
    type="number"
    name="prixTotal"
    placeholder="Prix total"
    value={form.prixTotal}
    readOnly
  />
</div>

          {/* ACTIONS */}
          <div className="actions">
            <button type="button" className="cancel" onClick={() => window.location.reload()}>
              Annuler
            </button>

            <button type="button" onClick={exportPDF} className="export">
              📄 Exporter PDF
            </button>

            <button type="submit" className="confirm">
              Confirmer
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}