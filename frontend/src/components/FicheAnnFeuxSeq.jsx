import React, { useState } from "react";
import { enregistrerFicheAnnFeuxSeq, envoyerFicheAnnFeuxSeq } from "./apiservices/api";

const initialFiche = {
  type: "inspection_annuelle_feux_sequentiels",
  titre: "FICHE D’INSPECTION ANNUELLE DES FEUX SEQUENTIELS",
  blocs: [
    {
      titre: "09",
      elements: [
        { verification: "Propreté des têtes des feux flash", etat: "", interventions: "", observations: "" },
        { verification: "Switchs de sécurité", etat: "", interventions: "", observations: "" },
        { verification: "Joint", etat: "", interventions: "", observations: "" },
        { verification: "Câbles des flash", etat: "", interventions: "", observations: "" },
        { verification: "Coffret d'alimentation", etat: "", interventions: "", observations: "" },
        { verification: "Câbles d'alimentation", etat: "", interventions: "", observations: "" },
        { verification: "Câbles de commandes", etat: "", interventions: "", observations: "" },
        { verification: "Propreté des coffrets flash", etat: "", interventions: "", observations: "" },
        { verification: "Alimentation", etat: "", interventions: "", observations: "" },
        { verification: "Commande", etat: "", interventions: "", observations: "" },
        { verification: "Coffret de supervision CMS", etat: "", interventions: "", observations: "" }
      ]
    },
    {
      titre: "27",
      elements: [
        { verification: "Propreté des têtes des feux flash", etat: "", interventions: "", observations: "" },
        { verification: "Switchs de sécurité", etat: "", interventions: "", observations: "" },
        { verification: "Joint", etat: "", interventions: "", observations: "" },
        { verification: "Câbles des flash", etat: "", interventions: "", observations: "" },
        { verification: "Coffret d'alimentation", etat: "", interventions: "", observations: "" },
        { verification: "Câbles d'alimentation", etat: "", interventions: "", observations: "" },
        { verification: "Câbles de commandes", etat: "", interventions: "", observations: "" },
        { verification: "Propreté des coffrets flash", etat: "", interventions: "", observations: "" },
        { verification: "Alimentation", etat: "", interventions: "", observations: "" },
        { verification: "Commande", etat: "", interventions: "", observations: "" },
        { verification: "Coffret de supervision CMS", etat: "", interventions: "", observations: "" },
        { verification: "Observations", etat: "", interventions: "", observations: "" }
      ]
    }
  ],
  observations_generales: "",
  date: "",
  techniciens_operateurs: "",
  signature: ""
};

export default function FicheAnnFeuxSeq() {
  const [fiche, setFiche] = useState(initialFiche);
  const [ficheId, setFicheId] = useState(null);

  const handleChange = (blocIndex, elementIndex, champ, valeur) => {
    const newFiche = { ...fiche };
    newFiche.blocs[blocIndex].elements[elementIndex][champ] = valeur;
    setFiche(newFiche);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await enregistrerFicheAnnFeuxSeq(fiche);
      setFicheId(res._id);
      alert("Fiche enregistrée ✅");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement ❌");
    }
  };

  const handleEnvoyer = async () => {
    if (!ficheId) {
      alert("Enregistrer la fiche avant l'envoi");
      return;
    }
    try {
      await envoyerFicheAnnFeuxSeq(ficheId);
      alert("Fiche envoyée avec succès ✅");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi ❌");
    }
  };

  return (
    <div>
      <h2>{fiche.titre}</h2>

      <form onSubmit={handleSubmit}>
        <label>Date :</label>
        <input
          type="date"
          value={fiche.date}
          onChange={(e) => setFiche({ ...fiche, date: e.target.value })}
        />
        <br /><br />

        {fiche.blocs.map((bloc, bi) => (
          <div key={bi} style={{ marginBottom: "30px" }}>
            <h3>Bloc {bloc.titre}</h3>
            <table border="1" cellPadding="5" cellSpacing="0">
              <thead>
                <tr>
                  <th>Vérification</th>
                  <th>État</th>
                  <th>Interventions</th>
                  <th>Observations</th>
                </tr>
              </thead>
              <tbody>
                {bloc.elements.map((elem, ei) => (
                  <tr key={ei}>
                    <td>{elem.verification}</td>
                    {["etat", "interventions", "observations"].map((champ) => (
                      <td key={champ}>
                        <input
                          type="text"
                          value={elem[champ]}
                          onChange={(e) => handleChange(bi, ei, champ, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        <label>Observations générales :</label>
        <textarea
          value={fiche.observations_generales}
          onChange={(e) => setFiche({ ...fiche, observations_generales: e.target.value })}
        />
        <br />

        <label>Techniciens :</label>
        <input
          type="text"
          value={fiche.techniciens_operateurs}
          onChange={(e) => setFiche({ ...fiche, techniciens_operateurs: e.target.value })}
        />
        <br /><br />

        <label>Signature :</label>
        <input
          type="text"
          value={fiche.signature}
          onChange={(e) => setFiche({ ...fiche, signature: e.target.value })}
        />
        <br /><br />

        <button type="submit">Enregistrer</button>
        <button type="button" onClick={handleEnvoyer}>Envoyer</button>
      </form>
    </div>
  );
}