const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const planningRoutes = require('./routes/planningRoutes'); // ← Utilisez le bon nom
const planningHebdoRoutes = require('./routes/planningHebdoRoutes');
const authRoutes = require('./routes/authRoutes');
const fs = require('fs');

require('dotenv').config();

connectDB();

const app = express();

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

// Routes - CORRIGÉ
app.use('/api/planning', planningRoutes);         // ← Pour le planning annuel
app.use('/api/planning-hebdo', planningHebdoRoutes); // ← Pour le planning hebdo
app.use('/api', authRoutes);

// Route de test
app.get('/api/test', (req, res) => {
    res.json({ 
        success: true, 
        message: 'API fonctionne correctement',
        time: new Date().toISOString()
    });
});

app.get('/', (req, res) => {
    res.json({ 
        message: 'API GMAO',
        endpoints: {
            test: '/api/test',
            login: '/api/login',
            planning: '/api/planning',
            planningHebdo: '/api/planning-hebdo'
        }
    });
});

// 404
app.use('*', (req, res) => {
    res.status(404).json({ 
        success: false, 
        error: 'Route non trouvée',
        path: req.originalUrl
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('❌ Erreur serveur:', err.stack);
    res.status(500).json({
        success: false,
        error: 'Erreur serveur interne'
    });
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log('\n🚀 ==================================');
    console.log(`   ✅ Serveur démarré sur le port ${PORT}`);
    console.log(`   📍 Test: http://localhost:${PORT}/api/test`);
    console.log(`   📍 Login: http://localhost:${PORT}/api/login`);
    console.log(`   📍 Planning: http://localhost:${PORT}/api/planning`);
    console.log(`   📍 Planning Hebdo: http://localhost:${PORT}/api/planning-hebdo`);
    console.log('=================================\n');
});