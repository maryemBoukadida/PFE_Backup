import React, { useState ,useEffect } from "react";
import tav5 from "../tav5.png";
import "../styles/Equippement.css"; 
import Dashboard from "./Dashboard";


export default function Equippement() {
  const [page, setPage] = useState("gerer");
  const [collapsed, setCollapsed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [equipements, setEquipements] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // nombre d'éléments par page



    const [formData, setFormData] = useState({
    designation_equipement: "",
    lieu_installation: "",
    code_patrimoine: "",
    adresse_ip: "",
    fournisseur: "",
    installateur: "",
    plaque: "",
    contact: "",
    tel_direct: "",
    gsm: "",
    tel_office: "",
    fax: ""
  });


  const searchEquipement = async (code) => {
  const res = await fetch("http://localhost:5000/equipements/search/" + code);
  const data = await res.json();

  if (!data.exists) {
    alert("Équipement introuvable ❌");
  } else {
    alert("Équipement trouvé ✅");
    console.log(data.equipement);
  }
};



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async () => {
  console.log("💾 Envoi de :", formData);

  try {
    const res = await fetch("http://localhost:5000/equipements", { // ← pointage vers Node
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const text = await res.text();
    let data = {};
    try { data = JSON.parse(text); } catch {}
    
    if (!res.ok) {
      alert(data.message || "❌ Erreur serveur");
      return;
    }

    alert(data.message);
    loadEquipements();
    setShowForm(false);

  } catch (err) {
    console.log("Erreur fetch :", err);
    alert("❌ Le serveur n'est pas accessible");
  }
};
useEffect(() => {
  loadEquipements();
}, []);

const loadEquipements = async () => {
  try {
    const res = await fetch("http://localhost:5000/equipements");
    const data = await res.json();
    console.log("📦 Equipements reçus:", data);
    setEquipements(data);
  } catch (err) {
    console.log("Erreur chargement", err);
  }
};

const filteredEquipements = equipements.filter(eq =>
  (eq.code_patrimoine || "")
    .trim()
    .toLowerCase()
    .includes(search.trim().toLowerCase())
);
// Calcul des éléments à afficher pour la page actuelle
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredEquipements.slice(indexOfFirstItem, indexOfLastItem);

const totalPages = Math.ceil(filteredEquipements.length / itemsPerPage);

const nextPage = () => {
  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
};

const prevPage = () => {
  if (currentPage > 1) setCurrentPage(currentPage - 1);
};




  return (
    <div className="app">
      
      {/* Sidebar */}
      <div className={collapsed ? "sidebar collapsed" : "sidebar"}>
        <img src={tav5} alt="TAV" className="logo" />

        {!collapsed && (
          <>
            <div className="menu-title">Gestion Équipement</div>

            <div className="menu-item" onClick={() => setPage("stats")}>
  📊 Statistique
</div>


            <div className="menu-item" onClick={() => setPage("gerer")}>
              🛠️ Gérer équipements
            </div>
          </>
        )}
      </div>

      {/* Main content */}
      <div className="content">

        {/* Top bar */}
        <div className="topbar">
          <span className="hamburger" onClick={() => setCollapsed(!collapsed)}>
            ☰
          </span>
          <h2>Equipement Section</h2>
        </div>

        {page === "gerer" && (
          <>
           <div className="search-box">
 <input
  type="text"
  placeholder="Rechercher par code patrimoine..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

  
  {/* Icône filtre */}
  <button className="filter-btn" onClick={() => alert("Filtrer !")}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4h18M6 12h12M10 20h4" />
    </svg>
  </button>
</div>



            <button className="add-btn" onClick={() => setShowForm(true)}>
                + Ajouter équipement
   
            </button>


            <div className="big-box">
  <table className="equip-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Désignation</th>
      <th>Lieu</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>

    {currentItems.map(eq => (
      <tr key={eq._id}>
        <td>{eq.code_patrimoine}</td>
        <td>{eq.designation_equipement}</td>
        <td>{eq.lieu_installation}</td>
        <td>
          <button className="action-btn edit" onClick={() => alert(`Modifier ${eq.code_patrimoine}`)}>
            Modifier
          </button>
          <button className="action-btn delete" onClick={() => alert(`Supprimer ${eq.code_patrimoine}`)}>
            Supprimer
          </button>
         <button
  className="action-btn view"
  onClick={() => window.open(`http://localhost:5000/equipements/${eq._id}/pdf`, "_blank")}
>
  Voir PDF
</button>









        </td>
      </tr>
    ))}
  </tbody>
</table>

  <div className="pagination">
  <button
    className="page-btn"
    onClick={prevPage}
    disabled={currentPage === 1}
  >
    ❮
  </button>

  {[...Array(totalPages)].map((_, idx) => (
    <button
      key={idx}
      className={`page-btn ${currentPage === idx + 1 ? "active" : ""}`}
      onClick={() => setCurrentPage(idx + 1)}
    >
      {idx + 1}
    </button>
  ))}

  <button
    className="page-btn"
    onClick={nextPage}
    disabled={currentPage === totalPages}
  >
    ❯
  </button>
</div>




</div>

          </>
        )}

        {page === "stats" && <Dashboard />}



         {/* Popup Form */}
        {showForm && (
          <div className="modal">
            <div className="modal-content">
              <h3>Ajouter un équipement</h3>

              <input name="designation_equipement" placeholder="Désignation" onChange={handleChange} />
              <select
              name="lieu_installation"
              onChange={handleChange}
              defaultValue=""
              className="input-style">
                <option value="" disabled>Lieu_installation</option>
                <option value="SST1">SST1</option>
                <option value="SST2">SST2</option>
              </select>
  
              <input
             name="code_patrimoine" 
             placeholder="Code patrimoine" 
            value={formData.code_patrimoine}
            onChange={handleChange} />              
            <input name="adresse_ip" placeholder="Adresse IP" onChange={handleChange} />
              <input name="fournisseur" placeholder="Fournisseur" onChange={handleChange} />
              <input name="installateur" placeholder="Installateur" onChange={handleChange} />
              <input name="plaque" placeholder="Plaque" onChange={handleChange} />
              <input name="contact" placeholder="Contact" onChange={handleChange} />
              <input name="tel_direct" placeholder="Tel direct" onChange={handleChange} />
              <input name="gsm" placeholder="GSM" onChange={handleChange} />
              <input name="tel_office" placeholder="Tel office" onChange={handleChange} />
              <input name="fax" placeholder="Fax" onChange={handleChange} />

              <div className="modal-actions">
                <button onClick={handleSubmit}>Enregistrer</button>
                <button onClick={() => setShowForm(false)}>Annuler</button>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}
