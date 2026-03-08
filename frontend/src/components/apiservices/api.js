// frontend/src/api.js
import axios from "axios";

const API_URL = "http://localhost:5000/equipements";

const INVENTAIRE_API = "http://localhost:5000/api/inventaire";
const INSPECTION_API = "http://localhost:5000/api/inspections";
const INSPECTION_TECH_API = "http://localhost:5000/api/inspections/tech";
const FICHE_PAPI_API = "http://localhost:5000/api/fiche_papi";

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