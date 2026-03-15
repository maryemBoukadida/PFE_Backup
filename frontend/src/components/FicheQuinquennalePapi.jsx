import React, { useState } from "react";
import { enregistrerFicheQuiPapi, envoyerFicheQuiPapi } from "./apiservices/api";

const initialFiche = {
  type: "inspection_quinquennale_papi",
  titre: "FICHE D’INSPECTION QUINQUENNALE PAPI",
  papi: [
    {
      numero: "09",
      elements: [
        { verification: "Contrôles électriques", "11": "", "12": "", "21": "", "22": "", "31": "", "32": "", "41": "", "42": "" },
        { verification: "Horizontalité transversale", "11": "", "12": "", "21": "", "22": "", "31": "", "32": "", "41": "", "42": "" },
        { verification: "Angle de Calage", "11": "", "12": "", "21": "", "22": "", "31": "", "32": "", "41": "", "42": "" },
        { verification: "Perpendicilarité des unités", "11": "", "12": "", "21": "", "22": "", "31": "", "32": "", "41": "", "42": "" },
        { verification: "Mezure des azimuts", "11": "", "12": "", "21": "", "22": "", "31": "", "32": "", "41": "", "42": "" },
        { verification: "Etat d'archives", "11": "", "12": "", "21": "", "22": "", "31": "", "32": "", "41": "", "42": "" }
      ]
    },
    {
      numero: "27",
      elements: [
        { verification: "Contrôles électriques", "11": "", "12": "", "21": "", "22": "", "31": "", "32": "", "41": "", "42": "" },
        { verification: "Horizontalité transversale", "11": "", "12": "", "21": "", "22": "", "31": "", "32": "", "41": "", "42": "" },
        { verification: "Angle de Calage", "11": "", "12": "", "21": "", "22": "", "31": "", "32": "", "41": "", "42": "" },
        { verification: "Perpendicilarité des unités", "11": "", "12": "", "21": "", "22": "", "31": "", "32": "", "41": "", "42": "" },
        { verification: "Mezure des azimuts", "11": "", "12": "", "21": "", "22": "", "31": "", "32": "", "41": "", "42": "" },
        { verification: "Etat d'archives", "11": "", "12": "", "21": "", "22": "", "31": "", "32": "", "41": "", "42": "" }
      ]
    }
  ],
  observations_generales: "",
  date: "",
  techniciens_operateurs: "",
  signature: ""
};

export default function FicheQuinquennalePapi() {
  const [fiche, setFiche] = useState(initialFiche);
  const [ficheId, setFicheId] = useState(null);

  const handleChange = (papiIndex, elementIndex, champ, valeur) => {
    const newFiche = { ...fiche };
    newFiche.papi[papiIndex].elements[elementIndex][champ] = valeur;
    setFiche(newFiche);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await enregistrerFicheQuiPapi(fiche);
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
      await envoyerFicheQuiPapi(ficheId);
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

        {fiche.papi.map((p, pi) => (
          <div key={pi} style={{ marginBottom: "30px" }}>
            <h3>Numéro {p.numero}</h3>
            <table border="1" cellPadding="5" cellSpacing="0">
              <thead>
                <tr>
                  <th>Vérification</th>
                  <th>11</th>
                  <th>12</th>
                  <th>21</th>
                  <th>22</th>
                  <th>31</th>
                  <th>32</th>
                  <th>41</th>
                  <th>42</th>
                </tr>
              </thead>
              <tbody>
                {p.elements.map((elem, ei) => (
                  <tr key={ei}>
                    <td>{elem.verification}</td>
                    {["11","12","21","22","31","32","41","42"].map((champ) => (
                      <td key={champ}>
                        <input
                          type="text"
                          value={elem[champ]}
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