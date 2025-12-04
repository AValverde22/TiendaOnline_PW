import sequelize from './config/database.js';
import { sembrarBaseDeDatos } from './sql/plantar.js';
import './models/asociaciones.js';

async function init() {
    try {
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

        process.exit(0);
    } catch (error) {
        console.error('❌ Error fatal al iniciar:', error);
        process.exit(1);
    }
}

init();
