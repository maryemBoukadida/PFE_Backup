import React, { useState, useEffect } from "react";
import { fetchFiches, updateFiche, sendFiche, sendFicheHist } from "./apiservices/api";
import '../styles/FichePapiMensuelle.css';

export default function FichePapiMensuelle({ isAdmin = false }) { // <-- on peut passer un flag
  const [fiches, setFiches] = useState([]);

  useEffect(() => {
    const getFiches = async () => {
      try {
        const data = await fetchFiches();
        setFiches(data);
      } catch (err) {
        console.error(err);
      }
    };
    getFiches();
  }, []);

  const handleChange = (ficheId, index, field, value) => {
    setFiches(prev =>
      prev.map(f => {
        if (f._id !== ficheId) return f;
        const updated = [...f.verifications];
        updated[index] = { ...updated[index], [field]: value };
        return { ...f, verifications: updated };
      })
    );
  };

  const handleGlobalChange = (ficheId, field, value) => {
    setFiches(prev =>
      prev.map(f => f._id === ficheId ? { ...f, [field]: value } : f)
    );
  };

  const handleSave = async (fiche) => {
    try {
      await updateFiche(fiche._id, fiche);
      console.log("💾 Fiche sauvegardée :", fiche._id);
      alert("Fiche sauvegardée !");
    } catch (err) {
      console.error("❌ Erreur sauvegarde :", err);
    }
  };

  // 🔹 Envoyer au serveur (notification pour admin)
  const handleSend = async (id) => {
    try {
      const result = await sendFiche(id);
      console.log("🟢 Fiche envoyée à l'admin :", result);
      alert(result.message);
      // Retirer la fiche après envoi
      setFiches(prev => prev.filter(f => f._id !== id));
    } catch (err) {
      console.error("❌ Erreur envoi fiche :", err);
    }
  };

  // 🔹 Envoyer dans l'historique (admin valide la fiche)
  const handleSendHist = async (id) => {
    try {
      const result = await sendFicheHist(id);
      console.log("🟢 Fiche envoyée dans l'historique :", result);
      alert(result.message);
      setFiches(prev => prev.filter(f => f._id !== id)); // Retirer la fiche validée
    } catch (err) {
      console.error("❌ Erreur envoi historique :", err);
    }
  };

  return (
    <div>
      <h2>Fiches PAPI - Mensuelle</h2>

      {fiches.map((fiche) => (
        <div key={fiche._id} style={{ marginBottom: "50px" }}>

          <h4>Approche 09</h4>
          <table border={1} cellPadding={2}>
            <thead>
              <tr>
                <th>Élément</th>
                {["11","12","21","22","31","32","41","42"].map(c => <th key={c}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {fiche.verifications.map((v, i) => (
                <tr key={i}>
                  <td>{v.element}</td>
                  {["11","12","21","22","31","32","41","42"].map(c => (
                    <td key={c}>
                      <input
                        value={v[`v${c}_09`] || ""}
                        onChange={(e) => handleChange(fiche._id, i, `v${c}_09`, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Approche 27</h4>
          <table border={1} cellPadding={3}>
            <thead>
              <tr>
                <th>Élément</th>
                {["11","12","21","22","31","32","41","42"].map(c => <th key={c}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {fiche.verifications.map((v, i) => (
                <tr key={i}>
                  <td>{v.element}</td>
                  {["11","12","21","22","31","32","41","42"].map(c => (
                    <td key={c}>
                      <input
                        value={v[`v${c}_27`] || ""}
                        onChange={(e) => handleChange(fiche._id, i, `v${c}_27`, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "20px" }}>
            <h4>Informations générales</h4>
            <div>
              <label>Date :</label>
              <input
                type="date"
                value={fiche.date ? fiche.date.substring(0, 10) : ""}
                onChange={(e) => handleGlobalChange(fiche._id, "date", e.target.value)}
              />
            </div>
            <div>
              <label>Techniciens :</label>
              <input
                type="text"
                value={fiche.techniciens || ""}
                onChange={(e) => handleGlobalChange(fiche._id, "techniciens", e.target.value)}
              />
            </div>
            <div>
              <label>Observations :</label>
              <textarea
                value={fiche.observations || ""}
                onChange={(e) => handleGlobalChange(fiche._id, "observations", e.target.value)}
              />
            </div>
          </div>

          <br />

          <button onClick={() => handleSave(fiche)}>💾 Sauvegarder</button>

          {!isAdmin && <button onClick={() => handleSend(fiche._id)}>📤 Envoyer</button>}

          {isAdmin && <button onClick={() => handleSendHist(fiche._id)}>✅ Valider</button>}

        </div>
      ))}
    </div>
  );
}