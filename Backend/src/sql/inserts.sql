-- =============================================
-- 1. INSERTAR CATEGORÍAS
-- =============================================
INSERT INTO "categorias" ("nombre", "descripcion", "img", "createdAt", "updatedAt") VALUES
    ('Videojuegos', 'Explora un mundo de diversión sin límites con nuestra colección de videojuegos...', 'https://universidadeuropea.com/resources/media/images/tipos-videojuegos-800x450.width-640.jpg', NOW(), NOW()),
    ('Consolas', 'Descubre las últimas generaciones de consolas y revive las más icónicas...', 'https://puntoseguido.upc.edu.pe/wp-content/uploads/2020/05/consolas.jpeg', NOW(), NOW()),
    ('Periféricos', 'Equipa tu setup con los mejores periféricos del mercado...', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbpWqvs9Z6kvAPTP50hgPT4s13mojJZSLCPw&s', NOW(), NOW()),
    ('Juguetes', 'Encuentra juguetes para todas las edades...', 'https://lingokids.com/wp-content/uploads/2020/01/toys-ideas-for-Babies.jpg', NOW(), NOW()),
    ('Ropa', 'Viste con estilo con nuestra colección de ropa...', 'https://sydney.pe/wp-content/uploads/2023/09/ropa-para-verano.png', NOW(), NOW()),
    ('Merch', 'Demuestra tu pasión con artículos de colección...', 'https://cdn.prod.website-files.com/63ff7c6ecc83f9ec7ffe916b/66f2f19a888f8becf858816c_66f2edc6f94096c480c22792_fourthwall-products-ezgif.com-png-to-webp-converter.webp', NOW(), NOW()),
    ('Componentes PC', 'Arma o mejora tu computadora...', 'https://digitalek.com/wp-content/uploads/2024/09/componentes-para-armar-una-pc-gamer.png', NOW(), NOW());

-- =============================================
-- 2. INSERTAR SERIES (SAGAS)
-- =============================================
INSERT INTO "series" ("nombre", "descripcion", "img", "createdAt", "updatedAt") VALUES
    ('The Last of Us', 'Una historia de supervivencia en un mundo postapocalíptico arrasado por un hongo...', 'https://thelastofusdatabase.com/wp-content/uploads/2023/12/banner-tlou-1-2013.jpg', NOW(), NOW()),
    ('Spiderman', 'Una reinterpretación moderna del héroe arácnido...', 'https://i.redd.it/xwks9ein98p11.jpg', NOW(), NOW()),
    ('Gears of War', 'Una serie de acción táctica en tercera persona ambientada en un mundo en guerra...', 'https://www.gearsofwar.com/static/a9cdf3dfbf3028602e631ba159fbf984/gearsOfWar.jpg', NOW(), NOW());

-- =============================================
-- 3. INSERTAR PRODUCTOS
-- =============================================
INSERT INTO "productos" ("nombre", "descripcion", "precio", "stock", "img", "categoriaId", "serieId", "activo", "createdAt", "updatedAt") VALUES
    -- Consolas (ID 1 y 2)
    ('Playstation 5', 'Consola de videojuegos - Presentación: fisico', 2500.00, 10, 'https://plazavea.vteximg.com.br/arquivos/ids/29033795-1000-1000/20404194.jpg', 2, NULL, true, NOW(), NOW()),
    ('Nintendo Switch 2', 'Consola de videojuegos - Presentación: fisico', 2900.00, 10, 'https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/2534/PMP20000870001/full_image-1.jpeg', 2, NULL, true, NOW(), NOW()),

    -- Videojuegos Sueltos (ID 3 y 4)
    ('Ghost of Yotei Collector''s Edition', 'Edición de colección de Ghost of Yotei - Presentación: fisico', 1000.00, 10, 'https://press-start.com.au/wp-content/uploads/2025/04/Ghost-of-YOtei-CE-1.jpg', 1, NULL, true, NOW(), NOW()),
    ('EAFC26 Ultimate edition', 'Edición Ultima de EAFC 26 - Presentación: digital', 300.00, 10, 'https://gamescenter.pe/wp-content/uploads/2025/07/FC-26-Ultimate-Edition-PS5.webp', 1, NULL, true, NOW(), NOW()),

    -- Juguetes (ID 5)
    ('Rick Grimes''s Funko Pop', 'Figura coleccionable de vinilo del protagonista de la serie The Walking Dead - Presentación: fisico', 150.00, 10, 'https://i0.wp.com/www.planetafunk.com.pe/wp-content/uploads/2024/10/FUNKO-POP-RICK-GRIMES-306-1.jpg?fit=800%2C800&ssl=1', 4, NULL, true, NOW(), NOW()),

    -- Periféricos (ID 6)
    ('Audífonos Bluetooth Haylou S30 PRO', 'Audífonos con -43dB para cancelar de ruido profundo e inalámbricos con 80 horas de batería - Presentación: fisico', 150.00, 10, 'https://media.falabella.com/falabellaPE/138655627_01/w=1500,h=1500,fit=pad', 3, NULL, true, NOW(), NOW()),

    -- Juegos de Series (ID 7 al 13)
    ('The Last of Us Part I', 'Joel debe escoltar a Ellie, una joven inmune al virus...', 250.00, 10, 'https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/0kRqUeSBIbQzz7cen3c989c6.jpg', 1, 1, true, NOW(), NOW()),
    ('The Last of Us Part II', 'Años después, Ellie busca venganza tras una tragedia personal...', 250.00, 10, 'https://www.gameaccessibilitynexus.com/wp-content/uploads/2024/01/The-Last-of-Us-Part-2-Remastered-Header.jpg', 1, 1, true, NOW(), NOW()),
    ('Marvel''s Spider-Man', 'Peter Parker enfrenta al villano Mister Negative...', 250.00, 10, 'https://image.api.playstation.com/vulcan/ap/rnd/202009/3021/QeJWAaLcYNOpCv7yCVZZEOY5.jpg?w=440', 1, 2, true, NOW(), NOW()),
    ('Marvel''s Spider-Man 2', 'Peter y Miles Morales unen fuerzas contra enemigos...', 250.00, 10, 'https://i.imgur.com/l6x8G63.png', 1, 2, true, NOW(), NOW()),
    ('Gears of War', 'Marcus Fenix lidera al Escuadrón Delta...', 250.00, 10, 'https://cdn.gearsofwar.com/gearsofwar/sites/2/2024/05/GearsOfWar_thumbnail-664e4063714f1.png', 1, 3, true, NOW(), NOW()),
    ('Gears of War 2', 'El Escuadrón Delta lleva la guerra al interior del mundo subterráneo...', 250.00, 10, 'https://i.ytimg.com/vi/IU9H36cwfFc/maxresdefault.jpg', 1, 3, true, NOW(), NOW()),
    ('Gears of War 3', 'Marcus y su equipo luchan por la supervivencia final...', 250.00, 10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Y8z3rbd7q5p2d6KFcVkt_HzsohXRMFz_Tw&s', 1, 3, true, NOW(), NOW());

-- =============================================
-- 4. INSERTAR USUARIOS
-- =============================================
INSERT INTO "usuarios" 
("correo", "username", "password", "nombre", "apellido", "rol", "estado", "direccion", "telefono", "distrito", "img", "createdAt", "updatedAt") 
VALUES
(
    'admin@tienda.com', 'admin', 
    '$2b$10$DhQ2bHOttISXHS3dA8xgPuPQpwdZTVIthOE5KK1IpAi27aX9XthAq', -- Pass: 123456
    'Admin', 'Principal', 'ADMIN', 'ACTIVO', 'Av. Central 123', '999888777', 'Lima', 
    'https://cdn-icons-png.flaticon.com/512/147/147142.png', NOW(), NOW()
),
(
    'user@tienda.com', 'usuario1', 
    '$2b$10$DhQ2bHOttISXHS3dA8xgPuPQpwdZTVIthOE5KK1IpAi27aX9XthAq', -- Pass: 123456
    'Juan', 'Perez', 'USER', 'ACTIVO', 'Jr. Los Olivos 456', '987654321', 'Miraflores', 
    'https://cdn-icons-png.flaticon.com/512/147/147144.png', NOW(), NOW()
);

-- =============================================
-- 5. INSERTAR ÓRDENES (COMPRAS)
-- =============================================
-- NOTA IMPORTANTE: 
-- ID 1 = Admin
-- ID 2 = user@tienda.com (Juan Perez)

-- Orden 1: Juan compró una PS5 hace 5 días (Ya entregada)
INSERT INTO "ordenes" ("fecha", "estado", "total", "direccion_envio", "usuarioId", "createdAt", "updatedAt") VALUES
(NOW() - INTERVAL '5 days', 'entregado', 2500.00, 'Jr. Los Olivos 456, Miraflores', 2, NOW(), NOW());

-- Orden 2: Juan compró un juego y un funko hoy (Pendiente)
INSERT INTO "ordenes" ("fecha", "estado", "total", "direccion_envio", "usuarioId", "createdAt", "updatedAt") VALUES
(NOW(), 'pendiente', 450.00, 'Jr. Los Olivos 456, Miraflores', 2, NOW(), NOW());

-- =============================================
-- 6. INSERTAR DETALLES DE LAS ÓRDENES
-- =============================================

-- Detalles de la Orden 1 (ID 1) -> Producto ID 1 (PS5)
INSERT INTO "detalle_orden" ("cantidad", "precio_unitario", "subtotal", "ordenId", "productoId") VALUES
(1, 2500.00, 2500.00, 1, 1);

-- Detalles de la Orden 2 (ID 2) -> Producto ID 4 (EAFC26) + ID 5 (Funko)
INSERT INTO "detalle_orden" ("cantidad", "precio_unitario", "subtotal", "ordenId", "productoId") VALUES
(1, 300.00, 300.00, 2, 4),
(1, 150.00, 150.00, 2, 5);