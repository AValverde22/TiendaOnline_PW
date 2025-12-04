class RepositoryBase {
    constructor(model) {
        this.model = model;
    }

    async findAll(options = {}) {
        try {
            return await this.model.findAll(options);
        } catch (error) {
            console.error('Error en findAll:', error);
            return null;
        }
    }

    async create(entity) {
        try {
            return await this.model.create(entity);
        } catch (error) {
            console.error('Error en create:', error);
            return null;
        }
    }

    // CORREGIDO: Renombrado a findById para evitar conflicto
    async findById(id, options = {}) {
        try {
            return await this.model.findByPk(id, options); // findByPk es más eficiente en Sequelize
        } catch (error) {
            console.error('Error en findById:', error);
            return null;
        }
    }

    // CORREGIDO: Renombrado a update. Necesita recibir ID y DATOS separados.
    async update(id, entity) {
        try {
            // Sequelize update retorna un array: [numeroFilasAfectadas]
            const [rowsUpdated] = await this.model.update(entity, {
                where: { id: id }
            });

            if (rowsUpdated > 0) {
                return await this.findById(id); // Retornamos el objeto actualizado
            }
            return null;
        } catch (error) {
            console.error('Error en update:', error);
            return null;
        }
    }

    // CORREGIDO: Renombrado a delete (o remove)
    async remove(id) {
        try {
            const result = await this.model.destroy({
                where: { id: id }
            });
            return result > 0; // Retorna true si borró algo
        } catch (error) {
            console.error('Error en delete:', error);
            return null;
        }
    }
}

export default RepositoryBase;