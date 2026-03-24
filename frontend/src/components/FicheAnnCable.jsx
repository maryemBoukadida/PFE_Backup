import React, { useState } from "react";
import { enregistrerFicheAnnCable, envoyerFicheAnnCable } from "./apiservices/api";

const initialFiche = {
  type: "inspection_annuelle_postes",
  postesC: [
    {
      titre: "POSTE SST1",
      equipements: [
        { nom: "Câbles MT", etat: "", interventions: "", observations: "" },
        { nom: "Câbles BT", etat: "", interventions: "", observations: "" },
        { nom: "Câbles Optique", etat: "", interventions: "", observations: "" },
        { nom: "Câbles ethernet", etat: "", interventions: "", observations: "" },
        { nom: "Chemins de câbles", etat: "", interventions: "", observations: "" },
        { nom: "Caniveaux", etat: "", interventions: "", observations: "" },
        { nom: "TransformateursElévateurs T1", etat: "", interventions: "", observations: "" },
        { nom: "TransformateursElévateurs T2", etat: "", interventions: "", observations: "" },
        { nom: "Cellule arrivée L1", etat: "", interventions: "", observations: "" },
        { nom: "Cellule arrivée L2", etat: "", interventions: "", observations: "" },
        { nom: "Cellule arrivée No-Break 1", etat: "", interventions: "", observations: "" },
        { nom: "Cellule arrivée No-Break 2", etat: "", interventions: "", observations: "" },
        { nom: "Cellule Départ L1", etat: "", interventions: "", observations: "" },
        { nom: "Cellule Départ L2", etat: "", interventions: "", observations: "" },
        { nom: "Cellule Départ L3", etat: "", interventions: "", observations: "" },
        { nom: "Cellule Départ L4", etat: "", interventions: "", observations: "" },
        { nom: "Cellule protection T1", etat: "", interventions: "", observations: "" },
        { nom: "Cellule protection T2", etat: "", interventions: "", observations: "" },
        { nom: "Cellule de couplage", etat: "", interventions: "", observations: "" }
      ]
    },
    {
      titre: "POSTE SST2",
      equipements: [
        { nom: "Câbles MT", etat: "", interventions: "", observations: "" },
        { nom: "Câbles BT", etat: "", interventions: "", observations: "" },
        { nom: "Câbles Optique", etat: "", interventions: "", observations: "" },
        { nom: "Câbles ethernet", etat: "", interventions: "", observations: "" },
        { nom: "Chemins de câbles", etat: "", interventions: "", observations: "" },
        { nom: "Caniveaux", etat: "", interventions: "", observations: "" },
        { nom: "Regards MT SST1->SST2", etat: "", interventions: "", observations: "" },
        { nom: "Cellule d'arriver à droite C1", etat: "", interventions: "", observations: "" },
        { nom: "Cellule d'arriver à droite C2", etat: "", interventions: "", observations: "" },
        { nom: "Cellule d'arriver à gauche C1", etat: "", interventions: "", observations: "" },
        { nom: "Cellule d'arriver à gauche C2", etat: "", interventions: "", observations: "" },
        { nom: "Cellule MT SST2 CD", etat: "", interventions: "", observations: "" },
        { nom: "Cellule MT SST2 CG", etat: "", interventions: "", observations: "" },
        { nom: "Cellule MT LOC09 CD", etat: "", interventions: "", observations: "" },
        { nom: "Cellule MT LOC09 CG", etat: "", interventions: "", observations: "" },
        { nom: "Cellule MT LOC27 CD", etat: "", interventions: "", observations: "" },
        { nom: "Cellule MT LOC27 CG", etat: "", interventions: "", observations: "" },
        { nom: "Cellule MT Glide 09 CD", etat: "", interventions: "", observations: "" },
        { nom: "Cellule MT Glide 09 CG", etat: "", interventions: "", observations: "" },
        { nom: "Cellule MT Glide 27 CD", etat: "", interventions: "", observations: "" },
        { nom: "Cellule MT Glide 27 CG", etat: "", interventions: "", observations: "" },
        { nom: "Transformateurs T1", etat: "", interventions: "", observations: "" },
        { nom: "Transformateurs T2", etat: "", interventions: "", observations: "" }
      ]
    },
    {
      titre: "POSTE GLIDE09",
      equipements: [
        { nom: "Câbles MT", etat: "", interventions: "", observations: "" },
        { nom: "Câbles BT", etat: "", interventions: "", observations: "" },
        { nom: "Chemins de câbles", etat: "", interventions: "", observations: "" },
        { nom: "Caniveaux", etat: "", interventions: "", observations: "" },
        { nom: "Regards MT SST2->GLIDE09", etat: "", interventions: "", observations: "" },
        { nom: "Transformateurs T1", etat: "", interventions: "", observations: "" },
        { nom: "Transformateurs T2", etat: "", interventions: "", observations: "" }
      ]
    },
    {
      titre: "POSTE GLIDE027",
      equipements: [
        { nom: "Câbles MT", etat: "", interventions: "", observations: "" },
        { nom: "Câbles BT", etat: "", interventions: "", observations: "" },
        { nom: "Chemins de câbles", etat: "", interventions: "", observations: "" },
        { nom: "Caniveaux", etat: "", interventions: "", observations: "" },
        { nom: "Regards MT SST2->GLIDE27", etat: "", interventions: "", observations: "" },
        { nom: "Transformateurs T1", etat: "", interventions: "", observations: "" },
        { nom: "Transformateurs T2", etat: "", interventions: "", observations: "" }
      ]
    },
    {
      titre: "POSTE LOC09",
      equipements: [
        { nom: "Câbles MT", etat: "", interventions: "", observations: "" },
        { nom: "Câbles BT", etat: "", interventions: "", observations: "" },
        { nom: "Chemins de câbles", etat: "", interventions: "", observations: "" },
        { nom: "Caniveaux", etat: "", interventions: "", observations: "" },
        { nom: "Regards MT SST2->LOC09", etat: "", interventions: "", observations: "" },
        { nom: "Transformateurs T1", etat: "", interventions: "", observations: "" },
        { nom: "Transformateurs T2", etat: "", interventions: "", observations: "" }
      ]
    },
    {
      titre: "POSTE LOC27",
      equipements: [
        { nom: "Câbles MT", etat: "", interventions: "", observations: "" },
        { nom: "Câbles BT", etat: "", interventions: "", observations: "" },
        { nom: "Chemins de câbles", etat: "", interventions: "", observations: "" },
        { nom: "Caniveaux", etat: "", interventions: "", observations: "" },
        { nom: "Regards MT SST2->LOC27", etat: "", interventions: "", observations: "" },
        { nom: "Transformateurs T1", etat: "", interventions: "", observations: "" },
        { nom: "Transformateurs T2", etat: "", interventions: "", observations: "" }
      ]
    },
    {
      titre: "POSTE DVOR",
      equipements: [
        { nom: "Câbles BT", etat: "", interventions: "", observations: "" },
        { nom: "Chemins de câbles", etat: "", interventions: "", observations: "" },
        { nom: "Caniveaux", etat: "", interventions: "", observations: "" },
        { nom: "Regards MT SST2->DVOR", etat: "", interventions: "", observations: "" }
      ]
    }
  ],
  date: "",
  technicien_operateur: "",
  signature: "",
  observations_generales: ""
};

