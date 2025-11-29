import Usuario from './usuario.js';
import Orden from './orden.js';
import Producto from './producto.js';
import DetalleOrden from './detalleOrden.js';
import Categoria from './categoria.js';
import Serie from './serie.js';

// --- Usuario y Orden ---
// Un usuario tiene muchas ordenes
Usuario.hasMany(Orden, { foreignKey: 'usuarioId', as: 'ordenes' });
// Una orden pertenece a un usuario
Orden.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

// --- Producto y Detalle ---
Producto.hasMany(DetalleOrden, { foreignKey: 'productoId' });
DetalleOrden.belongsTo(Producto, { foreignKey: 'productoId', as: 'producto' });

// --- CATEGORÍA <-> PRODUCTO ---
// Una categoría tiene muchos productos
Categoria.hasMany(Producto, { foreignKey: 'categoriaId', as: 'productos' });

// Un producto pertenece a una categoría
Producto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });

// Relación: Una Serie tiene muchos Productos
Serie.hasMany(Producto, { foreignKey: 'serieId', as: 'productos' });
Producto.belongsTo(Serie, { foreignKey: 'serieId', as: 'serie' });

// Relación: Una Orden tiene muchos Detalles
Orden.hasMany(DetalleOrden, { foreignKey: 'ordenId', as: 'detalles' });
DetalleOrden.belongsTo(Orden, { foreignKey: 'ordenId', as: 'orden' });

export { Usuario, Orden, Producto, DetalleOrden, Categoria, Serie };