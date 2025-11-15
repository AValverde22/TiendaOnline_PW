let usuariosDefault = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    nombre: "Pepa",
    apellido: "",
    correo: "admincorreo",
    rol: "admin",
    estado: "activo",
    ordenes: [],
    direccion: "Avenida Principal 100, Ciudad, País",
    telefono: "111-111-1111",
    distrito: "Centro"
  },
  {
    id: 2,
    username: "usuario",
    password: "usuario123",
    nombre: "Paquito",
    apellido: "perez",
    correo: "correo@example.com",
    rol: "user",
    estado: "inactivo",
    img: "https://ih1.redbubble.net/image.2758100916.0157/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
    ordenes: [
      {
        id: 1,
        fecha: "2025-10-11",
        estado: "entregado",
        productos: [
          { id: 1, nombre: "Mario Kart", categoria: "Videojuegos", cantidad: 2, total: 199.98 },
          { id: 3, nombre: "2K26", categoria: "Periféricos", cantidad: 1, total: 59.99 },
          { id: 5, nombre: "Camiseta Gamer", categoria: "Ropa", cantidad: 3, total: 44.97 },
          { id: 7, nombre: "Ratón Inalámbrico", categoria: "Periféricos", cantidad: 1, total: 29.99 },
          { id: 9, nombre: "Teclado Mecánico", categoria: "Periféricos", cantidad: 1, total: 89.99 },
          { id: 11, nombre: "Figura de Acción", categoria: "Merch", cantidad: 2, total: 39.98 }
        ]
      }
    ],
    direccion: "Calle Gamer 45, Ciudad, País",
    telefono: "222-222-2222",
    distrito: "Norte"
  },
  {
    id: 3,
    username: "atorres",
    password: "ana_password",
    nombre: "Ana",
    apellido: "Torres",
    correo: "ana.torres@example.com",
    rol: "user",
    estado: "activo",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY2NtTuw1D3MOzFYXaAYHrwb_tlrIjOv-zWw&s",
    ordenes: [],
    direccion: "Calle Las Flores 12, Ciudad, País",
    telefono: "333-333-3333",
    distrito: "Sur"
  },
  {
    id: 4,
    username: "cruiz",
    password: "carlos456",
    nombre: "Carlos",
    apellido: "Ruiz",
    correo: "carlos.ruiz@example.com",
    rol: "user",
    estado: "inactivo",
    img: "",
    ordenes: [
      {
        id: 1,
        fecha: "2025-09-21",
        estado: "entregado",
        productos: [
          { id: 2, nombre: "The Last of Us Part II", categoria: "Videojuegos", cantidad: 1, total: 69.99 },
          { id: 8, nombre: "Headset Gamer HyperX", categoria: "Periféricos", cantidad: 1, total: 79.99 }
        ]
      }
    ],
    direccion: "Av. Tecnológica 88, Ciudad, País",
    telefono: "444-444-4444",
    distrito: "Este"
  },
  {
    id: 5,
    username: "scastro",
    password: "sofia_secret",
    nombre: "Sofia",
    apellido: "Castro",
    correo: "sofia.castro@example.com",
    rol: "user",
    estado: "inactivo",
    img: "",
    ordenes: [
      {
        id: 1,
        fecha: "2025-10-01",
        estado: "por entregar",
        productos: [
          { id: 6, nombre: "Sudadera Apex Legends", categoria: "Ropa", cantidad: 1, total: 39.99 }
        ]
      }
    ],
    direccion: "Calle Gameras 21, Ciudad, País",
    telefono: "555-555-5555",
    distrito: "Oeste"
  },
  {
    id: 6,
    username: "jmorales",
    password: "javier123",
    nombre: "Javier",
    apellido: "Morales",
    correo: "javier.morales@example.com",
    rol: "user",
    estado: "activo",
    img: "",
    ordenes: [],
    direccion: "Pasaje Morales 7, Ciudad, País",
    telefono: "666-666-6666",
    distrito: "Centro"
  },
  {
    id: 7,
    username: "vdiaz",
    password: "vale_pass",
    nombre: "Valentina",
    apellido: "Diaz",
    correo: "valentina.diaz@example.com",
    rol: "user",
    estado: "activo",
    img: "",
    ordenes: [
      {
        id: 1,
        fecha: "2025-08-15",
        estado: "entregado",
        productos: [
          { id: 10, nombre: "Control DualSense PS5", categoria: "Periféricos", cantidad: 1, total: 69.99 }
        ]
      },
      {
        id: 2,
        fecha: "2025-10-05",
        estado: "por entregar",
        productos: [
          { id: 12, nombre: "Funko Pop! de Kratos", categoria: "Merch", cantidad: 2, total: 29.98 }
        ]
      }
    ],
    direccion: "Calle Juegos 32, Ciudad, País",
    telefono: "777-777-7777",
    distrito: "Sur"
  },
  {
    id: 8,
    username: "mromero",
    password: "martin_romero",
    nombre: "Martin",
    apellido: "Romero",
    correo: "martin.romero@example.com",
    rol: "user",
    estado: "activo",
    img: "",
    ordenes: [],
    direccion: "Avenida Pixel 55, Ciudad, País",
    telefono: "888-888-8888",
    distrito: "Este"
  },
  {
    id: 9,
    username: "lguzman",
    password: "lucia_g",
    nombre: "Lucia",
    apellido: "Guzman",
    correo: "lucia.guzman@example.com",
    rol: "user",
    estado: "activo",
    img: "",
    ordenes: [
      {
        id: 1,
        fecha: "2025-09-30",
        estado: "entregado",
        productos: [
          { id: 4, nombre: "Silla Gamer Ergonómica", categoria: "Muebles", cantidad: 1, total: 249.99 },
          { id: 7, nombre: "Ratón Inalámbrico", categoria: "Periféricos", cantidad: 1, total: 29.99 }
        ]
      }
    ],
    direccion: "Boulevard Gamer 19, Ciudad, País",
    telefono: "999-999-9999",
    distrito: "Norte"
  },
  {
    id: 10,
    username: "dvega",
    password: "vega_daniel",
    nombre: "Daniel",
    apellido: "Vega",
    correo: "daniel.vega@example.com",
    rol: "user",
    estado: "activo",
    img: "",
    ordenes: [],
    direccion: "Calle Falsa 123, Ciudad, País",
    telefono: "123-456-7890",
    distrito: "Centro"
  },
  {
    id: 11,
    username: "cflores",
    password: "camila_flores_1",
    nombre: "Camila",
    apellido: "Flores",
    correo: "camila.flores@example.com",
    rol: "user",
    estado: "inactivo",
    img: "",
    ordenes: [
      {
        id: 1,
        fecha: "2025-10-12",
        estado: "entregado",
        productos: [
          { id: 13, nombre: "Monitor Curvo 27 pulgadas", categoria: "Periféricos", cantidad: 1, total: 329.99 },
          { id: 9, nombre: "Teclado Mecánico", categoria: "Periféricos", cantidad: 1, total: 89.99 },
          { id: 14, nombre: "Póster de Zelda", categoria: "Merch", cantidad: 3, total: 35.97 }
        ]
      }
    ],
    direccion: "Calle PixelArte 11, Ciudad, País",
    telefono: "321-654-0987",
    distrito: "Centro"
  },
  {
    id: 12,
    username: "msoto",
    password: "mateo_soto_pass",
    nombre: "Mateo",
    apellido: "Soto",
    correo: "mateo.soto@example.com",
    rol: "user",
    estado: "inactivo",
    img: "",
    ordenes: [],
    direccion: "Av. Juegos 404, Ciudad, País",
    telefono: "101-202-3030",
    distrito: "Sur"
  }
];
// --- PASO 1: FUNCIÓN DE CARGA INICIAL ---
// Esta función decide qué datos usar al principio.
const loadUsuariosFromStorage = () => {
    try {
        const stored = localStorage.getItem('tiendaPW_usuarios');
        // Si hay algo guardado, úsalo.
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Error al cargar usuarios desde LocalStorage:', error);
    }
    // Si no hay nada guardado o hay un error, usa los usuarios por defecto.
    console.log('Usando usuarios por defecto');
    return usuariosDefault;
};
    

