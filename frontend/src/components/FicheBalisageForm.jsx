import React, { useState } from "react";
import {
  enregistrerFicheBalisage,
  envoyerFicheBalisage
} from "./apiservices/api";

// =======================
// INITIAL DATA
// =======================
const initialFiche = {
  date: new Date(),
  designation: "",
  lieuInstallation: "",

  groupes: [
    {
      titre: "Approche 09",
      lignes: [
        { designation: "Approche 450 derniers mètres", matin: {}, nuit: {} },
        { designation: "Approche en amont des 450 derniers mètres", matin: {}, nuit: {} }
      ]
    },
    {
      titre: "Approche 27",
      lignes: [
        { designation: "Approche 450 derniers mètres", matin: {}, nuit: {} },
        { designation: "Approche en amont des 450 derniers mètres", matin: {}, nuit: {} }
      ]
    },
    {
      titre: "PAPI 09",
      lignes: [
        { designation: "Fonctionnement électrique de chaque unité PAPI", matin: {}, nuit: {} },
        { designation: "Contrôle de l'intégrité physique des unités PAPI", matin: {}, nuit: {} },
        { designation: "Contrôle visuel de la végétation", matin: {}, nuit: {} },
        { designation: "Lampes H/S", matin: {}, nuit: {} }
      ]
    },
    {
      titre: "PAPI 27",
      lignes: [
        { designation: "Fonctionnement électrique de chaque unité PAPI", matin: {}, nuit: {} },
        { designation: "Contrôle de l'intégrité physique des unités PAPI", matin: {}, nuit: {} },
        { designation: "Contrôle visuel de la végétation", matin: {}, nuit: {} },
        { designation: "Lampes H/S", matin: {}, nuit: {} }
      ]
    },
    {
      titre: "Piste",
      lignes: [
        { designation: "Seuil de piste", matin: {}, nuit: {} },
        { designation: "Bord de piste", matin: {}, nuit: {} },
        { designation: "Axe de piste", matin: {}, nuit: {} },
        { designation: "Zone de toucher des roues", matin: {}, nuit: {} },
        { designation: "Fin de piste", matin: {}, nuit: {} },
        { designation: "RTIL", matin: {}, nuit: {} },
        { designation: "Voies de sortie rapide", matin: {}, nuit: {} },
        { designation: "Barres d’arrêt", matin: {}, nuit: {} }
      ]
    },
    {
      titre: "Taxiway",
      lignes: [
        { designation: "Panneaux d’indication", matin: {}, nuit: {} },
        { designation: "Panneaux d'obligation", matin: {}, nuit: {} },
        { designation: "Bord de Taxi way", matin: {}, nuit: {} },
        { designation: "Center line East", matin: {}, nuit: {} },
        { designation: "Center line West", matin: {}, nuit: {} }
      ]
    },
    {
      titre: "Feux d'obstacles",
      lignes: [
        { designation: "Balise d'obstacle", matin: {}, nuit: {} }
      ]
    }
  ],

  techniciens: []
};

export default function FicheBalisageForm() {
  const [fiche, setFiche] = useState(initialFiche);
  const [ficheId, setFicheId] = useState(null);

  // =======================
// HANDLE CHANGE SIMPLE
// =======================
  const handleChange = (field, value) => {
    setFiche({ ...fiche, [field]: value });
  };

  // =======================
// HANDLE CHECKBOX
// =======================
  const handleCheckbox = (gIndex, lIndex, period, field) => {
    const data = [...fiche.groupes];

    if (!data[gIndex].lignes[lIndex][period]) {
      data[gIndex].lignes[lIndex][period] = {};
    }

    data[gIndex].lignes[lIndex][period][field] =
      !data[gIndex].lignes[lIndex][period][field];

    setFiche({ ...fiche, groupes: data });
  };

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
      <h2>Fiche Balisage</h2>

      <label>Date</label>
      <input
        type="date"
        value={fiche.date.toISOString().substring(0, 10)}
        onChange={(e) => handleChange("date", new Date(e.target.value))}
      />

      <label>Désignation</label>
      <input
        value={fiche.designation}
        onChange={(e) => handleChange("designation", e.target.value)}
      />

      <label>Lieu d'installation</label>
      <input
        value={fiche.lieuInstallation}
        onChange={(e) => handleChange("lieuInstallation", e.target.value)}
      />

      <br /><br />

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
                        type="checkbox"
                        checked={l.matin?.[f] || false}
                        onChange={() => handleCheckbox(gi, li, "matin", f)}
                      />
                    </td>
                  ))}

                  <td>
                    <input
                      value={l.matin?.observations || ""}
                      onChange={(e) =>
                        handleObservation(gi, li, "matin", e.target.value)
                      }
                    />
                  </td>

                  {["nf", "fonctionnement", "interventions"].map((f) => (
                    <td key={f}>
                      <input
                        type="checkbox"
                        checked={l.nuit?.[f] || false}
                        onChange={() => handleCheckbox(gi, li, "nuit", f)}
                      />
                    </td>
                  ))}

                  <td>
                    <input
                      value={l.nuit?.observations || ""}
                      onChange={(e) =>
                        handleObservation(gi, li, "nuit", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

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