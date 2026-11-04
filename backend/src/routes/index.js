const { Router } = require('express');

const router = Router();

// Aquí se irán montando los módulos del sistema
// Ejemplo: router.use('/estudiantes', require('./estudiantes.routes'));

router.get('/', (req, res) => {
  res.json({
    message: 'API Sistema de Matrícula v1.0',
    endpoints: ['/health'],
  });
});

module.exports = router;

