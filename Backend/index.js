import app from './app.js';
import sequelize from './src/config/database.js';
import { sembrarBaseDeDatos } from './src/sql/plantar.js';

// 🔥 Cargar relaciones antes del sync
import './src/models/asociaciones.js';

async function main() {
  try {
    const init = process.argv[2];

    if (init === 'init') {
      console.log('⚠️  Modo reinicio detectado: Borrando y creando tablas...');

      // Borra todas las tablas existentes
      await sequelize.drop();
      console.log('🗑 Tablas eliminadas.');

      // Crea la estructura vacía
      await sequelize.sync({ force: true });
      console.log('✅ Tablas recreadas.');

      // Insertar datos iniciales
      await sembrarBaseDeDatos();
      console.log('🌱 Base de datos sembrada.');
    } else {
      console.log('🔄 Modo normal: Sincronizando sin borrar datos...');
      try {
        await sequelize.sync({ alter: true }); // solo ajusta columnas
        console.log('✅ Base de datos lista.');
      } catch (dbError) {
        console.error('❌ Error al sincronizar base de datos (posiblemente credenciales o red):', dbError.message);
        console.log('⚠️ El servidor iniciará, pero las consultas a la BD fallarán.');
      }
    }

    const port = 3005;
    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Error fatal al iniciar:', error);
  }
}

main();
