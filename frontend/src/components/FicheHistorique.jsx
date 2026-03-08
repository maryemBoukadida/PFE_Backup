import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FicheHistorique() {
  const { id } = useParams();
  const [fiche, setFiche] = useState(null);

  useEffect(() => {
    const fetchFiche = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/fiche_papi/historique/${id}`);
        if (!res.ok) throw new Error("Erreur fetch fiche");
        const data = await res.json();
        setFiche(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFiche();
  }, [id]);

  if (!fiche) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Fiche PAPI - Détails</h2>
      <p>Technicien : {fiche.techniciens}</p>
      <p>Date : {new Date(fiche.date).toLocaleString()}</p>
      <p>Observations : {fiche.observations}</p>

      <h4>Approche 09</h4>
      <table border={1}>
        <thead>
          <tr>
            <th>Élément</th>
            {["11","12","21","22","31","32","41","42"].map(c => <th key={c}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {fiche.verifications.map((v, i) => (
            <tr key={i}>
              <td>{v.element}</td>
              {["11","12","21","22","31","32","41","42"].map(c => <td key={c}>{v[`v${c}_09`] || ""}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Approche 27</h4>
      <table border={1}>
        <thead>
          <tr>
            <th>Élément</th>
            {["11","12","21","22","31","32","41","42"].map(c => <th key={c}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {fiche.verifications.map((v, i) => (
            <tr key={i}>
              <td>{v.element}</td>
              {["11","12","21","22","31","32","41","42"].map(c => <td key={c}>{v[`v${c}_27`] || ""}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}