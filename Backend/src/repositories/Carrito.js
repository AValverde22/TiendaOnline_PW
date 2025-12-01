import model from '../models/Carrito.js'
import RepositoryBase from './RepositoryBase.js'

class CarritoRepository extends RepositoryBase {
    constructor() {
        super(model);
    }

    // Obtener carrito por ID de usuario
    async findByUserId(userId) {
        try {
            return await this.model.findOne({
                where: { userId },
            });
        } catch (error) {
            console.error("Error en findByUserId:", error);
            return null;
        }
    }

    // Vaciar los items del carrito
    //De repente es inncesario, analizar despues ya tengo sueño
    async clearCarrito(idCarrito) {
        try {
            const deleted = await ItemCarrito.destroy({
                where: { idCarrito }
            });
            return deleted > 0;
        } catch (error) {
            console.error("Error en clearCarrito:", error);
            return null;
        }
    }
}

const repository = new CarritoRepository();
export default repository;



