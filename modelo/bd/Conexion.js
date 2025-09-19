const { Pool } = require('pg');
const Config = require('./Config');

class Conexion {
  constructor() {
    if (Conexion.instance) {
      return Conexion.instance; // Devuelve la instancia existente si ya fue creada
    }

    // Configuración de la conexión a PostgreSQL
    this.pool = new Pool({
      host: Config.DB_HOST,
      user: Config.DB_USER,
      password: Config.DB_PASSWORD,
      database: Config.DB_NAME,
      port: Config.DB_PORT,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    });

    // Probar conexión al iniciar
    this.pool.connect()
      .then(client => {
        console.log('✅ Conexión a PostgreSQL exitosa');
        client.release();
      })
      .catch(err => {
        console.error('❌ Error al conectar a PostgreSQL:', err.message);
      });

    // Asignamos la instancia única
    Conexion.instance = this;
  }

  // Método para ejecutar una consulta
  query(text, params) {
    return this.pool.query(text, params);
  }
}

// Exportamos la instancia Singleton de Conexion
module.exports = new Conexion();