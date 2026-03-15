import React, { useState } from 'react';
import { enregistrerFicheAnnObs, envoyerFicheAnnObs } from './apiservices/api';

const initialFiche = {
  type: "inspection_annuelle_feux_obstacles",
  sections: [
    {
      titre: "ROT",
      elements: Array.from({ length: 9 }, (_, i) => ({
        lieu: `ROT ${i + 1}`,
        nettoyage: "",
        serrageBornes: "",
        priseDeTerre: "",
        isolementConducteurs: "",
        continuiteProtection: "",
        verificationSchemas: "",
        intervention: "",
        observations: ""
      }))
    },
    {
      titre: "Parking 1 - A Droite de SST1",
      elements: Array.from({ length: 7 }, (_, i) => ({
        lieu: `A Droite de SST1 parking 1 PYLO ${i + 1}`,
        nettoyage: "",
        serrageBornes: "",
        priseDeTerre: "",
        isolementConducteurs: "",
        continuiteProtection: "",
        verificationSchemas: "",
        intervention: "",
        observations: ""
      }))
    },
    {
      titre: "Parking 2 - A Gauche de SST1",
      elements: Array.from({ length: 7 }, (_, i) => ({
        lieu: `A Gauche de SST1 parking 2 PYLO ${i + 1}`,
        nettoyage: "",
        serrageBornes: "",
        priseDeTerre: "",
        isolementConducteurs: "",
        continuiteProtection: "",
        verificationSchemas: "",
        intervention: "",
        observations: ""
      }))
    },
    {
      titre: "Parking Energie Centre",
      elements: Array.from({ length: 2 }, (_, i) => ({
        lieu: `Parking énergie centre PYLO ${i + 1}`,
        nettoyage: "",
        serrageBornes: "",
        priseDeTerre: "",
        isolementConducteurs: "",
        continuiteProtection: "",
        verificationSchemas: "",
        intervention: "",
        observations: ""
      }))
    },
    {
      titre: "Parking FRET",
      elements: Array.from({ length: 2 }, (_, i) => ({
        lieu: `Parking FRET PYLO ${i + 1}`,
        nettoyage: "",
        serrageBornes: "",
        priseDeTerre: "",
        isolementConducteurs: "",
        continuiteProtection: "",
        verificationSchemas: "",
        intervention: "",
        observations: ""
      }))
    },
    {
      titre: "Parking Bus",
      elements: Array.from({ length: 2 }, (_, i) => ({
        lieu: `Parking bus PYLO ${i + 1}`,
        nettoyage: "",
        serrageBornes: "",
        priseDeTerre: "",
        isolementConducteurs: "",
        continuiteProtection: "",
        verificationSchemas: "",
        intervention: "",
        observations: ""
      }))
    },
    {
      titre: "Parking Pavillon",
      elements: Array.from({ length: 2 }, (_, i) => ({
        lieu: `Parking pavillon PYLO ${i + 1}`,
        nettoyage: "",
        serrageBornes: "",
        priseDeTerre: "",
        isolementConducteurs: "",
        continuiteProtection: "",
        verificationSchemas: "",
        intervention: "",
        observations: ""
      }))
    },
    {
      titre: "Navigation Aerienne",
      elements: [
        { lieu: "D-VOR (1 et 2)", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" },
        { lieu: "GLIDE 09", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" },
        { lieu: "GLIDE 27", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" },
        { lieu: "LOCALIZER 09 (1 et 2)", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" },
        { lieu: "LOCALIZER 27 (1 et 2)", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" }
      ]
    },
    {
      titre: "Meteo et Vent",
      elements: [
        { lieu: "Manche a Vent coté 09", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" },
        { lieu: "Manche a Vent coté 27", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" },
        { lieu: "Wind Mast 1", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" },
        { lieu: "Wind Mast 2", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" },
        { lieu: "Wind Mast 3", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" },
        { lieu: "Wind Mast 4", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" },
        { lieu: "Station Meteo (1 et 2)", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" }
      ]
    },
    {
      titre: "Batiments",
      elements: [
        { lieu: "Administration", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" },
        { lieu: "Tour de Controle (1-2)", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" },
        { lieu: "Phare d’aérodrome", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" }
      ]
    },
    {
      titre: "Telecom",
      elements: [
        { lieu: "Pylone Tunisie Télécom (Centrale d'Energie)", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" },
        { lieu: "Pylone Tunisie Télécom (Fuel Farm)", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" },
        { lieu: "Pylone Orange (Centrale d'Energie)", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" }
      ]
    },
    {
      titre: "Postes Techniques",
      elements: [
        { lieu: "SST 2 (1-2-3 et 4)", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" },
        { lieu: "CRD (1-2-3 et 4)", nettoyage: "", serrageBornes: "", priseDeTerre: "", isolementConducteurs: "", continuiteProtection: "", verificationSchemas: "", intervention: "", observations: "" }
      ]
    }
  ],
  observations_generales: "",
  date: "",
  technicien_operateur: "",
  signature: ""
};

export default function FicheAnnObs() {
  const [fiche, setFiche] = useState(initialFiche);
  const [ficheId, setFicheId] = useState(null);

  const handleChange = (sectionIndex, elementIndex, champ, valeur) => {
    const newFiche = { ...fiche };
    newFiche.sections[sectionIndex].elements[elementIndex][champ] = valeur;
    setFiche(newFiche);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await enregistrerFicheAnnObs(fiche);
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
      await envoyerFicheAnnObs(ficheId);
      alert("Fiche envoyée avec succès");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi");
    }
  };

  return (
    <div>
      <h2>Fiche Annuelle Feux Obstacles</h2>

      <form onSubmit={handleSubmit}>
        <label>Date :</label>
        <input
          type="date"
          value={fiche.date}
          onChange={(e) => setFiche({ ...fiche, date: e.target.value })}
        />
        <br /><br />

        {fiche.sections.map((section, si) => (
          <div key={si} style={{ marginBottom: "30px" }}>
            <h3>{section.titre}</h3>
            <table border="1" cellPadding="5" cellSpacing="0">
              <thead>
                <tr>
                  <th>Lieu</th>
                  <th>Nettoyage</th>
                  <th>Serrage Bornes</th>
                  <th>Prise Terre</th>
                  <th>Isolement Conducteurs</th>
                  <th>Continuité Protection</th>
                  <th>Vérification Schémas</th>
                  <th>Intervention</th>
                  <th>Observations</th>
                </tr>
              </thead>
              <tbody>
                {section.elements.map((el, ei) => (
                  <tr key={ei}>
                    <td>{el.lieu}</td>
                    {["nettoyage","serrageBornes","priseDeTerre","isolementConducteurs","continuiteProtection","verificationSchemas","intervention","observations"].map((champ) => (
                      <td key={champ}>
                        <input
                          type="text"
                          value={el[champ]}
                          onChange={(e) => handleChange(si, ei, champ, e.target.value)}
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