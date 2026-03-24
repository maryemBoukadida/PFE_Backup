import React, { useEffect, useState, useRef } from "react";
import { enregistrerFicheAnnPaMa,envoyerFicheAnnPaMa ,creerFicheAnnPaMa } from "./apiservices/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SignatureCanvas from "react-signature-canvas";




export default function FicheAnnPaMa() {
const createEmptyFichePaMa = () => ({
    tableaux: [
    {
      titre: "09",
      verifications: ["11","12","21","22","31","32","41","42"],
      lignes: {
        "Contrôles électriques": {"11":"","12":"","21":"","22":"","31":"","32":"","41":"","42":""},
        "Horizontalité transversale": {"11":"","12":"","21":"","22":"","31":"","32":"","41":"","42":""},
        "Angle de Calage": {"11":"","12":"","21":"","22":"","31":"","32":"","41":"","42":""},
        "Etat d'archives": {"11":"","12":"","21":"","22":"","31":"","32":"","41":"","42":""}
      }
    },
    {
      titre: "27",
      verifications: ["11","12","21","22","31","32","41","42"],
      lignes: {
        "Contrôles électriques": {"11":"","12":"","21":"","22":"","31":"","32":"","41":"","42":""},
        "Horizontalité transversale": {"11":"","12":"","21":"","22":"","31":"","32":"","41":"","42":""},
        "Angle de Calage": {"11":"","12":"","21":"","22":"","31":"","32":"","41":"","42":""},
        "Etat d'archives": {"11":"","12":"","21":"","22":"","31":"","32":"","41":"","42":""}
      }
    },
    {
      titre: "09",
      verifications: ["Etat","Interventions à faire","Observations"],
      lignes: {
        "Peinture": {"Etat":"","Interventions à faire":"","Observations":""},
        "Diamètre de la bande circulaire est de 15 m": {"Etat":"","Interventions à faire":"","Observations":""},
        "Largeur de la bande circulaire est de 1.2 m": {"Etat":"","Interventions à faire":"","Observations":""},
        "Alimentation": {"Etat":"","Interventions à faire":"","Observations":""},
        "Commande": {"Etat":"","Interventions à faire":"","Observations":""},
        "Projecteur d’éclairage de la manche à vent": {"Etat":"","Interventions à faire":"","Observations":""},
        "Feu obstacle": {"Etat":"","Interventions à faire":"","Observations":""},
        "Manche en textile": {"Etat":"","Interventions à faire":"","Observations":""}
      }
    },
    {
      titre: "27",
      verifications: ["Etat","Interventions à faire","Observations"],
      lignes: {
        "Peinture": {"Etat":"","Interventions à faire":"","Observations":""},
        "Diamètre de la bande circulaire est de 15 m": {"Etat":"","Interventions à faire":"","Observations":""},
        "Largeur de la bande circulaire est de 1.2 m": {"Etat":"","Interventions à faire":"","Observations":""},
        "Alimentation": {"Etat":"","Interventions à faire":"","Observations":""},
        "Commande": {"Etat":"","Interventions à faire":"","Observations":""},
        "Projecteur d’éclairage de la manche à vent": {"Etat":"","Interventions à faire":"","Observations":""},
        "Feu obstacle": {"Etat":"","Interventions à faire":"","Observations":""},
        "Manche en textile": {"Etat":"","Interventions à faire":"","Observations":""}
      }
    }
  ],
  observations_generales: "",
  date: new Date().toISOString(),
  techniciens_operateurs: [],
  signature: "",
  statut: "brouillon"
});

  const [fiche, setFiche] = useState(createEmptyFichePaMa());
const [ficheId, setFicheId] = useState(null);

  const [date, setDate] = useState(new Date());
  const signatureRef = useRef();

  const updateCell = (tableauIndex, ligne, verif, value) => {
    const newFiche = { ...fiche };
   newFiche.tableaux[tableauIndex].lignes = {
  ...newFiche.tableaux[tableauIndex].lignes,
  [ligne]: {
    ...newFiche.tableaux[tableauIndex].lignes[ligne],
    [verif]: value
  }
};
    setFiche(newFiche);
  };

const handleSave = async () => {
  try {
    const updatedFiche = {
      ...fiche,
      date: date.toISOString(),
      signature: signatureRef.current?.isEmpty()
        ? ""
        : signatureRef.current.toDataURL(),
    };

    let res;

    if (!ficheId) {
      // CREATE
      res = await creerFicheAnnPaMa(updatedFiche);
      setFicheId(res._id);
    } else {
      // UPDATE
      res = await enregistrerFicheAnnPaMa(ficheId, updatedFiche);
    }

    setFiche(res);
    alert("Fiche enregistrée ✅");

  } catch (err) {
    console.error(err);
    alert("Erreur enregistrement ❌");
  }
};




 const handleSend = async () => {
  if (!ficheId) {
    return alert("Enregistrer d'abord !");
  }

  if (!fiche.techniciens_operateurs || fiche.techniciens_operateurs.length === 0) {
    return alert("Veuillez saisir les techniciens");
  }

  try {
    await envoyerFicheAnnPaMa(ficheId);
    alert("Fiche envoyée ✅");
  } catch (err) {
    console.error(err);
    alert("Erreur envoi ❌");
  }
};


  return (
    <div>
      <h2>Fiche Annuelle PAPI et Manche avant</h2>
      {fiche.tableaux.map((tableau, tIdx) => (
        <div key={tIdx}>
          <h3>Tableau {tableau.titre}</h3>
          <table>
            <thead>
              <tr>
                <th>Ligne</th>
                {tableau.verifications.map(v => <th key={v}>{v}</th>)}
              </tr>
            </thead>
            <tbody>
              {Object.entries(tableau.lignes).map(([ligne, verifs]) => (
                <tr key={ligne}>
                  <td>{ligne}</td>
                  {tableau.verifications.map(v => (
                    <td key={v}>
                      <input
                        type="text"
                        value={verifs[v] || ""}
                        onChange={e => updateCell(tIdx, ligne, v, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <div>
        <label>Date :</label>
        <DatePicker selected={date} onChange={setDate} dateFormat="dd/MM/yyyy" />
      </div>

      <div>
        <label>Observations générales :</label>
        <textarea value={fiche.observations_generales} onChange={e => setFiche({...fiche, observations_generales: e.target.value})} />
      </div>

      <div>
  <label>Techniciens :</label>
  <input
    type="text"
    value={
  Array.isArray(fiche.techniciens_operateurs)
    ? fiche.techniciens_operateurs.join(", ")
    : ""
}
    onChange={e => setFiche({
      ...fiche,
      techniciens_operateurs: e.target.value.split(",").map(s => s.trim())
    })}
    placeholder="Séparer par des virgules"
  />
</div>

      <div>
        <label>Signature :</label>
        <SignatureCanvas ref={signatureRef} penColor="black" canvasProps={{ width: 400, height: 150 }} />
        <button onClick={() => signatureRef.current.clear()}>Effacer</button>
      </div>

      <div>
        <button onClick={handleSave}>Enregistrer</button>
<button onClick={handleSend} disabled={!ficheId}></button>
     </div>
    </div>
  );
}