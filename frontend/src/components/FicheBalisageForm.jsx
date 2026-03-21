import React, { useState ,useEffect } from "react";
import {
  enregistrerFicheBalisage,
  envoyerFicheBalisage
} from "./apiservices/api";

// =======================
// INITIAL DATA
// =======================

const emptyObs = {
  nf: "",
  fonctionnement: "",
  interventions: "",
  observations: ""
};

const initialFiche = {
  date: new Date(),

  groupes: [
    {
      titre: "Approche 09",
      lignes: [
        { designation: "Approche 450 derniers mètres", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Approche en amont des 450 derniers mètres", matin: {...emptyObs}, nuit: {...emptyObs} }
      ]
    },
    {
      titre: "Approche 27",
      lignes: [
        { designation: "Approche 450 derniers mètres", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Approche en amont des 450 derniers mètres", matin: {...emptyObs}, nuit: {...emptyObs} }
      ]
    },
    {
      titre: "PAPI 09",
      lignes: [
        { designation: "Fonctionnement électrique de chaque unité PAPI", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Contrôle de l'intégrité physique des unités PAPI", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Contrôle visuel de la végétation", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Lampes H/S", matin: {...emptyObs}, nuit: {...emptyObs} }
      ]
    },
    {
      titre: "PAPI 27",
      lignes: [
        { designation: "Fonctionnement électrique de chaque unité PAPI", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Contrôle de l'intégrité physique des unités PAPI", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Contrôle visuel de la végétation", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Lampes H/S", matin: {...emptyObs}, nuit: {...emptyObs} }
      ]
    },
    {
      titre: "Piste",
      lignes: [
        { designation: "Seuil de piste", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Bord de piste", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Axe de piste", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Zone de toucher des roues", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Fin de piste", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "RTIL", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Voies de sortie rapide", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Barres d’arrêt", matin: {...emptyObs}, nuit: {...emptyObs} }
      ]
    },
    {
      titre: "Taxiway",
      lignes: [
        { designation: "Panneaux d’indication", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Panneaux d'obligation", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Bord de Taxi way", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Center line East", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Center line West", matin: {...emptyObs}, nuit: {...emptyObs} }
      ]
    },
    {
      titre: "Feux d'obstacles",
      lignes: [
        { designation: "Balise d'obstacle", matin: {...emptyObs}, nuit: {...emptyObs} }
      ]
    },
    {
      titre: "MANCHE A VENT Cote 09 ",
      lignes: [
        { designation: "Balise d'obstacle ", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Balise d'éclairage de manche à air", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Manche en textile", matin: {...emptyObs}, nuit: {...emptyObs} },
      ]
    },
     {
      titre: "MANCHE A VENT Cote 27 ",
      lignes: [
        { designation: "Balise d'obstacle ", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Balise d'éclairage de manche à air", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Manche en textile", matin: {...emptyObs}, nuit: {...emptyObs} },
      ]
    },
    {
      titre: "IHM",
      lignes: [
        { designation: "Essai fonctionnel IHM ATS", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Essai fonctionnel IHM Technique", matin: {...emptyObs}, nuit: {...emptyObs} },
      ]
    },
    {
      titre: "Balisage de L’Héliport",
      lignes: [
        { designation: "", matin: {...emptyObs}, nuit: {...emptyObs} },
      ]
    },
    {
      titre: "Parkings",
      lignes: [
        { designation: "Balisage Des Parkings", matin: {...emptyObs}, nuit: {...emptyObs} },
        { designation: "Eclairage Des  Parkings", matin: {...emptyObs}, nuit: {...emptyObs} },
      ]
    },
    {
      titre: "Régulateurs de courant",
      lignes: [
        { designation: "", matin: {...emptyObs}, nuit: {...emptyObs} },
      ]
    },
     {
      titre: "DGS",
      lignes: [
        { designation: "", matin: {...emptyObs}, nuit: {...emptyObs} },
      ]
    },
     {
      titre: "Eclairage Solaire",
      lignes: [
        { designation: "", matin: {...emptyObs}, nuit: {...emptyObs} },
      ]
    },
    
  ],

technicien: "",
statutMatin: false,
  statutNuit: false
};

export default function FicheBalisageForm() {
  const [fiche, setFiche] = useState(initialFiche);
  const [ficheId, setFicheId] = useState(null);
const [phase, setPhase] = useState("matin"); // "matin" ou "nuit"
  // =======================
// HANDLE CHANGE SIMPLE
// =======================
  const handleChange = (field, value) => {
    setFiche({ ...fiche, [field]: value });
  };

  // =======================
// HANDLE CHECKBOX
// =======================
const handleInput = (gIndex, lIndex, period, field, value) => {
  const data = [...fiche.groupes];

  if (!data[gIndex].lignes[lIndex][period]) {
    data[gIndex].lignes[lIndex][period] = {};
  }

  data[gIndex].lignes[lIndex][period][field] = value;

  setFiche({ ...fiche, groupes: data });
};


useEffect(() => {
  const updatePhase = () => {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 18) {
      setPhase("matin");
    } else {
      setPhase("nuit");
    }
  };

  updatePhase(); // appel initial

  const interval = setInterval(updatePhase, 60000); // chaque minute

  return () => clearInterval(interval);
}, []);

  // =======================
// HANDLE OBSERVATION
// =======================
  const handleObservation = (gIndex, lIndex, period, value) => {
    const data = [...fiche.groupes];

    if (!data[gIndex].lignes[lIndex][period]) {
      data[gIndex].lignes[lIndex][period] = {};
    }

    data[gIndex].lignes[lIndex][period].observations = value;

    setFiche({ ...fiche, groupes: data });
  };

  // =======================
// SUBMIT
// =======================
const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await enregistrerFicheBalisage(fiche);

  setFicheId(res._id);

  setFiche({
    ...fiche,
    statutMatin: true
  });

  alert("Fiche enregistrée ✅");
};

  const handleEnvoyer = async () => {
    if (!ficheId) return alert("Veuillez enregistrer d'abord !");
    await envoyerFicheBalisage(ficheId);
    alert("Fiche envoyée ✅");
  };

  // =======================
// RENDER
// =======================
  return (
    <form onSubmit={handleSubmit} style={{ width: "95%", margin: "auto" }}>
      <h2>Fiche d'inspection journaliere de Balisage</h2>

      <label>Date</label>
      <input
        type="date"
        value={fiche.date.toISOString().substring(0, 10)}
        onChange={(e) => handleChange("date", new Date(e.target.value))}
      />

     

      <br />

      <table border="1" width="100%">
        <thead>
          <tr>
            <th rowSpan="2">Fonction balisage</th>
            <th rowSpan="2">Nature de l'observation</th>

            <th colSpan="4">MATIN</th>
            <th colSpan="4">NUIT</th>
          </tr>
          <tr>
            <th>NF</th>
            <th>Fonctionnement</th>
            <th>Interventions</th>
            <th>Obs</th>

            <th>NF</th>
            <th>Fonctionnement</th>
            <th>Interventions</th>
            <th>Obs</th>
          </tr>
        </thead>

        <tbody>
          {fiche.groupes.map((g, gi) => (
            <React.Fragment key={gi}>
              <tr>
                <td rowSpan={g.lignes.length + 1}>
                  <b>{g.titre}</b>
                </td>
              </tr>

              {g.lignes.map((l, li) => (
                <tr key={li}>
                  <td>{l.designation}</td>
{["nf", "fonctionnement", "interventions"].map((f) => (
  <td key={f}>
    <input
  type="text"
  value={l.matin?.[f] || ""}
  onChange={(e) =>
    handleInput(gi, li, "matin", f, e.target.value)
  }
  disabled={phase === "nuit"}   // 🔥 IMPORTANT
/>
  </td>
))}

                  <td>
                    <input
  value={l.matin?.observations || ""}
  onChange={(e) =>
    handleObservation(gi, li, "matin", e.target.value)
  }
  disabled={phase === "nuit"}   // 🔥 IMPORTANT
/>
                  </td>
{["nf", "fonctionnement", "interventions"].map((f) => (
  <td key={f}>
    <input
  type="text"
  value={l.nuit?.[f] || ""}
  onChange={(e) =>
    handleInput(gi, li, "nuit", f, e.target.value)
  }
  disabled={phase === "matin"}   // 🔥 IMPORTANT
/>
  </td>
))}

                  <td>
                   <input
  value={l.nuit?.observations || ""}
  onChange={(e) =>
    handleObservation(gi, li, "nuit", e.target.value)
  }
  disabled={phase === "matin"}   // 🔥 IMPORTANT
/>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
<br />

<label><b>Technicien :</b></label>
<br />

<input
  type="text"
  placeholder="Nom du technicien"
  value={fiche.technicien || ""}
  onChange={(e) =>
    setFiche({ ...fiche, technicien: e.target.value })
  }
  style={{ width: "300px", marginTop: "5px" }}
/>
      <br />

      <button type="submit">Enregistrer</button>
      <button type="button" onClick={handleEnvoyer}>
        Envoyer
      </button>
      <button type="button" onClick={() => window.location.reload()}>
  Retour
</button>
    </form>
  );
}