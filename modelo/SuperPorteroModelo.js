const Conexion = require('./bd/Conexion');


class SuperPorteroModelo {
  constructor() {
    if (SuperPorteroModelo.instance) {
      return SuperPorteroModelo.instance;
    }

    this.db = Conexion;
    SuperPorteroModelo.instance = this;
  }

  /**
   * Crea un nuevo usuario en la base de datos
   */
  async crear(funcionario) {
    const {
      documento,
      nombres,
      telefono,
      correopersonal,
      contrasena,
      rol,
    } = funcionario;

    const query = `
      INSERT INTO funcionarios (documento, nombres, telefono, correopersonal, contrasena, rol)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      documento, nombres, telefono, correopersonal, contrasena, rol
    ];

    try {
      const result = await this.db.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('❌ Error al crear el funcionario:', err.message);
      throw err;
    }
  }
}

// Exportamos la instancia única (Singleton)
module.exports = new SuperPorteroModelo();