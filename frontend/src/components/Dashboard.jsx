import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [statsLieu, setStatsLieu] = useState([]);
  const [statsFournisseur, setStatsFournisseur] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const resLieu = await fetch("http://localhost:5000/api/equipements/stats/lieu");
        setStatsLieu(await resLieu.json());

        const resFournisseur = await fetch("http://localhost:5000/api/equipements/stats/fournisseur");
        setStatsFournisseur(await resFournisseur.json());
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2>Statistiques des équipements par lieu</h2>
      <ul>
        {statsLieu.map(s => (
          <li key={s._id}>{s._id}: {s.count}</li>
        ))}
      </ul>

      <h2>Statistiques par fournisseur</h2>
      <ul>
        {statsFournisseur.map(s => (
          <li key={s._id}>{s._id}: {s.count}</li>
        ))}
      </ul>
    </div>
  );
}
