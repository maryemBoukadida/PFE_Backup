// frontend/src/api.js
import axios from "axios";

const API_URL = "http://localhost:5000/equipements";

const INVENTAIRE_API = "http://localhost:5000/api/inventaire";
const INSPECTION_API = "http://localhost:5000/api/inspections";
const INSPECTION_TECH_API = "http://localhost:5000/api/inspections/tech";
const FICHE_PAPI_API = "http://localhost:5000/api/fiche_papi";
const FICHE_PISTE_API = "http://localhost:5000/api/fiche-piste";
const FICHE_DGS_API = "http://localhost:5000/api/fiche-dgs";
const FICHE_FEUX_OBSTACLES_API = "http://localhost:5000/api/feux-obstacles";
const FICHE_LVP_API = "http://localhost:5000/api/fiche-lvp";
const FICHE_REGULATEURES_API = "http://localhost:5000/api/fiche-regulateures";
const FICHE_POSTES_API = "http://localhost:5000/api/fiche-postes";
const FICHE_AIDES_RADIOS_API = "http://localhost:5000/api/fiche-aides-radios";
const FICHE_FEUXEN_API = "http://localhost:5000/api/fiche-feux-encastres";

// 🔹 Récupérer tous les équipements
export const getEquipements = async() => {
    const res = await fetch(API_URL);
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Impossible de récupérer les équipements: ${text}`);
    }
    return res.json();
};

// 🔹 Créer un équipement
export const createEquipement = async(equipement) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(equipement),
    });

    const text = await res.text();
    let data = {};
    try {
        data = JSON.parse(text);
    } catch {
        throw new Error(`Erreur serveur: ${text}`);
    }

    if (!res.ok) throw new Error(data.message || "Erreur création équipement");
    return data;
};

// 🔹 Mettre à jour un équipement
export const updateEquipement = async(id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const text = await res.text();
    let parsed = {};
    try {
        parsed = JSON.parse(text);
    } catch {
        throw new Error(`Erreur serveur: ${text}`);
    }

    if (!res.ok) throw new Error(parsed.message || "Erreur mise à jour équipement");
    return parsed;
};

// 🔹 Supprimer un équipement par ID
export const deleteEquipement = async(id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    let data = {};
    try { data = await res.json(); } catch {}

    if (!res.ok) throw new Error(data.message || "Erreur suppression");
    return data;
};

// 🔹 Récupérer le fichier Excel d'un équipement par code patrimoine
export const getFileByCode = async(code) => {
    const res = await fetch(`${API_URL}/file/${code}`); // Assure-toi que ta route backend est /equipements/file/:code
    const text = await res.text();
    let data = {};
    try {
        data = JSON.parse(text);
    } catch {
        throw new Error(`Erreur serveur: ${text}`);
    }

    if (!res.ok) throw new Error(data.message || "Erreur récupération fichier Excel");
    return data; // { fileUrl: "http://localhost:5000/nom_du_fichier.xlsx" }
};


//inventaire

export const getAllInventaires = async(type) => {
    const res = await axios.get(`${INVENTAIRE_API}/${type}`);
    return res.data;
};

// inspections 
export const createInspection = async(inspection) => {
    const res = await fetch(INSPECTION_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inspection),
    });

    const text = await res.text();
    let data = {};

    try {
        data = JSON.parse(text);
    } catch {
        throw new Error(`Erreur serveur: ${text}`);
    }

    if (!res.ok) throw new Error(data.message || "Erreur création inspection");

    return data;
};
// technicien
// gett all inspections

export const getInspections = async() => {
    const res = await fetch(INSPECTION_API);

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Erreur récupération inspections: ${text}`);
    }

    return res.json();
};


