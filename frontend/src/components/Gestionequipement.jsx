import React from "react";
import "../styles/GestionEquipement.css";
import { FaLightbulb, FaOilCan, FaBoxes  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function GestionEquipement() {
  const navigate = useNavigate();

  return (
    <div className="equipement-container">
      <h2 className="title">Gestion des équipements</h2>

      <div className="cards-container">
        
        {/* BALISAGE */}
        <div
          className="equipement-card balisage"
          onClick={() => navigate("/balisage")}
        >
          <FaLightbulb className="icon" />
          <h3>Balisage</h3>
          <p>Gestion des équipements de signalisation lumineuse</p>
        </div>

        {/* PG */}
        <div
          className="equipement-card pg"
          onClick={() => navigate("/pg")}
        >
          <FaOilCan className="icon" />
          <h3>Produits Graissants (PG)</h3>
          <p>Gestion des huiles et graisses</p>
        </div>
{/* AUTRE */}
        <div
          className="equipement-card autre"
          onClick={() => navigate("/autre")}
        >
          <FaBoxes className="icon" />
          <h3>Autres équipements</h3>
          <p>Matériel divers et stock général</p>
        </div>
      </div>
    </div>
  );
}