const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const planningRoutes = require('./routes/planningRoutes');
const planningHebdoRoutes = require('./routes/planningHebdoRoutes');
const fs = require('fs');

require('dotenv').config();

connectDB();

const app = express();

// CORS - Accepter toutes les origines
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/planning', planningRoutes);
app.use('/api/planning-hebdo', planningHebdoRoutes);

app.get('/', (req, res) => {
    res.json({ 
        message: 'API GMAO - Planning Annuel & Hebdomadaire',
        version: '1.0.0',
        status: 'OK'
    });
});

app.use('*', (req, res) => {
    res.status(404).json({ 
        success: false, 
        error: 'Route non trouvée' 
    });
});

app.use((err, req, res, next) => {
    console.error('❌ Erreur serveur:', err.stack);
    res.status(500).json({
        success: false,
        error: 'Erreur serveur interne'
    });
});

const DEFAULT_PORT = process.env.PORT || 5000;

// ✅ VERSION CORRIGÉE - Essaie les ports 5000, 5001, 5002, 5003
const tryPort = (port, maxAttempts = 10) => {
    return new Promise((resolve, reject) => {
        if (port > DEFAULT_PORT + maxAttempts) {
            reject(new Error(`Aucun port disponible entre ${DEFAULT_PORT} et ${port-1}`));
            return;
        }

        const server = app.listen(port)
            .on('listening', () => {
                console.log('\n🚀 ==================================');
                console.log(`   ✅ Serveur démarré sur le port ${port}`);
                console.log(`   📁 Environnement: ${process.env.NODE_ENV || 'development'}`);
                console.log(`   📍 API Annuel: http://localhost:${port}/api/planning`);
                console.log(`   📍 API Hebdo: http://localhost:${port}/api/planning-hebdo`);
                console.log('=================================\n');
                
                // Sauvegarder le port pour le frontend
                fs.writeFileSync('.port', port.toString());
                
                resolve(server);
            })
            .on('error', (err) => {
                if (err.code === 'EADDRINUSE') {
                    console.log(`❌ Port ${port} utilisé, essai du port ${port + 1}...`);
                    server.close();
                    resolve(tryPort(port + 1, maxAttempts));
                } else {
                    reject(err);
                }
            });
    });
};

// Démarrer avec le port par défaut
tryPort(DEFAULT_PORT).catch(err => {
    console.error('❌ Impossible de démarrer le serveur:', err);
    process.exit(1);
});