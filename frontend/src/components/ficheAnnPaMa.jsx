import React, { useEffect, useState, useRef } from "react";
import { getFicheAnnPaMa, enregistrerFicheAnnPaMa,creerFicheAnnPaMa  } from "./apiservices/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SignatureCanvas from "react-signature-canvas";

export default function FicheAnnPaMa() {
  const [fiche, setFiche] = useState(null);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const signatureRef = useRef();

 /* useEffect(() => {
    const fetchFiche = async () => {
      try {
        const data = await getFicheAnnPaMa();
        setFiche(data);
        setDate(data.date ? new Date(data.date) : new Date());
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchFiche();
  }, []);
*/

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
useEffect(() => {
  const fetchFiche = async () => {
    try {
      const data = await getFicheAnnPaMa();
      // si la fiche n'existe pas ou tableaux est vide, créer une fiche vide
      if (!data || !data.tableaux || data.tableaux.length === 0) {
        setFiche(createEmptyFichePaMa());
        setDate(new Date());
      } else {
        setFiche(data);
        setDate(data.date ? new Date(data.date) : new Date());
      }
    } catch (err) { 
      console.error(err);
      // en cas d'erreur, on initialise une fiche vide pour ne jamais bloquer le formulaire
      setFiche(createEmptyFichePaMa());
      setDate(new Date());
    } finally { setLoading(false); }
  };
  fetchFiche();
}, []);
  if (loading) return <p>Chargement...</p>;
  if (!fiche) return <p>Aucune fiche trouvée</p>;

  const updateCell = (tableauIndex, ligne, verif, value) => {
    const newFiche = { ...fiche };
    newFiche.tableaux[tableauIndex].lignes[ligne][verif] = value;
    setFiche(newFiche);
  };

 const handleSave = async () => {
  try {
    const updatedFiche = {
      ...fiche,
      date: date.toISOString(),
      signature: signatureRef.current?.isEmpty() ? "" : signatureRef.current.toDataURL(),
    };

    let savedFiche;
    if (fiche._id) {
      // Mise à jour d'une fiche existante
      savedFiche = await enregistrerFicheAnnPaMa(fiche._id, updatedFiche);
    } else {
      // Création d'une nouvelle fiche
      savedFiche = await creerFicheAnnPaMa(updatedFiche);
    }

    alert("Fiche enregistrée avec succès !");

    // Réinitialiser formulaire
    setFiche(createEmptyFichePaMa());
    setDate(new Date());
    signatureRef.current?.clear();

  } catch (err) {
    console.error("Erreur lors de l'enregistrement:", err.response?.data || err.message);
    alert("Erreur lors de l'enregistrement. Vérifie la connexion au serveur.");
  }
};


/*

  const handleSend = async () => {
    try {
      if (!fiche.techniciens_operateurs || fiche.techniciens_operateurs.length === 0)
        return alert("Veuillez saisir les techniciens");
      await envoyerFicheAnnPaMa(fiche._id);
      alert("Fiche envoyée");
    } catch (err) { console.error(err); alert("Erreur"); }
  };
  */


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
    value={fiche.techniciens_operateurs.join(", ")}
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
      </div>
    </div>
  );
}