export const envoyerInspectionTech = async(inspection) => {
    const res = await fetch(`${INSPECTION_TECH_API}/envoyer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...inspection,
            type: "JOURNALIERE", // 
        }),
    });

    const text = await res.text();
    let data = {};
    try { data = JSON.parse(text); } catch {}
    if (!res.ok) throw new Error(data.message || "Erreur serveur");
    return data;
};

// 🔹 récupérer toutes les fiches
export const fetchFiches = async() => {
    const res = await axios.get(FICHE_PAPI_API);
    return res.data;
};

// 🔹 update fiche
export const updateFiche = async(id, data) => {
    const res = await axios.put(`${FICHE_PAPI_API}/${id}`, data);
    return res.data;
};

// 🔹 envoyer fiche
export const sendFiche = async(id) => {
    const res = await axios.put(`${FICHE_PAPI_API}/send/${id}`);
    return res.data;
};

// 🔹 notifications
export const fetchNotifications = async() => {
    const res = await axios.get(`${FICHE_PAPI_API}/notifications`);
    return res.data;
};

// 🔹 Valider fiche (historique)
export const sendFicheHist = async(ficheId) => {
    try {
        const res = await fetch(`${FICHE_PAPI_API}/valider/${ficheId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        console.log("🟢 Validation response:", data);
        return data;
    } catch (err) {
        console.error("❌ Erreur sendFicheHist:", err);
        throw err;
    }
};
// 🔹 NOUVEAU : Récupérer l'historique des fiches validées
export const getHistorique = async() => {
    try {
        const res = await fetch(`${INSPECTION_API}/historiques`);
        if (!res.ok) throw new Error("Erreur récupération historique");
        return await res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
};

// =======================
// FICHE PISTE
// =======================

// récupérer fiche piste
export const getFichePiste = async() => {
    const res = await axios.get(FICHE_PISTE_API);
    return res.data;
};

// modifier fiche piste
export const updateFichePiste = async(id, data) => {
    const res = await axios.put(`${FICHE_PISTE_API}/${id}`, data);
    return res.data;
};
// envoyer fiche piste
export const envoyerFichePiste = async(id) => {

    const response = await fetch(`${FICHE_PISTE_API}/envoyer/${id}`, {
        method: "POST"
    });

    return response.json();
};
// =======================
// FICHE DGS
// =======================
// récupérer fiche DGS
export const getFicheDGS = async() => {
    const res = await axios.get(FICHE_DGS_API);
    return res.data;
};
// enregistrer fiche DGS (brouillon)
export const enregistrerFicheDGS = async(id, data) => {
    const response = await fetch(`${FICHE_DGS_API}/enregistrer/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return response.json();
};
// envoyer fiche DGS
export const envoyerFicheDGS = async(id) => {

    const response = await fetch(`${FICHE_DGS_API}/envoyer/${id}`, {
        method: "POST"
    });

    return response.json();
};
// =======================
// FICHE FeuxObstacles
// =======================
///get donne
export const getFicheFeuxObstacles = async() => {
    const res = await axios.get(FICHE_FEUX_OBSTACLES_API);
    return res.data;
};
//enregistrer 
export const enregistrerFicheFeuxObstacles = async(id, data) => {
    const response = await fetch(`${FICHE_FEUX_OBSTACLES_API}/enregistrer/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return response.json();
};
//envoyer 
export const envoyerFicheFeuxObstacles = async(id) => {

    const response = await fetch(`${FICHE_FEUX_OBSTACLES_API}/envoyer/${id}`, {
        method: "POST"
    });

    return response.json();
};
// =======================
// FICHE FeuxLVP 
// =======================
export const getFicheLVP = async() => {
    try {
        const res = await fetch(FICHE_LVP_API);
        if (!res.ok) throw new Error("Erreur lors de la récupération de la fiche LVP");
        return await res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
};
//enregiterement
export const enregistrerFicheLVP = async(id, data) => {
    const response = await fetch(`${FICHE_LVP_API}/enregistrer/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return response.json();
};
//envoiee
export const envoyerFicheLVP = async(id) => {
    try {
        const response = await fetch(`${FICHE_LVP_API}/envoyer/${id}`, {
            method: "POST"
        });

        if (!response.ok) throw new Error("Erreur lors de l'envoi de la fiche LVP");

        return await response.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
};
// =======================
// FICHE Regulateures 
// =======================
export const getFicheRegulateures = async() => {
    const res = await axios.get(FICHE_REGULATEURES_API);
    return res.data;
};

export const enregistrerFicheRegulateures = async(id, data) => {
    const res = await axios.put(`${FICHE_REGULATEURES_API}/${id}`, data);
    return res.data;
};

export const envoyerFicheRegulateures = async(id) => {
    const res = await axios.put(`${FICHE_REGULATEURES_API}/envoyer/${id}`);
    return res.data;
};
// =======================
// FICHE postes
// =======================
export const getFichePostes = async() => {
    const response = await fetch(FICHE_POSTES_API);

    if (!response.ok) {
        throw new Error("Erreur récupération fiche postes");
    }

    return response.json();
};
export const enregistrerFichePostes = async(id, data) => {
    const res = await axios.put(`${FICHE_POSTES_API}/${id}`, data);
    return res.data;
};
export const envoyerFichePostes = async(id) => {
    const res = await axios.put(`${FICHE_POSTES_API}/envoyer/${id}`);
    return res.data;
};
// =======================
// FICHE aides radios
// =======================
export const getFicheAidesRadios = async() => {

    const response = await fetch(FICHE_AIDES_RADIOS_API);

    if (!response.ok) {
        throw new Error("Erreur récupération fiche aides radios");
    }

    return response.json();
};
//enregisterre fiche aides radios
export const enregistrerFicheAidesRadios = async(id, data) => {
    const res = await axios.put(`${FICHE_AIDES_RADIOS_API}/${id}`, data);
    return res.data;
};
export const envoyerFicheAidesRadios = async(id) => {
    const res = await axios.put(`${FICHE_AIDES_RADIOS_API}/envoyer/${id}`);
    return res.data;
};

// =======================
// FICHE feux encastres
// =======================
// Récupérer la dernière fiche
export const getFicheFeuxEncastres = async() => {
    const response = await fetch(FICHE_FEUXEN_API);
    if (!response.ok) {
        throw new Error("Erreur récupération fiche feux encastrés");
    }
    return response.json();
};
export const enregistrerFicheFeuxEncastres = async(id, data) => {
    const res = await axios.put(`${FICHE_FEUXEN_API}/${id}`, data);
    return res.data;
};
export const envoyerFicheFeuxEncastres = async(id) => {
    const res = await axios.put(`${FICHE_FEUXEN_API}/envoyer/${id}`);
    return res.data;
};