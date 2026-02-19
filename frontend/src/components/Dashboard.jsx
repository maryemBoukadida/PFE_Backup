import React, { useEffect, useState } from "react";
import "../styles/DashbardEquipement.css";
import{
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

// Enregistrer les composants
ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

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

  // 🔹 Données BAR (lieu)
  const dataLieu = {
  labels: statsLieu.map(s => s._id),
  datasets: [
    {
      data: statsLieu.map(s => s.count),
      backgroundColor: statsLieu.map((s) => {
        if (s._id === "SST1") return "#36A2EB"; // bleu
        if (s._id === "SST2") return "#FF6384"; // rouge
        return "#FFCE56"; // couleur par défaut
      }),
      borderWidth: 1
    }
  ]
};

  // 🔹 Données PIE (fournisseur)
const dataFournisseur = {
  labels: statsFournisseur.map(s => s._id),
  datasets: [
    {
      label: "Nombre d'équipements", // ✅ AJOUT ICI
      data: statsFournisseur.map(s => s.count),
      backgroundColor: [
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#d62728",
        "#9467bd"
      ]
    }
  ]
};


 return (
  <div className="dashboard-container">
    <h2 className="dashboard-title">📊 Tableau de bord des équipements</h2>

    <div className="dashboard-grid">

      {/* 🔹 LIEU → PIE */}
      <div className="dashboard-card">
        <h3 className="card-title">Répartition par lieu</h3>
        <div className="chart-container">
          <Pie data={dataLieu} />
        </div>
      </div>

      {/* 🔹 FOURNISSEUR → BAR */}
      <div className="dashboard-card">
        <h3 className="card-title">Équipements par fournisseur</h3>
        <div className="chart-container">
          <Bar data={dataFournisseur} />
        </div>
      </div>

    </div>
  </div>
);


}
