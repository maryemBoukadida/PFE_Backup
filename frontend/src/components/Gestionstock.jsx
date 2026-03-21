import React, { useState } from "react";
import "../styles/GestionStock.css";
import { getDesignations, addEquipement } from "../components/apiservices/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

  // 📄 EXPORT PDF
  const exportPDF = async () => {
    const element = document.getElementById("facture");

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("facture_stock.pdf");
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
            <input type="number" name="prixUnitaire" placeholder="Prix unitaire" onChange={handleChange} value={form.prixUnitaire} />
            <input type="number" name="quantite" placeholder="Quantité" onChange={handleChange} value={form.quantite} />
            <input type="number" name="prixTotal" placeholder="Prix total" onChange={handleChange} value={form.prixTotal} />
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