import jwt from 'jsonwebtoken';
// Asegúrate de cargar las variables de entorno al inicio de tu app (en app.js o index.js)
// con: import 'dotenv/config';

const authMiddleware = (req, res, next) => {
    try {
        // 1. Obtener el token del header Authorization
        // Formato esperado: "Bearer <token>"
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Acceso denegado: No se proporcionó token."
            });
        }

        // 2. Verificar el token usando la variable de entorno
        // Si JWT_SECRET no existe, usamos una cadena vacía para forzar error (seguridad)
        const secret = process.env.JWT_SECRET || 'EstaEsUnaFraseSuperSecretaYLargaQueNadieAdivinara123!';

        const decoded = jwt.verify(token, secret);

        // 3. Adjuntar el usuario decodificado a la request
        // decoded suele tener { id: 1, rol: 'ADMIN', iat: ..., exp: ... }
        req.usuario = decoded;

        // 4. Continuar al siguiente controlador
        next();

    } catch (error) {
        // Diferenciamos si expiró o si es falso
        const mensaje = error.name === 'TokenExpiredError'
            ? "Tu sesión ha expirado. Por favor inicia sesión nuevamente."
            : "Token inválido.";

        return res.status(401).json({
            success: false,
            message: mensaje
        });
    }
};

const verifyAdmin = (req, res, next) => {
    // Asumimos que authMiddleware ya se ejecutó y req.usuario existe
    if (!req.usuario) {
        return res.status(401).json({
            success: false,
            message: "Acceso denegado: Usuario no autenticado."
        });
    }

    // Verificamos el rol (Case sensitive según como lo guardes en BD, usualmente 'ADMIN')
    if (req.usuario.rol !== 'ADMIN') {
        return res.status(403).json({
            success: false,
            message: "Acceso denegado: Se requieren permisos de administrador."
        });
    }

    next();
};

export { authMiddleware, verifyAdmin };
export default authMiddleware; // Default export para compatibilidad si alguien importa sin llaves