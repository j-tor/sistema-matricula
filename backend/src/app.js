const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/database');

const app = express();

// --- Middlewares ---
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Rutas ---
app.use('/api', require('./routes'));

// --- Health check ---
app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: 'ok', db: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', db: 'disconnected', message: err.message });
  }
});

// --- Manejador de rutas no encontradas ---
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// --- Manejador global de errores ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;

