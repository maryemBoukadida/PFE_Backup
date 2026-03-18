import React, { useState } from "react";
import "../styles/Layout.css";
import logo from "../tav5.png";

export default function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true); // menu déroulé ou non
  const [activeMenu, setActiveMenu] = useState("intervention"); // intervention ou inspection
  const [activeSubMenu, setActiveSubMenu] = useState("preventif"); // preventif ou correctif
  const [interventionOpen, setInterventionOpen] = useState(true); // pour dérouler les sous-menus d'intervention

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
          {/* Titre principal Gestion interventions */}
          <h3 
            className="menu-title" 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ cursor: 'pointer' }}
          >
            Gestion interventions {menuOpen ? '▼' : '▶'}
          </h3>

          {/* Menu déroulant principal */}
          {menuOpen && (
            <ul className="submenu">
              {/* Intervention avec ses sous-menus */}
              <li>
                <div 
                  className={`menu-item ${activeMenu === "intervention" ? "active" : ""}`}
                  onClick={() => {
                    setActiveMenu("intervention");
                    setInterventionOpen(!interventionOpen);
                  }}
                  style={{ cursor: 'pointer', padding: '8px 0' }}
                >
                  Intervention {interventionOpen ? '▼' : '▶'}
                </div>
                
                {/* Sous-menus d'Intervention (Préventif et Correctif) */}
                {interventionOpen && activeMenu === "intervention" && (
                  <ul className="submenu-children" style={{ paddingLeft: '20px' }}>
                    <li
                      className={activeSubMenu === "preventif" ? "active" : ""}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSubMenu("preventif");
                      }}
                      style={{ cursor: 'pointer', padding: '4px 0' }}
                    >
                      Préventif
                    </li>
                    <li
                      className={activeSubMenu === "correctif" ? "active" : ""}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSubMenu("correctif");
                      }}
                      style={{ cursor: 'pointer', padding: '4px 0' }}
                    >
                      Correctif
                    </li>
                  </ul>
                )}
              </li>

              {/* Inspection (sans sous-menus) */}
              <li
                className={activeMenu === "inspection" ? "active" : ""}
                onClick={() => {
                  setActiveMenu("inspection");
                }}
                style={{ cursor: 'pointer', padding: '8px 0' }}
              >
                Inspection
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="main-content">
        <div className="topbar">
          <h1>Gestion interventions</h1>
        </div>

        <div className="content">
          {React.cloneElement(children, { activeMenu, activeSubMenu })}
        </div>
      </div>
    </div>
  );
}