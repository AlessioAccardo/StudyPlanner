// abilito l'uso delle variabili del file .env
require('dotenv').config();

const express = require('express');
const app = express();
const authRoutes = require('./auth/routes/authRoutes');

// Middleware che permette di ritornare json
app.use(express.json());

// routes definite nel file routes
app.use('/api/auth', authRoutes);

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
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Errore interno del server' });
});

// Avvio server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});