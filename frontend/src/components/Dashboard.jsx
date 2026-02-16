import React, { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

// Import du fichier CSS
import "../styles/DashbardEquipement.css";

// Enregistrement des composants Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Dashboard() {
  // 📊 Stats par lieu (pour le Doughnut)
  const [statsLieu, setStatsLieu] = useState({ parLieu: [] });

  // 📊 Stats par équipement/fournisseur (pour le Bar horizontal)
  const [statsFournisseur, setStatsFournisseur] = useState([]);

  useEffect(() => {
    // 📍 Récupération stats par lieu
    fetch("http://localhost:5000/api/dashboard/stats")
      .then(res => res.json())
      .then(data => {
        console.log("📊 Stats par lieu:", data);
        setStatsLieu({ parLieu: data.parLieu || [] });
      })
      .catch(err => console.log("Erreur dashboard:", err));

    // 📍 Récupération stats par équipement/fournisseur
    fetch("http://localhost:5000/api/dashboard/stats-by-equipment")
      .then(res => res.json())
      .then(data => {
        console.log("Stats fournisseur:", data);
        console.log("📊 Stats par équipement/fournisseur:", data);
        setStatsFournisseur(data);
      })
      .catch(err => console.log("Erreur dashboard fournisseur:", err));
  }, []);

  // === Doughnut par lieu ===
  const labelsLieu = statsLieu.parLieu.map(l => l._id);
  const dataLieu = statsLieu.parLieu.map(l => l.count);
  const totalLieu = dataLieu.reduce((a, b) => a + b, 0);

  // === Barres horizontales par équipement/fournisseur ===
  const labelsEquip = statsFournisseur.map(item => item._id.equipement);
  
  // Couleurs selon fournisseur (à adapter selon tes fournisseurs réels)
  const colors = statsFournisseur.map(item => {
    switch (item._id.fournisseur) {
      case "Augier": return "#3498db";
      case "Thorn": return "#e74c3c";
      case "AutreFournisseur": return "#2ecc71";
      default: return "#95a5a6";
    }
  });

  const dataEquip = {
    labels: labelsEquip,
    datasets: [
      {
        label: "Nombre d'équipements",
        data: statsFournisseur.map(item => item.count),
        backgroundColor: colors
      }
    ]
  };

  const optionsEquip = {
    indexAxis: 'y', // graphique horizontal
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label} : ${context.raw} équipements (${statsFournisseur[context.dataIndex]._id.fournisseur})`;
          }
        }
      }
    },
    scales: {
      x: { beginAtZero: true }
    }
  };

  return (
    <div className="dashboard-container">

      {/* === Doughnut par lieu === */}
      <div className="dashboard-chart">
        <h3>Répartition des équipements par lieu</h3>
        <Doughnut
          data={{
            labels: labelsLieu,
            datasets: [
              {
                data: dataLieu,
                backgroundColor: [
                  "#3498db",
                  "#9b59b6",
                  "#e67e22",
                  "#2ecc71",
                  "#e74c3c",
                  "#1abc9c",
                  "#f39c12"
                ],
                borderWidth: 2,
                borderColor: "#fff"
              }
            ]
          }}
          options={{
            cutout: "65%",
            responsive: true,
            plugins: {
              legend: { position: "bottom", labels: { boxWidth: 15, padding: 15 } },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const value = context.raw;
                    const percent = ((value / totalLieu) * 100).toFixed(1);
                    return `${context.label} : ${value} équipements (${percent}%)`;
                  }
                }
              },
              datalabels: {
                color: "#fff",
                font: { weight: "bold", size: 12 },
                formatter: (value) => {
                  const percent = ((value / totalLieu) * 100).toFixed(0);
                  return percent + "%";
                }
              }
            }
          }}
        />

        <div className="doughnut-center">
          <h2>{totalLieu}</h2>
          <p>Équipements</p>
        </div>
      </div>

      {/* === Barres horizontales par équipement/fournisseur === */}
      <div className="dashboard-chart">
        <h3>Répartition des équipements par fournisseur</h3>
        <Bar data={dataEquip} options={optionsEquip} />
      </div>

    </div>
  );
}
