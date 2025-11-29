import Usuario from './usuario.js';
import Orden from './orden.js';
import Producto from './producto.js';
import DetalleOrden from './detalleOrden.js';
import Categoria from './categoria.js';
import Serie from './serie.js';

// --- USUARIO <-> ORDEN ---
Usuario.hasMany(Orden, { foreignKey: 'usuarioId', as: 'ordenes' });
Orden.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

// --- PRODUCTO <-> DETALLE ---
Producto.hasMany(DetalleOrden, { foreignKey: 'productoId' });
DetalleOrden.belongsTo(Producto, { foreignKey: 'productoId', as: 'producto' });

// --- CATEGORÍA <-> PRODUCTO ---
Categoria.hasMany(Producto, { foreignKey: 'categoriaId', as: 'productos' });
Producto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });

// --- SERIE <-> PRODUCTO ---
Serie.hasMany(Producto, { foreignKey: 'serieId', as: 'productos' });
Producto.belongsTo(Serie, { foreignKey: 'serieId', as: 'serie' });

// --- ORDEN <-> DETALLE ---
Orden.hasMany(DetalleOrden, { foreignKey: 'ordenId', as: 'detalles' });
DetalleOrden.belongsTo(Orden, { foreignKey: 'ordenId', as: 'orden' });

export { Usuario, Orden, Producto, DetalleOrden, Categoria, Serie };