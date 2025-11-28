import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from '../config/database.js'; // Ajusta los puntos '..' si cambias de carpeta

// Configuración de __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sembrarBaseDeDatos = async () => {
    try {
        console.log('🌱 Iniciando proceso de Seeding SQL...');

        // === CORRECCIÓN DE LA RUTA ===
        // __dirname es la carpeta donde está este archivo (ej: src/utils)
        // '..' significa subir un nivel (a src/)
        // 'sql' entra a la carpeta sql
        // 'inserts.sql' es el archivo
        const rutaSQL = path.join(__dirname, '../sql/inserts.sql');

        // Verificamos que el archivo exista antes de leerlo para evitar crash
        if (!fs.existsSync(rutaSQL)) {
            console.error(`❌ No se encontró el archivo SQL en: ${rutaSQL}`);
            return;
        }

        // Leer el archivo
        const sql = fs.readFileSync(rutaSQL, 'utf8');

        // Ejecutar el SQL crudo
        await sequelize.query(sql);

        console.log('✅ Datos insertados desde SQL correctamente.');
    } catch (error) {
        console.error('❌ Error ejecutando el SQL:', error);
    }
};