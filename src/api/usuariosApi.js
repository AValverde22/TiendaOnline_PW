const usuarios = [
    {
        id: 1,
        username: "admin",
        password: "admin123",
        nombre: "",
        apellido: "",
        correo: "",
        rol: "admin",
        ordenes: []
    }, 
    {
        id: 2,
        username: "usuario",
        password: "usuario123",
        nombre: "Nombre",
        apellido: "Apellido",
        correo: "correo@example.com",
        rol: "user",
        ordenes: [
            {
                id: 1,
                fecha: "2025-10-11",
                productos: [
                    { id: 1, nombre: "Mario Kart",  categoria: "Videojuegos", cantidad: 2, total: 199.98 },
                    { id: 3, nombre: "2K26", categoria: "Periféricos", cantidad: 1, total: 59.99 },
                    { id: 5, nombre: "Camiseta Gamer", categoria: "Ropa", cantidad: 3, total: 44.97 },
                    { id: 7, nombre: "Ratón Inalámbrico", categoria: "Periféricos", cantidad: 1, total: 29.99 },
                    { id: 9, nombre: "Teclado Mecánico", categoria: "Periféricos", cantidad: 1, total: 89.99 },
                    { id: 11, nombre: "Figura de Acción", categoria: "Merch", cantidad: 2, total: 39.98 }
                ]
            }
        ]
    
    }
];

//Obtener los usuarios
const get = () => usuarios;

//Modificar un usuario
const modify = (newUser, pos) => usuarios[pos] = newUser;

//Agregar una orden a un usuario
const addOrder = (userId, order) => {
    const user = usuarios.find(u => u.id === userId);
    if (user) {
        order.id = user.ordenes.length + 1; // Generar un nuevo ID para la orden
        user.ordenes.push(order);
    }
};

//Eliminar una orden de un usuario
const deleteOrder = (userId, orderId) => {
    const user = usuarios.find(u => u.id === userId);
    if (user) {
        user.ordenes = user.ordenes.filter(order => order.id !== orderId);
    }
};

//Obtener las órdenes de un usuario
const getOrders = (userId) => {
    const user = usuarios.find(u => u.id === userId);
    return user ? user.ordenes : null;
};

const usuariosApi = { get, modify, addOrder, getOrders, deleteOrder };

export default usuariosApi;