import Usuario from './usuario.js';
import Carrito from './carrito.js';
import ItemCarrito from './itemCarrito.js';
import ItemDeLaOrden from './itemDeLaOrden.js';
import Orden from './orden.js';
import Producto from './producto.js';
import Categoria from './categoria.js';
import Serie from './serie.js'; // nombre exacto del archivo

console.log("Cargando asociaciones...");

// -----------------------------------------------------------------------------
// 1. Relaciones de USUARIO
// -----------------------------------------------------------------------------
Usuario.hasOne(Carrito, { foreignKey: 'idUsuario', as: 'carrito' });
Carrito.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuario' });

Usuario.hasMany(Orden, { foreignKey: 'idUsuario', as: 'ordenes' });
Orden.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuarioOrden' }); // alias único

// -----------------------------------------------------------------------------
// 2. Relaciones de CARRITO
// -----------------------------------------------------------------------------
Carrito.hasMany(ItemCarrito, { foreignKey: 'idCarrito', as: 'items' });
ItemCarrito.belongsTo(Carrito, { foreignKey: 'idCarrito', as: 'carritoPadre' });

// -----------------------------------------------------------------------------
// 3. Relaciones de ORDEN
// -----------------------------------------------------------------------------
Orden.hasMany(ItemDeLaOrden, { foreignKey: 'idOrden', as: 'detalles' });
ItemDeLaOrden.belongsTo(Orden, { foreignKey: 'idOrden', as: 'ordenPadre' });

// -----------------------------------------------------------------------------
// 4. Relaciones de PRODUCTO
// -----------------------------------------------------------------------------
Categoria.hasMany(Producto, { foreignKey: 'idCategoria', as: 'productos' });
Producto.belongsTo(Categoria, { foreignKey: 'idCategoria', as: 'categoriaProducto' });

Serie.hasMany(Producto, { foreignKey: 'idSerie', as: 'productosSerie' });
Producto.belongsTo(Serie, { foreignKey: 'idSerie', as: 'serieProducto' });

Producto.hasMany(ItemCarrito, { foreignKey: 'idProducto', as: 'itemsEnCarritos' });
ItemCarrito.belongsTo(Producto, { foreignKey: 'idProducto', as: 'productoCarrito' });

Producto.hasMany(ItemDeLaOrden, { foreignKey: 'idProducto', as: 'itemsVendidos' });
ItemDeLaOrden.belongsTo(Producto, { foreignKey: 'idProducto', as: 'producto' });

// -----------------------------------------------------------------------------
// Exportación Unificada
// -----------------------------------------------------------------------------
export {
    Usuario,
    Carrito,
    ItemCarrito,
    Orden,
    ItemDeLaOrden,
    Producto,
    Categoria,
    Serie
};
