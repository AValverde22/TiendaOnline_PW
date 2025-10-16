  let usuariosDefault = [
      {
        id: 1,
        username: "admin",
        password: "admin123",
        nombre: "Alejandra",
        apellido: "Valverde",
        correo: "admincorreo",
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
        img: "https://ih1.redbubble.net/image.2758100916.0157/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
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
      },
      {
      id: 3,
      username: "atorres",
      password: "ana_password",
      nombre: "Ana",
      apellido: "Torres",
      correo: "ana.torres@example.com",
      rol: "user",
      img: "",
      ordenes: []
    },
    {
      id: 4,
      username: "cruiz",
      password: "carlos456",
      nombre: "Carlos",
      apellido: "Ruiz",
      correo: "carlos.ruiz@example.com",
      rol: "user",
      img: "",
      ordenes: [
        {
          id: 1,
          fecha: "2025-09-21",
          productos: [
            { id: 2, nombre: "The Last of Us Part II", categoria: "Videojuegos", cantidad: 1, total: 69.99 },
            { id: 8, nombre: "Headset Gamer HyperX", categoria: "Periféricos", cantidad: 1, total: 79.99 }
          ]
        }
      ]
    },
    {
      id: 5,
      username: "scastro",
      password: "sofia_secret",
      nombre: "Sofia",
      apellido: "Castro",
      correo: "sofia.castro@example.com",
      rol: "user",
      img: "",
      ordenes: [
        {
          id: 1,
          fecha: "2025-10-01",
          productos: [
            { id: 6, nombre: "Sudadera Apex Legends", categoria: "Ropa", cantidad: 1, total: 39.99 }
          ]
        }
      ]
    },
    {
      id: 6,
      username: "jmorales",
      password: "javier123",
      nombre: "Javier",
      apellido: "Morales",
      correo: "javier.morales@example.com",
      rol: "user",
      img: "",
      ordenes: []
    },
    {
      id: 7,
      username: "vdiaz",
      password: "vale_pass",
      nombre: "Valentina",
      apellido: "Diaz",
      correo: "valentina.diaz@example.com",
      rol: "user",
      img: "",
      ordenes: [
        {
          id: 1,
          fecha: "2025-08-15",
          productos: [
            { id: 10, nombre: "Control DualSense PS5", categoria: "Periféricos", cantidad: 1, total: 69.99 }
          ]
        },
        {
          id: 2,
          fecha: "2025-10-05",
          productos: [
            { id: 12, nombre: "Funko Pop! de Kratos", categoria: "Merch", cantidad: 2, total: 29.98 }
          ]
        }
      ]
    },
    {
      id: 8,
      username: "mromero",
      password: "martin_romero",
      nombre: "Martin",
      apellido: "Romero",
      correo: "martin.romero@example.com",
      rol: "user",
      img: "",
      ordenes: []
    },
    {
      id: 9,
      username: "lguzman",
      password: "lucia_g",
      nombre: "Lucia",
      apellido: "Guzman",
      correo: "lucia.guzman@example.com",
      rol: "user",
      img: "",
      ordenes: [
        {
          id: 1,
          fecha: "2025-09-30",
          productos: [
            { id: 4, nombre: "Silla Gamer Ergonómica", categoria: "Muebles", cantidad: 1, total: 249.99 },
            { id: 7, nombre: "Ratón Inalámbrico", categoria: "Periféricos", cantidad: 1, total: 29.99 }
          ]
        }
      ]
    },
    {
      id: 10,
      username: "dvega",
      password: "vega_daniel",
      nombre: "Daniel",
      apellido: "Vega",
      correo: "daniel.vega@example.com",
      rol: "user",
      img: "",
      ordenes: []
    },
    {
      id: 11,
      username: "cflores",
      password: "camila_flores_1",
      nombre: "Camila",
      apellido: "Flores",
      correo: "camila.flores@example.com",
      rol: "user",
      img: "",
      ordenes: [
        {
          id: 1,
          fecha: "2025-10-12",
          productos: [
            { id: 13, nombre: "Monitor Curvo 27 pulgadas", categoria: "Periféricos", cantidad: 1, total: 329.99 },
            { id: 9, nombre: "Teclado Mecánico", categoria: "Periféricos", cantidad: 1, total: 89.99 },
            { id: 14, nombre: "Póster de Zelda", categoria: "Merch", cantidad: 3, total: 35.97 }
          ]
        }
      ]
    },
    {
      id: 12,
      username: "msoto",
      password: "mateo_soto_pass",
      nombre: "Mateo",
      apellido: "Soto",
      correo: "mateo.soto@example.com",
      rol: "user",
      img: "",
      ordenes: []
    }
    ];
    
  const loadUsuariosFromStorage = () => {
      try {
        const stored = localStorage.getItem('tiendaPW_usuarios');
        if (stored) {
          const parsed = JSON.parse(stored);
          console.log('Usuarios cargados desde LocalStorage:', parsed.length);
          return parsed;
        }
      } catch (error) {
        console.error('Error al cargar usuarios desde LocalStorage:', error);
      }
      console.log('Usando usuarios por defecto');
      // Devolver una copia para evitar mutaciones accidentales sobre la constante
      return usuariosDefault.map(u => ({ ...u, ordenes: u.ordenes ? [...u.ordenes] : [] }));
    };
    
    // Guardar usuarios en LocalStorage
    const saveUsuariosToStorage = (usuariosArray) => {
      try {
        localStorage.setItem('tiendaPW_usuarios', JSON.stringify(usuariosArray));
        console.log('Usuarios guardados en LocalStorage:', usuariosArray.length);
        return true;
      } catch (error) {
        console.error('Error al guardar usuarios en LocalStorage:', error);
        return false;
      }
    };
    
    // Inicializar usuarios desde LocalStorage
    let usuarios = loadUsuariosFromStorage();
    

    // Modificar un usuario (por posición en el array)
    const modify = (newUser, pos) => usuariosDefault[pos] = newUser;
      

    /*
    const modify = (newUser, pos) => {
      if (typeof pos !== 'number' || pos < 0 || pos >= usuarios.length) {
        throw new Error('Posición de usuario inválida');
      }
      // Mantener la estructura básica: id obligatorio
      if (!newUser || typeof newUser.id === 'undefined') {
        throw new Error('El usuario debe tener un id');
      }
      usuarios[pos] = { ...usuarios[pos], ...newUser };
      saveUsuariosToStorage(usuarios);
      return usuarios[pos];
    };
    */
    
    // Agregar un nuevo usuario
    const insertNewUser = (usuario) => {
      usuario.id = usuariosDefault.length++;
      usuariosDefault.push(usuario);
    }
    //Extraer usuarios
    const get = () =>{
      return usuariosDefault;
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
      insertNewUser
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
    