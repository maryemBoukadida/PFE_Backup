const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const statsRoutes = require("./routes/statsRoutes");
const path = require("path");


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion MongoDB
connectDB();

// Route test
app.get("/test", (req, res) => res.json({ message: "API fonctionne ✅" }));


//authentification 
app.use("/", require("./routes/authRoutes"));
// Serve les fichiers statiques (Excel, images, etc.)
app.use(express.static(path.join(__dirname, "uploads")));

// Routes équipements — **chemin exact et router correct**
app.use("/equipements", require("./routes/equipementRoutes"));

// routes
app.use("/api/equipements/stats", statsRoutes);
//inventaire
const inventaireRoutes = require("./routes/inventaireRoutes");
app.use("/api/inventaire", inventaireRoutes);

// route inspections technciien
const inspecTechRouter = require("./routes/inspec_tech_routes");
app.use("/api/inspections/tech", inspecTechRouter);

// inspections 
const inspectionRoutes = require("./routes/inspectionRoutes"); // chemin correct
app.use("/api/inspections", inspectionRoutes);

//ficheroute *
// ✅ Route PAPI
const fichePapiRoutes = require("./routes/fichePapiRoutes");
app.use("/api/fiche_papi", fichePapiRoutes);

// historique fiche papi 
const historiquePapiRoutes = require("./routes/historiquePapiRoutes");

app.use("/api/fiche_papi", historiquePapiRoutes);


// Catch-all 404
app.use((req, res) => res.status(404).send("Route introuvable ❌"));

app.listen(5000, () => console.log("🚀 Serveur sur http://localhost:5000"));