export default function FicheAnnCable() {
  const [fiche, setFiche] = useState(initialFiche);
  const [ficheId, setFicheId] = useState(null);

  const handleChange = (posteIndex, equipIndex, champ, valeur) => {
    const newFiche = { ...fiche };
    newFiche.postesC[posteIndex].equipements[equipIndex][champ] = valeur;
    setFiche(newFiche);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await enregistrerFicheAnnCable(fiche);
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
      await envoyerFicheAnnCable(ficheId);
      alert("Fiche envoyée avec succès ✅");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi ❌");
    }
  };

  return (
    <div>
      <h2>Fiche Annuelle Cable</h2>

      <form onSubmit={handleSubmit}>
        <label>Date :</label>
        <input
          type="date"
          value={fiche.date}
          onChange={(e) => setFiche({ ...fiche, date: e.target.value })}
        />
        <br /><br />

        {fiche.postesC.map((poste, pi) => (
          <div key={pi} style={{ marginBottom: "30px" }}>
            <h3>{poste.titre}</h3>
            <table border="1" cellPadding="5" cellSpacing="0">
              <thead>
                <tr>
                  <th>Équipement</th>
                  <th>État</th>
                  <th>Interventions</th>
                  <th>Observations</th>
                </tr>
              </thead>
              <tbody>
                {poste.equipements.map((equip, ei) => (
                  <tr key={ei}>
                    <td>{equip.nom}</td>
                    {["etat","interventions","observations"].map((champ) => (
                      <td key={champ}>
                        <input
                          type="text"
                          value={equip[champ]}
                          onChange={(e) => handleChange(pi, ei, champ, e.target.value)}
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

        <label>Technicien :</label>
        <input
          type="text"
          value={fiche.technicien_operateur}
          onChange={(e) => setFiche({ ...fiche, technicien_operateur: e.target.value })}
        />
        <br /><br />

        <button type="submit">Enregistrer</button>
        <button type="button" onClick={handleEnvoyer}>Envoyer</button>
      </form>
    </div>
  );
}