// Inicializar usuarios desde LocalStorage
let usuarios = loadUsuariosFromStorage();
    
// Función para guardar los cambios en localStorage
const saveUsuariosToStorage = (usuariosArray) => {
    try {
        localStorage.setItem('tiendaPW_usuarios', JSON.stringify(usuariosArray));
    } catch (error) {
        console.error('Error al guardar usuarios en LocalStorage:', error);
    }
};

const get = () => [...usuarios];
    
// Modificar un usuario (por posición en el array)
const modify = (newUser, pos) => {
      usuarios[pos] = { ...usuarios[pos], ...newUser };
      saveUsuariosToStorage(usuarios);
};
        
// Agregar un nuevo usuario
const insertNewUser = (usuario) => {
      usuario.id = usuariosDefault.length++;
      usuariosDefault.push(usuario);
    }
    
const add = (userData) => {
      // Validar que los campos requeridos estén presentes
      if (!userData || !userData.username || !userData.password || !userData.correo) {
        throw new Error('Username, password y correo son campos requeridos');
      }
    
      // Verificar que el username no esté duplicado
      const existingUser = usuarios.find(u => u.username === userData.username);
      if (existingUser) {
        throw new Error('El nombre de usuario ya existe');
      }

      // Verificar que el correo no esté duplicado
      const existingEmail = usuarios.find(u => u.correo === userData.correo);
      if (existingEmail) {
        throw new Error('El correo electrónico ya está registrado');
      }
    
      // Generar un nuevo ID único (seguro si el array está vacío)
      const newId = usuarios.length ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    
      // Crear el nuevo usuario con valores por defecto
      const newUser = {
        id: newId,
        username: userData.username,
        password: userData.password,
        nombre: userData.nombre || "",
        apellido: userData.apellido || "",
        correo: userData.correo,
        rol: userData.rol || "user", // Por defecto es usuario normal
        ordenes: userData.ordenes ? [...userData.ordenes] : []
      };
    
      // Agregar el usuario al array
      usuarios.push(newUser);
    
      // Guardar en LocalStorage
      saveUsuariosToStorage(usuarios);
    
      return newUser; // Retornar el usuario creado
};
    
    // Buscar un usuario por username
    const findByUsername = (username) => usuarios.find(u => u.username === username);
    
    // Buscar un usuario por correo
    const findByEmail = (correo) => usuarios.find(u => u.correo === correo);
    
    // Buscar un usuario por ID
    const findById = (id) => usuarios.find(u => u.id === id);
    
    // Eliminar un usuario
    const deleteUser = (userId) => {
      const userIndex = usuarios.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        usuarios.splice(userIndex, 1);
        saveUsuariosToStorage(usuarios);
        return true;
      }
      return false;
    };
    
    // Función para ver todos los usuarios (solo para depuración)
    const debugGetAll = () => {
      console.log('=== USUARIOS ACTUALES ===');
      console.log(usuarios);
      console.log('Total de usuarios:', usuarios.length);
      return usuarios;
    };
    
    // Funciones adicionales de LocalStorage / utilidades
    const clearStorage = () => {
      localStorage.removeItem('tiendaPW_usuarios');
      usuarios = usuariosDefault.map(u => ({ ...u, ordenes: u.ordenes ? [...u.ordenes] : [] }));
      saveUsuariosToStorage(usuarios);
      console.log('LocalStorage limpiado y usuarios restaurados a valores por defecto');
    };
    
    const resetToDefaults = () => {
      usuarios = usuariosDefault.map(u => ({ ...u, ordenes: u.ordenes ? [...u.ordenes] : [] }));
      saveUsuariosToStorage(usuarios);
      console.log('Usuarios restaurados a valores por defecto');
    };
    
    const getStorageInfo = () => {
      const stored = localStorage.getItem('tiendaPW_usuarios');
      return {
        hasData: !!stored,
        size: stored ? stored.length : 0,
        userCount: usuarios.length
      };
    };
    
    const getLastOrder = (ID) => {
      const user2 = usuarios.filter((u) => u.id == ID);
      return user2[0].ordenes[user2[0].ordenes.length - 1];

    };
    
    const deleteLastOrder = (ID) => {
      usuariosDefault.find((u) => u.id == ID).ordenes.pop();
    };

    //Funcion para calcular monto total de un usuario de todas sus ordenes
