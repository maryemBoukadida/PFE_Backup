const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.login = async(req, res) => {
    const { matricule, password } = req.body;

    try {
        const user = await User.findOne({ matricule });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        res.status(200).json({
            message: "Connexion réussie",
            role: user.role
        });

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};