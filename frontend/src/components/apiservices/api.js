// frontend/src/api.js
import axios from "axios";

const API_URL = "http://localhost:5000/equipements";

const INVENTAIRE_API = "http://localhost:5000/api/inventaire";

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

export const createInventaire = async(type, data) => {
    const res = await axios.post(`${INVENTAIRE_API}/${type}`, data);
    return res.data;
};

export const deleteInventaire = async(type, id) => {
    const res = await axios.delete(`${INVENTAIRE_API}/${type}/${id}`);
    return res.data;
};