const getTotalSpent = (ID) => {
  const user = usuarios.find(u => u.id === ID);
  if (!user || !user.ordenes) return 0;

  let total = 0;

  for (let i = 0; i < user.ordenes.length; i++) {
    const orden = user.ordenes[i];
    for (let j = 0; j < orden.productos.length; j++) {
      total += orden.productos[j].total;
    }
  }

  return total;
};

    // =====================
    // Export: API pública
    // =====================
    const usuariosApi = {
      get,
      modify,
      add,
      findByUsername,
      findByEmail,
      findById,
      deleteUser,
      debugGetAll,
      clearStorage,
      resetToDefaults,
      getStorageInfo,
      getLastOrder,
      deleteLastOrder,
      insertNewUser,
      getTotalSpent
    };
    
    export default usuariosApi;
    
    /* =========================
      OPCIONAL: utilidades de órdenes
      =========================
      (Comentadas: es mejor moverlas a `ordersApi.js` si decides usarlas)
      
    // const addOrder = (userId, order) => {
    //   const user = usuarios.find(u => u.id === userId);
    //   if (!user) return false;
    //   order.id = user.ordenes.length ? Math.max(...user.ordenes.map(o => o.id)) + 1 : 1;
    //   user.ordenes.push(order);
    //   saveUsuariosToStorage(usuarios);
    //   return true;
    // };
    
    // const deleteOrder = (userId, orderId) => {
    //   const user = usuarios.find(u => u.id === userId);
    //   if (!user) return false;
    //   user.ordenes = user.ordenes.filter(o => o.id !== orderId);
    //   saveUsuariosToStorage(usuarios);
    //   return true;
    // };
    
    // const getOrders = (userId) => {
    //   const user = usuarios.find(u => u.id === userId);
    //   return user ? [...user.ordenes] : null;
    // };
    */
    