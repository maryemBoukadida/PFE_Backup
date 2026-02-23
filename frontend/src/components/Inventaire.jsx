import React, { useState, useEffect } from "react";
import { FaExclamationTriangle, FaBoxes, FaCheckCircle } from "react-icons/fa";
import { getAllInventaires} from "./apiservices/api";
import "../styles/Inventaire.css";

export default function InventaireComponent() {
  const [inventaires, setInventaires] = useState([]);
  const [type, setType] = useState("PG"); // PG, BALISAGE, AGL
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // nombre d’éléments par page
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = inventaires.slice(indexOfFirstItem, indexOfLastItem);

const totalPages = Math.ceil(inventaires.length / itemsPerPage);
const [selectedFilter, setSelectedFilter] = useState(null); // "rupture" | "faible" | "normal"
  const loadInventaires = async () => {
    const data = await getAllInventaires(type);
    setInventaires(data);
  };

useEffect(() => {
  setCurrentPage(1); // reset page
  loadInventaires();
}, [type]);

const seuil = 10;

const rupture = inventaires.filter(item => 
  (item.quantite === 0 || item.stock_actuel === 0)
);

const minimum = inventaires.filter(item => {
  const q = item.quantite ?? item.stock_actuel;
  return q > 0 && q <= seuil;
});

const normal = inventaires.filter(item => {
  const q = item.quantite ?? item.stock_actuel;
  return q > seuil;
});
 

return (
  <div className="inventaire-container">
    <div className="inventaire-card">

      <div className="inventaire-header">
        <h2 className="inventaire-title">Inventaire {type}</h2>

        <select
          className="inventaire-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="PG">PG</option>
          <option value="BALISAGE">BALISAGE</option>
          <option value="AGL">AGL</option>
        </select>
      </div>
<div className="stats-cards">

  <div className="card red" onClick={() => setSelectedFilter('rupture')}>
      <div className="card-content">
      <FaExclamationTriangle className="card-icon" />
      <div>
  <h3>Rupture</h3>
  <p>{rupture.length}</p>
</div>
</div>
</div>

  <div className="card orange" onClick={() => setSelectedFilter('minimum')}>
        <div className="card-content">
      <FaBoxes className="card-icon" />
      <div>
  <h3>Stock minimum</h3>
  <p>{minimum.length}</p>
</div>
</div>
</div>

  <div className="card green" onClick={() => setSelectedFilter('normal')}>
        <div className="card-content">
      <FaCheckCircle className="card-icon" />
      <div>
  <h3>Stock Normal</h3>
  <p>{normal.length}</p>
</div>
</div>
</div>



</div>
     <table className="inventaire-table">
  <thead>
    <tr>
      {type === "PG" && (
        <>
          <th>Code Oracle</th>
          <th>Référence</th>
          <th>Désignation</th>
          <th>Stock Actuel</th>
        </>
      )}

      {type === "BALISAGE" && (
        <>
          <th>Code</th>
          <th>Désignation</th>
          <th>Quantité</th>
        </>
      )}

      {type === "AGL" && (
        <>
          <th>Code</th>
          <th>Désignations</th>
          <th>Quantité</th>
        </>
      )}
    </tr>
  </thead>

<tbody>
  {inventaires.length > 0 ? (
    currentItems.map((inv) => {
      let rowClass = "";
      const q = inv.quantite ?? inv.stock_actuel;

      if (selectedFilter === 'rupture' && (q === 0)) rowClass = "red-row";
      if (selectedFilter === 'minimum' && q > 0 && q <= seuil) rowClass = "orange-row";
      if (selectedFilter === 'normal' && q > seuil) rowClass = "green-row";

      return (
        <tr key={inv._id} className={rowClass}>
          {/* ==== ton code pour PG, BALISAGE, AGL ==== */}
          {type === "PG" && (
            <>
              <td>{inv.code_oracle}</td>
              <td>{inv.reference}</td>
              <td>{inv.designation}</td>
              <td>{inv.stock_actuel}</td>
            </>
          )}
          {type === "BALISAGE" && (
            <>
              <td>{inv.code}</td>
              <td>{inv.designation}</td>
              <td>{inv.quantite}</td>
            </>
          )}
          {type === "AGL" && (
            <>
              <td>{inv.code}</td>
              <td>{Array.isArray(inv.designations) ? inv.designations.join(", ") : inv.designations}</td>
              <td>{inv.quantite}</td>
            </>
          )}
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="4" className="no-data">Aucun inventaire trouvé</td>
    </tr>
  )}
</tbody>
</table>


      <div className="pagination">
  <button
    onClick={() => setCurrentPage(prev => prev - 1)}
    disabled={currentPage === 1}
  >
    ⬅ Précédent
  </button>

  <span>Page {currentPage} / {totalPages}</span>

  <button
    onClick={() => setCurrentPage(prev => prev + 1)}
    disabled={currentPage === totalPages}
  >
    Suivant ➡
  </button>
</div>

    </div>
  </div>
);
}