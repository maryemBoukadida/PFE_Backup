import React, { useState } from "react";
import {
  enregistrerFicheHorsSql,
  envoyerFicheHorsSql
} from "./apiservices/api";

const initialFiche = {
  type: "ficheHorsSol",
  feuxHorsSol: {
    bordDePiste: {},
    finDePiste: {},
    bordDeTaxiway: {},
    flash: {}
  },
  observationsGenerales: "",
  date: "",
  techniciens_operateurs: [],
  signature: ""
};

const lignesZone = [
  "ControleEtatGeneral",
  "IntegriteMecaniqueStabiliteSupports",
  "PartieOptique",
  "ConnectiqueCableConnecteur",
  "EtatPrismes",
  "Enchevetrement",
  "EtatLampes"
];

const lignesFlash = [
  ...lignesZone,
  "Switch"
];

export default function FicheFeuxHorsSql() {
  const [fiche, setFiche] = useState(initialFiche);
  const [ficheId, setFicheId] = useState(null);

  const zones = ["bordDePiste", "finDePiste", "bordDeTaxiway", "flash"];

  const handleChange = (zone, ligne, champ, valeur) => {
    const newFiche = { ...fiche };
    if (!newFiche.feuxHorsSol[zone][ligne]) {
      newFiche.feuxHorsSol[zone][ligne] = {
        Etat: "",
        Interventions: "",
        Observations: ""
      };
    }
    newFiche.feuxHorsSol[zone][ligne][champ] = valeur;
    setFiche(newFiche);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await enregistrerFicheHorsSql(fiche);
      setFicheId(res._id);
      alert("Fiche enregistrée");
    } catch (err) {
      console.error(err);
      alert("Erreur enregistrement");
    }
  };

  const handleEnvoyer = async () => {
    if (!ficheId) {
      alert("Enregistrer la fiche avant l'envoi");
      return;
    }
    try {
      await envoyerFicheHorsSql(ficheId);
      alert("Fiche envoyée avec succès");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi");
    }
  };

  return (
    <div>
      <h2>Fiche Feux Hors Sol</h2>

      <form onSubmit={handleSubmit}>
        <label>Date :</label>
        <input
          type="date"
          value={fiche.date}
          onChange={(e) => setFiche({ ...fiche, date: e.target.value })}
        />

        <br /><br />

        <table border="1">
          <thead>
            <tr>
              <th>Zone</th>
              <th>Contrôle</th>
              <th>Etat</th>
              <th>Interventions</th>
              <th>Observations</th>
            </tr>
          </thead>

          <tbody>
            {zones.map((zone) => {
              const lignes = zone === "flash" ? lignesFlash : lignesZone;

              return lignes.map((ligne, index) => (
                <tr key={zone + ligne}>
                  {index === 0 && <td rowSpan={lignes.length}>{zone}</td>}
                  <td>{ligne}</td>

                  <td>
                    <select
                      value={fiche.feuxHorsSol[zone][ligne]?.Etat || ""}
                      onChange={(e) =>
                        handleChange(zone, ligne, "Etat", e.target.value)
                      }
                    >
                      <option value=""></option>
                      <option value="OK">OK</option>
                      <option value="HS">HS</option>
                    </select>
                  </td>

                  <td>
                    <input
                      type="text"
                      value={fiche.feuxHorsSol[zone][ligne]?.Interventions || ""}
                      onChange={(e) =>
                        handleChange(zone, ligne, "Interventions", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={fiche.feuxHorsSol[zone][ligne]?.Observations || ""}
                      onChange={(e) =>
                        handleChange(zone, ligne, "Observations", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>

        <br />

        <label>Observations générales :</label>
        <textarea
          value={fiche.observationsGenerales}
          onChange={(e) =>
            setFiche({ ...fiche, observationsGenerales: e.target.value })
          }
        />

        <br /><br />

        <label>Technicien :</label>
        <input
          type="text"
          value={fiche.techniciens_operateurs[0] || ""}
          onChange={(e) =>
            setFiche({ ...fiche, techniciens_operateurs: [e.target.value] })
          }
        />

        <br /><br />

        <button type="submit">Enregistrer</button>
        <button type="button" onClick={handleEnvoyer}>Envoyer</button>
      </form>
    </div>
  );
}