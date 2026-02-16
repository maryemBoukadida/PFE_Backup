import React, { useState } from "react";
import axios from "axios";
import logoTav from "../logoTav.png";
import bg3 from "../bg3.png";
import "../styles/Login.css"; 
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isHuman, setIsHuman] = useState(false);
    const [message, setMessage] = useState("");

   
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!isHuman) {
            setMessage("Veuillez confirmer que vous êtes humain !");
            return;
        }

        try {
            await axios.post("http://localhost:5000/login", { email, password });
            setMessage("Connexion réussie !");
        } catch (err) {
            setMessage("Erreur de connexion");
        }
    };

    return (
        <div className="login-page">
            <img src={logoTav} alt="Logo TAV"
            className="login-logo"/>

            <div className="login-container">
                <div className="login-box">
                    <h2>Connexion</h2>
                    <form onSubmit={handleLogin}>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
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
