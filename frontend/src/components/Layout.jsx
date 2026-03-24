import React, { useState } from "react";
import "../styles/Layout.css";
import logo from "../tav5.png";
import TechNotifications from "../components/TechNotifications";
import { FaBell } from "react-icons/fa";
export default function Layout({ children, technicien }) {
  // --------------------------
  // États principaux
  // --------------------------
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true); // menu déroulé ou non
  const [activeMenu, setActiveMenu] = useState("intervention"); // intervention, inspection, notifications
  const [activeSubMenu, setActiveSubMenu] = useState("preventif"); // sous-menu intervention
  const [interventionOpen, setInterventionOpen] = useState(true); // déroulé des sous-menus Intervention

  return (
    <div className="layout-container">
      {/* --------------------------
          Barre latérale gauche
      -------------------------- */}
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
            style={{ cursor: "pointer" }}
          >
            Gestion interventions {menuOpen ? "▼" : "▶"}
          </h3>

          {/* Menu déroulant */}
          {menuOpen && (
            <ul className="submenu">
              {/* 1️⃣ Intervention avec ses sous-menus */}
              <li>
                <div
                  className={`menu-item ${
                    activeMenu === "intervention" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveMenu("intervention");
                    setInterventionOpen(!interventionOpen);
                  }}
                  style={{ cursor: "pointer", padding: "8px 0" }}
                >
                  Intervention {interventionOpen ? "▼" : "▶"}
                </div>

                {interventionOpen && activeMenu === "intervention" && (
                  <ul className="submenu-children" style={{ paddingLeft: "20px" }}>
                    <li
                      className={activeSubMenu === "preventif" ? "active" : ""}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSubMenu("preventif");
                      }}
                      style={{ cursor: "pointer", padding: "4px 0" }}
                    >
                      Préventif
                    </li>
                    <li
                      className={activeSubMenu === "correctif" ? "active" : ""}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSubMenu("correctif");
                      }}
                      style={{ cursor: "pointer", padding: "4px 0" }}
                    >
                      Correctif
                    </li>
                  </ul>
                )}
              </li>

              {/* 2️⃣ Inspection */}
              <li
                className={activeMenu === "inspection" ? "active" : ""}
                onClick={() => setActiveMenu("inspection")}
                style={{ cursor: "pointer", padding: "8px 0" }}
              >
                Inspection
              </li>

              {/* 3️⃣ Notifications (sous le menu Gestion interventions) */}
              <li
                className={activeMenu === "notifications" ? "active" : ""}
                onClick={() => setActiveMenu("notifications")}
                style={{ cursor: "pointer", padding: "8px 0" }}
              >
                Notifications
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* --------------------------
          Contenu principal
      -------------------------- */}
      <div className="main-content">
        <div className="topbar">
  <h1>Gestion interventions</h1>

  {/* 🔔 Notification icon */}
  <div
    className="notification-icon"
    onClick={() => setActiveMenu("notifications")}
    style={{ cursor: "pointer", position: "relative" }}
  >
    <FaBell size={22} />

    {/* 🔴 badge (optionnel) */}
    <span className="notif-badge">3</span>
  </div>
</div>

        <div className="content">
          {/* Afficher le composant Notifications si le menu actif est "notifications" */}
          {activeMenu === "notifications" ? (
            <TechNotifications technicien={technicien} />
          ) : (
            React.cloneElement(children, { activeMenu, activeSubMenu })
          )}
        </div>
      </div>
    </div>
  );
}