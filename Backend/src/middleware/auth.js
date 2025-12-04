import jwt from 'jsonwebtoken';

const SECRET_KEY = "SUPER_CLAVE_123";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.status(401).json({ message: "No token" });

        // Verificamos con la clave manual
        const decoded = jwt.verify(token, SECRET_KEY);

        req.usuario = decoded;
        next();
    } catch (error) {
        console.log("Error Auth:", error.message); // Veremos si falla
        return res.status(401).json({ success: false, message: "Token inválido." });
    }
};

const verifyAdmin = (req, res, next) => {
    if (!req.usuario) {
        return res.status(401).json({ success: false, message: "Acceso denegado." });
    }
    if (req.usuario.rol !== 'ADMIN') {
        return res.status(403).json({ success: false, message: "Se requieren permisos de administrador." });
    }
    next();
};

export { authMiddleware, verifyAdmin };
export default authMiddleware;