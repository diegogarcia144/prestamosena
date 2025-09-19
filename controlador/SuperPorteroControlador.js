const SuperPorteroModelo = require('../modelo/SuperPorteroModelo');

class SuperPorteroControlador {
  constructor() {
    if (SuperPorteroControlador.instance) {
      return SuperPorteroControlador.instance;
    }
    SuperPorteroControlador.instance = this;
  }

  async crearFuncionario(req, res) {
    // Desestructurar alias del body
    const { t1: documento, t2: nombres, t3: telefono, t4: correopersonal, t5: contrasena, t6: rol } = req.body;

    // Validación básica
    if (!documento || !nombres || !telefono || !correopersonal || !contrasena || !rol) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }

    try {
      const funcionario = { documento, nombres, telefono, correopersonal, contrasena, rol };
      const funcionarioGuardado = await SuperPorteroModelo.crear(funcionario);
      res.status(201).json({
        mensaje: 'Funcionario creado exitosamente.',
        funcionario: funcionarioGuardado
      });
    } catch (error) {
      console.error('❌ Error al crear funcionario:', error);
      res.status(500).json({ mensaje: 'Error al crear el funcionario.' });
    }
  }
}

module.exports = new SuperPorteroControlador();