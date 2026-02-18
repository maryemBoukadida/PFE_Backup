// frontend/src/api.js

const API_URL = "http://localhost:5000/equipements";

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