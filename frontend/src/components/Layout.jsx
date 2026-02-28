import React, { useState } from "react";
import "../styles/Layout.css";
import logo from "../tav5.png";

export default function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="layout-container">
      {/* Barre latérale gauche */}
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <img src={logo} alt="logo" className="logo" />
          <button
            className="hamburger-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            &#9776;
          </button>
        </div>

        <div className="menu">
            <li className="active">Gestion Inspections</li>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="main-content">
        {/* Barre en haut */}
        <div className="topbar">
          <h1></h1>
        </div>

        {/* Contenu enfant (ton composant InspectionTech) */}
        <div className="content">{children}</div>
      </div>
    </div>
  );
}