import React, { useState } from "react";
import axios from "axios";
import logoTav from "../logoTav.png";
import bg3 from "../bg3.png";
import "../styles/Login.css"; 
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Login() {
    const [matricule, setMatricule] = useState("");
    const [password, setPassword] = useState("");
    const [isHuman, setIsHuman] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
const handleLogin = async (e) => {
    e.preventDefault();

    if (!isHuman) {
        setMessage("Veuillez confirmer que vous êtes humain !");
        return;
    }

    try {
        const response = await axios.post("http://localhost:5000/login", {
            matricule,
            password
        });

        const role = response.data.role;

setMessage("Connexion réussie !");

// Redirection selon le rôle
if (role === "admin") {
    navigate("/equipements");
} else if (role === "technicien") {
    navigate("/technicien"); // même si page vide pour l'instant
}

        

    } catch (err) {
        setMessage(err.response?.data?.message || "Erreur de connexion");
    }
};

 return (
        <div className="login-page">
            <img src={logoTav} alt="Logo TAV" className="login-logo" />
            <div className="login-container">
                <div className="login-box">
                    <h2>Connexion</h2>
                    <form onSubmit={handleLogin}>
                        <div>
 <input
    type="text"
    placeholder="Matricule"
    value={matricule}
    onChange={(e) => setMatricule(e.target.value)}
    required
/>                    </div>

                        <div>
<div className="password-container">
    <input
        type={showPassword ? "text" : "password"}
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
    />

    <span
        className="eye-icon"
        onClick={() => setShowPassword(!showPassword)}
    >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
</div>
                        </div>

                        <div>
                            <input
                                type="checkbox"
                                checked={isHuman}
                                onChange={(e) => setIsHuman(e.target.checked)}
                            />
                            <label>Je ne suis pas un robot</label>
                        </div>

                        <button type="submit">Se connecter</button>

                        <div style={{ marginTop: "10px", textAlign: "center" }}>
                            <a href="#">Mot de passe oublié ?</a>
                        </div>
                    </form>

                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
