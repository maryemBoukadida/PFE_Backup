import React, { useState, useEffect } from 'react';
import '../styles/Equippement.css';
import FormAjoutEquip from '../Forms/FormAjoutEquip';
import { FaSearch, FaFilter } from 'react-icons/fa';
import logo from '../tav5.png';
import Dashboard from './Dashboard.jsx';
import Inventaire from './Inventaire.jsx';
import GestionInspections from './GestionInspections.jsx';
import Notifications from './Notifications.jsx';
import Historiques from './Historiques.jsx';

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
  const [isInspectionSubMenuOpen, setIsInspectionSubMenuOpen] = useState(false);
  const [inspectionSubMenuActive, setInspectionSubMenuActive] =
    useState('inspections'); // "inspections" ou "historiques"
  const [inventaireType, setInventaireType] = useState('');
  const [inventaires, setInventaires] = useState([]);
  const [notifications, setNotifications] = useState([]);

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
        const res = await fetch('/api/inspections/notifications');
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotifs();
  }, []);
  // 🔹 Création ou modification
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

  // 🔹 Supprimer un équipement
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
  // Nombre total de pages
  const totalPages = Math.ceil(filteredEquipements.length / itemsPerPage);

  const handleViewDetails = async (code) => {
    try {
      const { fileUrl } = await getFileByCode(code);
      window.open(fileUrl, '_blank'); // ouvre le fichier Excel dans un nouvel onglet
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className={`layout ${sidebarCollapsed ? 'collapsed' : ''}`}>
      {/*sidebar*/}
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
            className={`menu-title ${inspectionSubMenuActive ? 'active' : ''}`}
            onClick={() => setIsInspectionSubMenuOpen(!isInspectionSubMenuOpen)}
          >
            Gestion Inspections
          </div>

          {isInspectionSubMenuOpen && (
            <div className="submenu">
              <div
                className={`submenu-item ${inspectionSubMenuActive === 'inspections' ? 'active' : ''}`}
                onClick={() => {
                  setActiveMenu('inspection');
                  setInspectionSubMenuActive('inspections');
                }}
              >
                Inspections
              </div>
              <div
                className={`submenu-item ${inspectionSubMenuActive === 'historiques' ? 'active' : ''}`}
                onClick={() => {
                  setActiveMenu('inspection');
                  setInspectionSubMenuActive('historiques');
                }}
              >
                Historiques
              </div>
            </div>
          )}
          <div
            className={`submenu-item ${activeMenu === 'notification' ? 'active' : ''}`}
            onClick={() => setActiveMenu('notification')}
          >
            Notification{' '}
            {notifications.length > 0 && (
              <span className="notif-badge">{notifications.length}</span>
            )}
          </div>
        </div>
      </div>
      {/**Main */}
      <div className="main">
        {/**navbar */}
        <div className="navbar">
          <button
            className="hamburger"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            ☰
          </button>
        </div>

        <div className="content">
          {activeMenu === 'statistiques' ? (
            <Dashboard />
          ) : activeMenu === 'inventaire' ? (
            <Inventaire
              inventaires={inventaires}
              loadInventaires={loadInventaires}
            />
          ) : activeMenu === 'inspection' ? (
            inspectionSubMenuActive === 'inspections' ? (
            <GestionInspections />
            ):(
              <Historiques />)
          ) : activeMenu === 'notification' ? (
            <Notifications />
          ) : (
            <>
              {/*tool bar */}
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
                  */
                </div>

                <button className="add-btn" onClick={() => setShowModal(true)}>
                  + Ajouter un équipement
                </button>
              </div>

              {/* Tbale équipements */}
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

              {/* Modal suppression */}
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

              {/* Formulaire création/modification */}
              {/* Modal édition / création */}
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

              {/* Formulaire d'ajout équipements */}
              <div>
                {showModal && (
                  <div className="modal">
                    <div className="modal-content">
                      <FormAjoutEquip
                        closeModal={(selectedType) => {
                          setShowModal(false);
                          loadEquipements();
                          setInventaireType(selectedType); // ✅ met à jour le type pour Inventaire
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
