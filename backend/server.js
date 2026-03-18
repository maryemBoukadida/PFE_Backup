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

// Serve les fichiers statiques (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
//  Route PAPI
const fichePapiRoutes = require("./routes/fichePapiRoutes");
app.use("/api/fiche_papi", fichePapiRoutes);

const notificationRoutes = require("./routes/notificationRoutes");
app.use("/api/notifications", notificationRoutes);
// historique fiche papi 
const historiquePapiRoutes = require("./routes/historiquePapiRoutes");

app.use("/api/fiche_papi", historiquePapiRoutes);

// fiche piste
const fichePisteRoutes = require("./routes/fichePisteRoutes");

app.use("/api/fiche-piste", fichePisteRoutes);

// fiche DGS
const ficheDGSRoutes = require("./routes/ficheDGSRoutes");
app.use("/api/fiche-dgs", ficheDGSRoutes);
//
// fiche feux obstacles
const ficheFeuxObstaclesRoutes = require("./routes/ficheFeuxObstaclesRoutes");
app.use("/api/feux-obstacles", ficheFeuxObstaclesRoutes);

//LVP 
const ficheLVPRoutes = require('./routes/ficheLVPRoutes');
app.use('/api/fiche-lvp', ficheLVPRoutes);
// regulateures 
const ficheRegulateuresRoutes = require("./routes/ficheRegulateuresRoutes");
app.use("/api/fiche-regulateures", ficheRegulateuresRoutes);
// fiche postes
const fichePosteRoutes = require("./routes/fichePosteRoutes");
app.use("/api/fiche-postes", fichePosteRoutes);

//aides radios
const ficheAidesRadiosRoutes = require("./routes/ficheAidesRadiosRoutes");
app.use("/api/fiche-aides-radios", ficheAidesRadiosRoutes);
//feux encastres
const ficheFeuxEncastresRoutes = require('./routes/ficheFeuxEncastresRoutes');
app.use('/api/fiche-feux-encastres', ficheFeuxEncastresRoutes);
// fiche regulateurs semsterille 
const ficheSemesRegulateuresRoutes = require("./routes/ficheSemesRegulateuresRoutes");
app.use("/api/fiche-semes-regulateures", ficheSemesRegulateuresRoutes);

// fiche poste semesterile
const ficheSemesPostesRoutes = require("./routes/ficheSemesPostesRoutes");
app.use("/api/fiche-semes-postes", ficheSemesPostesRoutes);

// fiche semesterille dgs
const ficheSemesDgsRoutes = require("./routes/ficheSemesDgsRoutes");
app.use("/api/fiche-semes-dgs", ficheSemesDgsRoutes);
// fiche tgbt annuelel
const ficheAnnTgbtRoutes = require("./routes/ficheAnnTgbtRoutes");
app.use("/api/fiche-ann-tgbt", ficheAnnTgbtRoutes);
//fiche ann voie 
const ficheAnnVoieRoutes = require("./routes/ficheAnnVoieRoutes");
app.use("/api/fiche-ann-voie", ficheAnnVoieRoutes);

//fiche  ann papi avant
const ficheAnnPaMaRoutes = require("./routes/ficheAnnPaMaRoutes"); // ton fichier de routes
app.use("/api/fiche-ann-pa-ma", ficheAnnPaMaRoutes); // ✅ avec pa-ma
//infrastructure anuelle
const ficheAnnInfrastructureRoutes = require("./routes/ficheAnnInfrastructureRoutes");
app.use("/api/fiche-ann-infrastructure", ficheAnnInfrastructureRoutes);

const historiqueActionsRoutes = require("./routes/historiqueActionsRoutes");
app.use("/api/historique-actions", historiqueActionsRoutes);
// fiche hors sql 
const ficheHorsSqlRoutes = require("./routes/ficheHorsSqlRoutes");
app.use("/api/fiche-hors-sql", ficheHorsSqlRoutes);

// fiche effacouer:
const ficheEffarRoutes = require("./routes/ficheEffarRoutes");
app.use("/api/fiche-effar", ficheEffarRoutes);
// fiche anne feux obstacles 
const ficheAnnObsRoutes = require("./routes/ficheAnnObsRoutes");
app.use("/api/fiche-ann-obs", ficheAnnObsRoutes);

// fiche anne cable 
const ficheAnnCableRoutes = require("./routes/ficheAnnCableRoutes");
app.use("/api/fiche-ann-cable", ficheAnnCableRoutes);

// fiche annuelel feux sequentielle 
const ficheAnnFeuxSeqRoutes = require("./routes/ficheAnnFeuxSeqRoutes");
app.use("/api/fiche-ann-feux-sequentiels", ficheAnnFeuxSeqRoutes);
// fiche 5 snin papi

const ficheQuiPapiRoutes = require("./routes/ficheQuiPapiRoutes");
app.use("/api/fiche-qui-papi", ficheQuiPapiRoutes);

// fice coorrective
const ficheCorrectiveRoutes = require("./routes/ficheCorrectiveRoutes");
app.use("/api/fiche-corrective", ficheCorrectiveRoutes);
// dti 
const dtiRoutes = require('./routes/dtiRoutes');
app.use('/api/dti', dtiRoutes);

// Notifications technicien
const techNotificationRoutes = require('./routes/techNotificationRoutes');
app.use('/api/notifications-tech', techNotificationRoutes);
// fiche nobreak 
const ficheNoBreakRoutes = require("./routes/ficheNoBreakRoutes");
app.use("/api/fiche-nobreak", ficheNoBreakRoutes);

// Catch-all 404

app.use((req, res) => res.status(404).send("Route introuvable ❌"));

app.listen(5000, () => console.log("🚀 Serveur sur http://localhost:5000"));