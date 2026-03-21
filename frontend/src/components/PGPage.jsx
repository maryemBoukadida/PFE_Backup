import React, { useEffect, useState } from 'react';
import '../styles/GestionEquipement.css';
import { getPG } from '../components/apiservices/api';

export default function PGPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Appel API
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
  const totalStock = data.reduce((acc, item) => acc + (item.stock || 0), 0);

  if (loading) {
    return <h3>Chargement...</h3>;
  }

  return (
    <div className="page-container">
      <h2>🛢️ Produits Graissants (PG)</h2>

      {/* KPI */}
      <div className="kpi-container">
        <div className="kpi-card">
          <h4>Total Produits</h4>
          <p>{totalProduits}</p>
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
            <th>Article</th>
            <th>Référence</th>
            <th>Désignation</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.article}</td>
              <td>{item.reference}</td>
              <td>{item.designation}</td>
              <td>{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
