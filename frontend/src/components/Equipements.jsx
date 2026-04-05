import React, { useState, useEffect } from 'react';
import '../styles/Equippement.css';
import FormAjoutEquip from '../Forms/FormAjoutEquip';
import { FaSearch, FaFilter } from 'react-icons/fa';
import logo from '../tav5.png';
import Dashboard from './Dashboard.jsx';
import Inventaire from './Inventaire.jsx';
import Notifications from './Notifications.jsx';
import HistoriqueActions from './HistoriqueActions';
import DTI from './DTI';
import Rapport from './Rapport';
import { FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import {
  getEquipements,
  createEquipement,
  updateEquipement,
  deleteEquipement,
  getFileByCode,
  getAllInventaires,
} from './apiservices/api';

export default function EquipementsComponent() {
  const [equipements, setEquipements] = useState([]);
  const [formData, setFormData] = useState({});
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('statistiques');
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [inventaireType, setInventaireType] = useState('');
  const [inventaires, setInventaires] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [activeInventaireTab, setActiveInventaireTab] = useState('equipement');
  const [openInventaire, setOpenInventaire] = useState(false);
  const navigate = useNavigate();
  const BACKEND_URL = 'http://localhost:5000';

  // Calculer le nombre de notifications non lues
  const unreadCount = notifications.filter((n) => !n.read).length;

  // 🔹 Charger tous les équipements
  const loadEquipements = async () => {
    try {
      const data = await getEquipements();
      setEquipements(data);
    } catch (err) {
      console.error('Erreur chargement :', err);
      alert('❌ Impossible de charger les équipements');
    }
  };

  useEffect(() => {
    loadEquipements();
  }, []);

  // Charger les notifications depuis l'API
  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/fiche-corrective/notifications`
        );
        if (!res.ok) throw new Error('Erreur serveur notifications');
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifs();
    const interval = setInterval(fetchNotifs, 15000);
    return () => clearInterval(interval);
  }, []);

  // Marquer une notification comme lue
  const markAsRead = async (notifId) => {
    try {
      await fetch(
        `${BACKEND_URL}/api/fiche-corrective/notifications/${notifId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ read: true }),
        }
      );

      // Mettre à jour l'état local
      setNotifications((prev) =>
        prev.map((n) => (n._id === notifId ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error('Erreur lors du marquage de la notification:', err);
    }
  };
  /*
  // Gérer le clic sur une notification
  const handleNotificationClick = async (notif) => {
    try {
      // Ouvrir la fiche corrective dans un nouvel onglet si URL existe
      if (notif.url) {
        window.open(notif.url, '_blank');
      }

      // Marquer comme lue uniquement si elle ne l'est pas déjà
      if (!notif.read) {
        await fetch(
          `${BACKEND_URL}/api/fiche-corrective/notifications/${notif._id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ read: true }),
          }
        );
        // Mettre à jour l'état local
        setNotifications((prev) =>
          prev.map((n) => (n._id === notif._id ? { ...n, read: true } : n))
        );
      }
      // Fermer le dropdown
      setShowNotifDropdown(false);
      // Naviguer vers la page notification
      setActiveMenu('notification');
    } catch (err) {
      console.error('Erreur lors du traitement de la notification:', err);
    }
  };
*/
  const handleNotificationClick = async (notif) => {
    try {
      // ✅ Ouvrir la fiche
      if (notif.url) {
        window.open(notif.url, '_blank');
      }

      // ✅ Marquer comme lue UNE SEULE FOIS
      if (!notif.read) {
        let url = '';

        // 🔥 Choisir la bonne API selon le type
        if (notif.type === 'corrective') {
          url = `${BACKEND_URL}/api/fiche-corrective/notifications/${notif._id}`;
        } else if (notif.type === 'tgbt') {
          url = `${BACKEND_URL}/api/fiche_ann_tgbt/notifications/${notif._id}`;
        }

        // 🔥 Appel API seulement si url existe
        if (url) {
          await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ read: true }),
          });
        }

        // ✅ Mise à jour locale (UNE SEULE FOIS)
        setNotifications((prev) =>
          prev.map((n) => (n._id === notif._id ? { ...n, read: true } : n))
        );
      }

      // ✅ UI
      setShowNotifDropdown(false);
      setActiveMenu('notification');
    } catch (err) {
      console.error('Erreur lors du traitement :', err);
    }
  };
  // Marquer toutes les notifications comme lues quand on ouvre la page notifications
  const handleNotifIconClick = () => {
    setActiveMenu('notification');
    setShowNotifDropdown(false);

    // Optionnel: Marquer toutes comme lues quand on ouvre la page
    notifications.forEach((notif) => {
      if (!notif.read) {
        markAsRead(notif._id);
      }
    });
  };

  const handleSubmit = async () => {
    try {
      if (editMode && currentId) {
        await updateEquipement(currentId, formData);
        alert('Équipement modifié ✅');
      } else {
        const data = await createEquipement(formData);
        alert(data.message || 'Équipement créé ✅');
      }

      setShowForm(false);
      setEditMode(false);
      setCurrentId(null);
      loadEquipements();
    } catch (err) {
      console.error('Erreur fetch :', err);
      alert(err.message || '❌ Erreur serveur');
    }
  };

  const handleDeleteClick = (equipement) => {
    setDeleteTarget(equipement);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteTarget?._id) return;

    try {
      const data = await deleteEquipement(deleteTarget._id);
      alert(data.message || 'Équipement supprimé ✅');
      setShowDeleteModal(false);
      setDeleteTarget(null);
      loadEquipements();
    } catch (err) {
      console.error('Erreur suppression :', err);
      alert(err.message || '❌ Impossible de contacter le serveur');
    }
  };

  const loadInventaires = async () => {
    try {
      const data = await getAllInventaires(inventaireType);
      setInventaires(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Filtrage recherche
  const filteredEquipements = equipements.filter((eq) =>
    (eq.designation_equipement || '')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 🔹 Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEquipements = filteredEquipements.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(filteredEquipements.length / itemsPerPage);

  const handleViewDetails = async (code) => {
    try {
      const { fileUrl } = await getFileByCode(code);
      window.open(fileUrl, '_blank');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className={`layout ${sidebarCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="TAV logo" />
        </div>

        <div className="menu">
          <div
            className="menu-title"
            onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
          >
            Gestion Equipement
          </div>

          {isSubMenuOpen && (
            <div className="submenu">
              <div
                className={`submenu-item ${activeMenu === 'statistiques' ? 'active' : ''}`}
                onClick={() => setActiveMenu('statistiques')}
              >
                Statistiques
              </div>
              <div
                className={`submenu-item ${activeMenu === 'gerer' ? 'active' : ''}`}
                onClick={() => setActiveMenu('gerer')}
              >
                Gérer Équipements
              </div>
            </div>
          )}
          <div
            className={`submenu-item ${activeMenu === 'inventaire' ? 'active' : ''}`}
            onClick={() => setActiveMenu('inventaire')}
          >
            Inventaire
          </div>

          <div
            className={`submenu-item ${activeMenu === 'notification' ? 'active' : ''}`}
            onClick={() => setActiveMenu('notification')}
          >
            Notifications
            {unreadCount > 0 && (
              <span className="notif-badge">{unreadCount}</span>
            )}
          </div>
          <div
            className={`submenu-item ${activeMenu === 'historique' ? 'active' : ''}`}
            onClick={() => setActiveMenu('historique')}
          >
            Historiques Actions
          </div>
          <div
            className={`submenu-item ${activeMenu === 'dti' ? 'active' : ''}`}
            onClick={() => setActiveMenu('dti')}
          >
            📌 DTI
          </div>
          <div
            className="submenu-item"
            onClick={() => setOpenInventaire(!openInventaire)}
          >
            🗂️ Gestion Inventaire
          </div>

          {openInventaire && (
            <div className="submenu-level2">
              <div
                className="submenu-item"
                onClick={() => navigate('/gestion-inventaire/equipements')}
              >
                ⚙️ Gestion Équipements
              </div>

              <div
                className="submenu-item"
                onClick={() => navigate('/gestion-inventaire/stocks')}
              >
                📦 Gestion Stock
              </div>
            </div>
          )}
          <div
            className={`submenu-item ${activeMenu === 'rapport' ? 'active' : ''}`}
            onClick={() => setActiveMenu('rapport')}
          >
            📊 Rapport
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="main">
        {/* Navbar */}
        <div className="navbar">
          <button
            className="hamburger"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            ☰
          </button>

          {/* Notification Icon avec Dropdown */}
          <div
            className="notif-icon"
            onClick={() => {
              setActiveMenu('notification');
              setShowNotifDropdown(false); // Ferme le dropdown si ouvert
            }}
          >
            <FaBell />
            {unreadCount > 0 && (
              <span className="notif-badge">{unreadCount}</span>
            )}
          </div>

          {/* Dropdown des notifications */}
          <div className="notif-dropdown">
            <div className="notif-dropdown-content">
              {notifications.length > 0 ? (
                notifications.slice(0, 5).map((notif) => (
                  <div
                    key={notif._id}
                    className={`notif-item ${!notif.read ? 'unread' : ''}`}
                    onClick={() => {
                      handleNotificationClick(notif);
                      setActiveMenu('notification'); // Ouvre l'interface notification
                    }}
                  >
                    {!notif.read && <span className="notif-dot"></span>}
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          {activeMenu === 'statistiques' ? (
            <Dashboard />
          ) : activeMenu === 'inventaire' ? (
            <Inventaire
              inventaires={inventaires}
              loadInventaires={loadInventaires}
            />
          ) : activeMenu === 'notification' ? (
            <Notifications
              notifications={notifications}
              onNotificationClick={handleNotificationClick}
              onMarkAllAsRead={() => {
                notifications.forEach((n) => {
                  if (!n.read) markAsRead(n._id);
                });
              }}
            />
          ) : activeMenu === 'historique' ? (
            <HistoriqueActions />
          ) : activeMenu === 'dti' ? (
            <DTI />
          ) : activeMenu === 'rapport' ? (
            <Rapport />
          ) : (
            <>
              {/* Toolbar */}
              <div className="toolbar">
                <div className="search-area">
                  <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                      type="text"
                      placeholder="Rechercher un équipement..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <button className="filter-btn">
                    <FaFilter />
                  </button>
                </div>

                <button className="add-btn" onClick={() => setShowModal(true)}>
                  + Ajouter un équipement
                </button>
              </div>

              {/* Table équipements */}
              <div className="big-box">
                <table className="equip-table">
                  <thead>
                    <tr>
                      <th>Désignation</th>
                      <th>Code patrimoine</th>
                      <th>Lieu</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEquipements.map((eq) => (
                      <tr key={eq._id}>
                        <td>{eq.designation_equipement}</td>
                        <td>{eq.code_patrimoine}</td>
                        <td>{eq.lieu_installation}</td>
                        <td>
                          <button
                            className="action-btn edit"
                            onClick={() => {
                              setEditMode(true);
                              setCurrentId(eq._id);
                              setFormData(eq);
                              setShowForm(true);
                            }}
                          >
                            Modifier
                          </button>

                          <button
                            className="action-btn delete"
                            onClick={() => handleDeleteClick(eq)}
                          >
                            Supprimer
                          </button>

                          <button
                            className="action-btn view"
                            onClick={() =>
                              handleViewDetails(eq.code_patrimoine)
                            }
                          >
                            Voir détails
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="page-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Précédent
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    className="page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Suivant
                  </button>
                </div>
              )}

              {/* Modals */}
              {showDeleteModal && (
                <div className="modal">
                  <div className="modal-content">
                    <p>
                      Confirmer la suppression de{' '}
                      {deleteTarget.designation_equipement} ?
                    </p>
                    <div className="modal-actions">
                      <button onClick={handleDeleteConfirmed}>Oui</button>
                      <button onClick={() => setShowDeleteModal(false)}>
                        Non
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {showForm && (
                <div className="modal">
                  <div className="modal-content">
                    <h3>{editMode ? 'Modifier' : 'Créer'} un équipement</h3>
                    <input
                      placeholder="Désignation"
                      value={formData.designation_equipement || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          designation_equipement: e.target.value,
                        })
                      }
                    />
                    <input
                      placeholder="Code patrimoine"
                      value={formData.code_patrimoine || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          code_patrimoine: e.target.value,
                        })
                      }
                      disabled={editMode}
                    />
                    <input
                      placeholder="Lieu installation"
                      value={formData.lieu_installation || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lieu_installation: e.target.value,
                        })
                      }
                    />
                    <div className="modal-actions">
                      <button onClick={handleSubmit}>
                        {editMode ? 'Modifier' : 'Créer'}
                      </button>
                      <button onClick={() => setShowForm(false)}>
                        Annuler
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div>
                {showModal && (
                  <div className="modal">
                    <div className="modal-content">
                      <FormAjoutEquip
                        closeModal={(selectedType) => {
                          setShowModal(false);
                          loadEquipements();
                          setInventaireType(selectedType);
                          loadInventaires();
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
