import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from '#config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sembrarBaseDeDatos = async () => {
    try {
        console.log('🌱 Iniciando proceso de Seeding SQL...');

        // Si ambos archivos están en la misma carpeta 'src/sql', esto es más directo:
        const rutaSQL = path.join(__dirname, 'inserts.sql');

        if (!fs.existsSync(rutaSQL)) {
            console.error(`❌ No se encontró el archivo SQL en: ${rutaSQL}`);
            return;
        }

        const sql = fs.readFileSync(rutaSQL, 'utf8');

        // MEJORA: Separar por punto y coma para ejecutar sentencia por sentencia
        // Esto evita errores si el driver de Postgres no acepta scripts masivos de una sola vez
        const sentencias = sql
            .split(/;(?=(?:[^']*'[^']*')*[^']*$)/) // Regex para ignorar ; dentro de textos
            .map(s => s.trim())
            .filter(s => s.length > 0);

        for (const sentencia of sentencias) {
            await sequelize.query(sentencia);
        }

        console.log(`✅ Se ejecutaron ${sentencias.length} sentencias SQL correctamente.`);
    } catch (error) {
        console.error('❌ Error ejecutando el SQL:', error);
    }
};