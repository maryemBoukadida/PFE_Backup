import React, { useEffect, useState } from "react";
//import "../styles/GestionEquipement.css";
import "../styles/BalisagePage.css";

import { getBalisage } from "../components/apiservices/api";

export default function BalisagePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all"); // ✅ IMPORTANT

  // 🔹 Appel API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getBalisage();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 KPI
  const totalArticles = data.length;

  const totalStock = data.reduce(
    (acc, item) => acc + (item.stock || 0),
    0
  );

  const rupture = data.filter((item) => item.stock === 0).length;

  const stockFaible = data.filter(
    (item) => item.stock > 0 && item.stock <= 5
  ).length;

  //  + 🎯 FILTRAGE
  const filteredData = data
    .filter((item) => {
      const matchSearch = item.designation
        .toLowerCase()
        .includes(search.toLowerCase());

      if (filterType === "rupture") {
        return matchSearch && item.stock === 0;
      }

      if (filterType === "faible") {
        return matchSearch && item.stock > 0 && item.stock <= 5;
      }

      return matchSearch;
    })
    .sort((a, b) => {
      if (filterType === "rupture" || filterType === "faible") {
        return a.stock - b.stock;
      }
      return 0;
    });

  if (loading) {
    return <h3>Chargement...</h3>;
  }

  return (
    <div className="page-container">
      <h2>📍 Balisage</h2>

      {/* KPI */}
      <div className="kpi-container">
        <div className="kpi-card" onClick={() => setFilterType("all")}>
          <h4>Total Articles</h4>
          <p>{totalArticles}</p>
        </div>

        <div className="kpi-card" onClick={() => setFilterType("all")}>
          <h4>Stock Total</h4>
          <p>{totalStock}</p>
        </div>

        <div
          className="kpi-card danger"
          onClick={() => setFilterType("rupture")}
        >
          <h4>⚠️ Rupture</h4>
          <p>{rupture}</p>
        </div>

        <div
          className="kpi-card warning"
          onClick={() => setFilterType("faible")}
        >
          <h4>🔻 Stock faible</h4>
          <p>{stockFaible}</p>
        </div>
      </div>

  

      {/* Recherche */}
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Rechercher un équipement..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* TABLE */}
      <table className="table">
        <thead>
          <tr>
            <th>Désignation</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="2">Aucun équipement trouvé</td>
            </tr>
          ) : (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.designation}</td>
                <td>{item.stock}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}