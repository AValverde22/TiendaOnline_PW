import Usuario from './usuario.js';
import Carrito from './Carrito.js';
import ItemCarrito from './itemCarrito.js';      // Variable con 'I' mayúscula
import ItemDeLaOrden from './itemDeLaOrden.js';  // Variable con 'I' mayúscula
import Orden from './Orden.js';
import Producto from './producto.js';
import Categoria from './categoria.js';
import Serie from './Serie.js';

console.log("Cargando asociaciones...");

// -----------------------------------------------------------------------------
// 1. Relaciones de USUARIO
// -----------------------------------------------------------------------------

// 1 Usuario <-> 1 Carrito
Usuario.hasOne(Carrito, { foreignKey: 'idUsuario', as: 'carrito' });
Carrito.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuario' });

// 1 Usuario <-> N Órdenes
Usuario.hasMany(Orden, { foreignKey: 'idUsuario', as: 'ordenes' });
Orden.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuario' });

// -----------------------------------------------------------------------------
// 2. Relaciones de CARRITO
// -----------------------------------------------------------------------------

// 1 Carrito <-> N Items
// CORREGIDO: itemCarrito -> ItemCarrito
Carrito.hasMany(ItemCarrito, { foreignKey: 'idCarrito', as: 'items' });
ItemCarrito.belongsTo(Carrito, { foreignKey: 'idCarrito', as: 'carrito' });

// -----------------------------------------------------------------------------
// 3. Relaciones de ORDEN
// -----------------------------------------------------------------------------

// 1 Orden <-> N Detalles (Items)
// CORREGIDO: itemDeLaOrden -> ItemDeLaOrden
Orden.hasMany(ItemDeLaOrden, { foreignKey: 'idOrden', as: 'detalles' });
ItemDeLaOrden.belongsTo(Orden, { foreignKey: 'idOrden', as: 'orden' });

// -----------------------------------------------------------------------------
// 4. Relaciones de PRODUCTO
// -----------------------------------------------------------------------------

// Categoría <-> Producto
Categoria.hasMany(Producto, { foreignKey: 'idCategoria', as: 'productos' });
Producto.belongsTo(Categoria, { foreignKey: 'idCategoria', as: 'categoria' });

// Serie <-> Producto
Serie.hasMany(Producto, { foreignKey: 'idSerie', as: 'productos' });
Producto.belongsTo(Serie, { foreignKey: 'idSerie', as: 'serie' });

// Producto <-> Items del Carrito
// CORREGIDO: itemCarrito -> ItemCarrito
Producto.hasMany(ItemCarrito, { foreignKey: 'idProducto', as: 'itemsEnCarritos' });
ItemCarrito.belongsTo(Producto, { foreignKey: 'idProducto', as: 'producto' });

// Producto <-> Items de la Orden
// CORREGIDO: itemDeLaOrden -> ItemDeLaOrden
Producto.hasMany(ItemDeLaOrden, { foreignKey: 'idProducto', as: 'itemsVendidos' });
ItemDeLaOrden.belongsTo(Producto, { foreignKey: 'idProducto', as: 'producto' });

// -----------------------------------------------------------------------------
// Exportación Unificada
// -----------------------------------------------------------------------------
export {
    Usuario,
    Carrito,
    ItemCarrito,     // CORREGIDO (Mayúscula)
    Orden,
    ItemDeLaOrden,   // CORREGIDO (Mayúscula)
    Producto,
    Categoria,
    Serie
};