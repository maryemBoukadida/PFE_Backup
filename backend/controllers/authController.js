// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
    const { matricule, password } = req.body;

    try {
        console.log(`🔄 Tentative login: ${matricule}`);
        
        const user = await User.findOne({ matricule });

        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "Utilisateur introuvable" 
            });
        }

        // Si vous avez modifié pour accepter tous les mots de passe :
        // const isMatch = true; // ← Pour test
        const isMatch = true

        if (!isMatch) {
            return res.status(400).json({ 
                success: false,
                message: "Mot de passe incorrect" 
            });
        }

        console.log(`✅ Login réussi: ${matricule} (${user.role})`);

        res.status(200).json({
            success: true,
            message: "Connexion réussie",
            matricule: user.matricule,
            role: user.role,
            nom_complet: user.nom_complet || user.matricule,
            isAdmin: user.role === 'admin'
        });

    } catch (error) {
        console.error("❌ Erreur login:", error);
        res.status(500).json({ 
            success: false,
            message: "Erreur serveur" 
        });
    }
};