import React, { useEffect, useState } from "react";
import "../styles/GestionEquipement.css";
import { getPG } from "../components/apiservices/api";

export default function PGPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  // 🔹 API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPG();
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
  const totalProduits = data.length;

  const totalStock = data.reduce(
    (acc, item) => acc + (item.stock || 0),
    0
  );

  const rupture = data.filter((item) => item.stock === 0).length;

  const stockFaible = data.filter(
    (item) => item.stock > 0 && item.stock <= 5
  ).length;

  // 🔥 FILTRAGE
  const filteredData = data
    .filter((item) => {
      const matchSearch = item.designation
        ?.toLowerCase()
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
      <h2>🛢️ Produits Graissants (PG)</h2>

      {/* KPI */}
      <div className="kpi-container">
        <div className="kpi-card" onClick={() => setFilterType("all")}>
          <h4>Total Produits</h4>
          <p>{totalProduits}</p>
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

      {/* 🔍 SEARCH */}
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* TABLE */}
      <table className="table">
        <thead>
          <tr>
            <th>Article</th>
            <th>Référence</th>
            <th>Désignation</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="4">Aucun produit trouvé</td>
            </tr>
          ) : (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.article}</td>
                <td>{item.reference}</td>
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