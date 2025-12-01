// index.js (En la raíz)
import app from './app.js'; // Asumo que app.js está en la raíz o ajusta la ruta
import sequelize from './src/config/database.js';
import { sembrarBaseDeDatos } from './src/sql/plantar.js';

// 🔥 IMPORTANTE: Cargar relaciones antes del sync para que se creen las FK
import './src/models/asociaciones.js';

async function main() {
    try {
        const init = process.argv[2];

        if (init === 'init') {
            console.log('⚠️  Modo reinicio detectado: Borrando y creando tablas...');

            // 1. Sincronizar (Borra tablas y crea estructura vacía)
            await sequelize.sync({ force: true });
            console.log('✅ Tablas recreadas.');

            // 2. Insertar datos (SQL)
            await sembrarBaseDeDatos();

        } else {
            console.log('🔄 Modo normal: Sincronizando sin borrar datos...');
            // alter: true es mejor que force: false porque actualiza columnas si cambiaste algo leve
            await sequelize.sync({ force: false, alter: false });
        }

        console.log('✅ Base de datos lista.');

        const port = 3005;
        app.listen(port, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
        });
    } catch (error) {
        console.error('❌ Error fatal al iniciar:', error);
    }
}

main();