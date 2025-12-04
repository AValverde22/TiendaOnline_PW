import { Orden, ItemDeLaOrden, Producto } from '#models/asociaciones.js';
import RepositoryBase from './RepositoryBase.js';
import sequelize from '#config/database.js';

const repository = new RepositoryBase(Orden);

/**
 * Crea una orden y sus items en una única transacción.
 * payload debe contener: usuarioId, total, subtotal (opcional), direccion_envio (opcional), metodo_pago (opcional), items: [{ productoId, cantidad, precioUnitario }]
 */
repository.createFullOrder = async function (payload) {
    const t = await sequelize.transaction();
    try {
        const {
            usuarioId,
            total,
            subtotal = null,
            direccion_envio = null,
            metodo_pago = null,
            nro_tarjeta_mask = null,
            items = []
        } = payload;

        // 1) Crear la orden
        const nuevaOrden = await Orden.create({
            idUsuario: usuarioId,
            total,
            subtotal,
            direccion_envio,
            metodo_pago,
            nro_tarjeta_mask
        }, { transaction: t });

        // 2) Crear los items asociados
        for (const it of items) {
            const cantidad = Number(it.cantidad) || 1;
            const precio_unitario = Number(it.precioUnitario) || 0;
            const subtotal_item = Number((precio_unitario * cantidad).toFixed(2));

            await ItemDeLaOrden.create({
                idOrden: nuevaOrden.id,
                idProducto: it.productoId,
                cantidad,
                precio_unitario,
                subtotal: subtotal_item
            }, { transaction: t });
        }

        await t.commit();

        // 3) Devolver la orden con sus detalles
        const ordenConDetalles = await Orden.findByPk(nuevaOrden.id, {
            include: [
                {
                    model: ItemDeLaOrden,
                    as: 'detalles'
                }
            ]
        });

        return ordenConDetalles;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

export default repository;
