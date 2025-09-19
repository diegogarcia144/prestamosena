const express = require('express');
const SuperPorteroControlador = require('../controlador/SuperPorteroControlador');

class Rutas {
  constructor() {
    this.router = express.Router();
    this.controlador = SuperPorteroControlador;
    this.configurarRutas();
  }

  configurarRutas() {
    // Ruta para crear un nuevo funcionario
    this.router.post('/funcionarios', (req, res) => this.controlador.crearFuncionario(req, res));
  }

  getRouter() {
    return this.router;
  }
}

module.exports = Rutas;