const express = require('express');
const cors = require('cors');
const Rutas = require('./vista/SuperPorteroRutas');

class Servidor {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.rutas = new Rutas();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());            // Habilita CORS
    this.app.use(express.json());    // Para interpretar JSON en las peticiones
    this.app.use(express.urlencoded({extended:true}));
  }

  routes() {
    this.app.use('/api', this.rutas.getRouter());
  }

  iniciar() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
    });
  }

}

const servidor = new Servidor();
servidor.iniciar();