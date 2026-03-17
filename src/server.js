import mongoose from 'mongoose';
import app from './app.js';
import { config } from './config/config.js';

const startServer = async () => {
  try {
    await mongoose.connect(config.mongo.url);
    console.log('✅ Conectado a MongoDB');

    app.listen(config.server.port, () => {
      console.log(`✅ Servidor escuchando en puerto ${config.server.port}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
  }
};

startServer();