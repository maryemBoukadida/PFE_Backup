module.exports = (req, res, next) => {
  try {
    // exemple : user est stocké dans req.user (après un middleware authenticate)
    if (!req.user) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Accès refusé (admin uniquement)" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
