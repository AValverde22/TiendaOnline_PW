import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    try {
        console.log(req.headers);
        const token = req.headers.authorization?.split(' ')[1];
        console.log(token);

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "No se envío Token de Autenticación."
            })
        }

        const decoded = jwt.verify(token, 'SeSuponeQueAquiDeberiaDeIrUnTokenXDDD');

        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token inválido o expirado."
        })
    }
}

export default authMiddleware;
