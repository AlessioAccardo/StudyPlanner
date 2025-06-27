// abilito l'uso delle variabili del file .env
require('dotenv').config();

const express = require('express');
const app = express();
const authRoutes = require('./auth/routes/authRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const examRoutes = require('./routes/examRoutes');
const userRoutes = require('./routes/userRoutes');
const studyPlanRoutes = require('./routes/studyPlanRoutes');

// importiamo il modulo cors per gestire le richieste cross-origin
const cors = require('cors');

app.use(cors());

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Intercetta errori del server
app.use((err, req, res, next) => {
  console.error('ERRORE INTERNO:', err.stack || err);
  res.status(500).json({
    success: false,
    message: 'Errore interno al server',
    error: err.message 
  });
});

// Middleware che permette di ritornare json
app.use(express.json());

// routes definite nel file authRoutes
app.use('/api/auth', authRoutes);

// routes definite nel file userRoutes
app.use('/api/user', userRoutes);

// router definite nel file coursesRoutes
app.use('/api/courses', coursesRoutes);

// routes definite nel file examRoutes
app.use('/api/exam', examRoutes);

// routes definite nel file studyPlanRoutes
app.use('/api/studyPlan', studyPlanRoutes);

// Avvio server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});