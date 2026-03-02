import axios from "axios";

export const loginUser = async(matricule, password) => {
    try {
        const response = await axios.post("http://localhost:5000/login", { matricule, password });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response.data.message || "Erreur de connexion" };
    }
};