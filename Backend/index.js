import app from './app.js';
import sequelize from './src/config/database.js';
import './src/models/asociaciones.js';

// === 1. IMPORTAR TU FUNCIÓN PLANTAR ===
// Ajusta la ruta dependiendo de dónde guardaste plantar.js
import { sembrarBaseDeDatos } from './src/sql/plantar.js';

async function main() {
    try {
        const init = process.argv[2];

        if (init === 'init') {
            console.log('⚠️ Modo reinicio detectado...');

            // Borra y crea tablas
            await sequelize.sync({ force: true });

            // === 2. EJECUTAR EL SEEDING ===
            await sembrarBaseDeDatos();

        } else {
            await sequelize.sync({ force: false });
        }

        console.log('✅ Base de datos sincronizada con PostgreSQL 18!');

        const port = 3005;
        app.listen(port, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
        });
    } catch (error) {
        console.error('❌ Error al iniciar la aplicación:', error);
    }
}

main();