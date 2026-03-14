import React, { useEffect, useState, useRef } from "react";
import { getFicheAnnTgbt, enregistrerFicheAnnTgbt, envoyerFicheAnnTgbt } from './apiservices/api';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SignatureCanvas from "react-signature-canvas";

export default function FicheTGBTAnnuelle() {
  const [fiche, setFiche] = useState(null);
  const [date, setDate] = useState(new Date()); // date par défaut = maintenant
  const [loading, setLoading] = useState(true);
  const signatureRef = useRef();

  useEffect(() => {
    const fetchFiche = async () => {
      try {
        const data = await getFicheAnnTgbt();
        setFiche(data);
        setDate(data.date ? new Date(data.date) : new Date());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFiche();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (!fiche) return <p>Aucune fiche trouvée</p>;

  const updateElement = (posteIndex, elementIndex, field, value) => {
    const newFiche = { ...fiche };
    newFiche.postes[posteIndex].elements[elementIndex][field] = value;
    setFiche(newFiche);
  };

  const handleSave = async () => {
    try {
      const updated = {
        ...fiche,
        date: date ? date.toISOString() : fiche.date,
        signature: signatureRef.current.isEmpty() ? "" : signatureRef.current.toDataURL()
      };
      await enregistrerFicheAnnTgbt(fiche._id, updated);
      alert("Fiche enregistrée avec succès");
    } catch (err) {
      console.error(err);
      alert("Erreur enregistrement");
    }
  };

  const handleSend = async () => {
    try {
      if (!fiche.technicien_operateurs || fiche.technicien_operateurs.trim() === "") {
        return alert("Veuillez saisir le technicien");
      }
      await envoyerFicheAnnTgbt(fiche._id);
      alert("Fiche envoyée avec succès");
    } catch (err) {
      console.error(err);
      alert("Erreur envoi");
    }
  };

  return (
    <div className="fiche-container">
      {/* Titre avec date */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Fiche Annuelle TGBT</h2>
        <span><strong>Le : {date.toLocaleDateString()}</strong></span>
      </div>

      {/* Tableau des postes */}
      <div className="table-card">
        <table className="inspection-table">
          <thead>
            <tr>
              <th>Élément</th>
              <th>État</th>
              <th>Interventions</th>
              <th>Observations</th>
            </tr>
          </thead>
          <tbody>
            {fiche.postes.map((poste, posteIndex) => (
              <React.Fragment key={poste.nom}>
                <tr>
                  <td colSpan="4" className="section-title">{poste.nom}</td>
                </tr>
                {poste.elements.map((el, elIndex) => (
                  <tr key={el.nom}>
                    <td>{el.nom}</td>
                    <td>
                      <select
                        value={el.etat}
                        onChange={(e) => updateElement(posteIndex, elIndex, "etat", e.target.value)}
                      >
                        <option value="">--</option>
                        <option value="OK">OK</option>
                        <option value="HS">HS</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={el.interventions}
                        onChange={(e) => updateElement(posteIndex, elIndex, "interventions", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={el.observations}
                        onChange={(e) => updateElement(posteIndex, elIndex, "observations", e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* DatePicker au bas du tableau */}
        <div style={{ marginTop: "15px" }}>
          <label>Date de la fiche :</label>
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      {/* Observations générales */}
      <div className="obs-section">
        <h3>Observations générales</h3>
        <textarea
          value={fiche.observations_generales}
          onChange={(e) => setFiche({ ...fiche, observations_generales: e.target.value })}
        />
      </div>

      {/* Technicien / opérateurs */}
      <div className="technicien-section">
        <h3>Technicien / Opérateurs</h3>
        <input
          type="text"
          value={fiche.technicien_operateurs}
          onChange={(e) => setFiche({ ...fiche, technicien_operateurs: e.target.value })}
        />
      </div>

      {/* Signature */}
      <div className="signature-section">
        <h3>Signature</h3>
        <SignatureCanvas
          ref={signatureRef}
          penColor="black"
          canvasProps={{ width: 400, height: 150, className: "signature-canvas" }}
        />
        <button className="btn-clear" onClick={() => signatureRef.current.clear()}>Effacer</button>
      </div>

      {/* Boutons */}
      <div className="button-section">
        <button className="btn-save" onClick={handleSave}>Enregistrer</button>
        <button className="btn-send" onClick={handleSend}>Envoyer</button>
      </div>
    </div>
  );
}