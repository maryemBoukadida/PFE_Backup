import React, { useEffect, useState } from "react";
import "../styles/GestionEquipement.css";
import { getAutre } from "../components/apiservices/api";

export default function AutrePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAutre();
        console.log("DATA AUTRE :", result);
        setData(result || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalArticles = data.length;

  const totalStock = data.reduce(
    (acc, item) => acc + (Number(item.stock) || 0),
    0
  );

  if (loading) return <h3>Chargement...</h3>;

  return (
    <div className="page-container">
      <h2>📦 Autres équipements</h2>

      {/* KPI */}
      <div className="kpi-container">
        <div className="kpi-card">
          <h4>Total Articles</h4>
          <p>{totalArticles}</p>
        </div>

        <div className="kpi-card">
          <h4>Stock Total</h4>
          <p>{totalStock}</p>
        </div>
      </div>

      {/* TABLE */}
      <table className="table">
        <thead>
          <tr>
            <th>Désignation</th>
            <th>Stock</th>
            <th>Code Oracle</th>
            <th>N° Série</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4">Aucune donnée</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.designation}</td>
                <td>{item.stock}</td>
                <td>{item.codeOracle || "-"}</td>
                <td>{item.numeroSerie || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}