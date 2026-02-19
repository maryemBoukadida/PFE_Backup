const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const statsRoutes = require("./routes/statsRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion MongoDB
connectDB();

// Route test
app.get("/test", (req, res) => res.json({ message: "API fonctionne ✅" }));

// Routes équipements — **chemin exact et router correct**
app.use("/equipements", require("./routes/equipementRoutes"));

// routes
app.use("/api/equipements/stats", statsRoutes);

// Catch-all 404
app.use((req, res) => res.status(404).send("Route introuvable ❌"));

app.listen(5000, () => console.log("🚀 Serveur sur http://localhost:5000"));