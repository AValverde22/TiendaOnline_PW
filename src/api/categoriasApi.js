let contador = 5;

let categorias = [
    {
        id: 1,
        nombre: "Videojuegos",
        descripcion: "Explora un mundo de diversión sin límites con nuestra colección de videojuegos para todas las plataformas. Encuentra títulos clásicos, lanzamientos recientes y las sagas más populares para disfrutar solo o con amigos.",
        img: "https://universidadeuropea.com/resources/media/images/tipos-videojuegos-800x450.width-640.jpg"
    },
    {
        id: 2,
        nombre: "Consolas",
        descripcion: "Descubre las últimas generaciones de consolas y revive las más icónicas. Desde portátiles hasta sistemas de sobremesa, elige la consola ideal para tu estilo de juego y disfruta del máximo rendimiento y entretenimiento.",
        img: "https://puntoseguido.upc.edu.pe/wp-content/uploads/2020/05/consolas.jpeg"
    },
    {
        id: 3,
        nombre: "Periféricos",
        descripcion: "Equipa tu setup con los mejores periféricos del mercado. Teclados mecánicos, ratones ergonómicos, auriculares con sonido envolvente y más accesorios diseñados para potenciar tu experiencia de uso y gaming.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbpWqvs9Z6kvAPTP50hgPT4s13mojJZSLCPw&s"
    },
    {
        id: 4,
        nombre: "Juguetes",
        descripcion:  "Encuentra juguetes para todas las edades: educativos, coleccionables y de entretenimiento. Regala momentos de diversión y aprendizaje con productos seguros, duraderos y llenos de imaginación.",
        img: "https://lingokids.com/wp-content/uploads/2020/01/toys-ideas-for-Babies.jpg"
    },
    {
        id: 5,
        nombre: "Ropa",
        descripcion: "Viste con estilo con nuestra colección de ropa para todas las ocasiones. Prendas cómodas, modernas y de calidad que reflejan tu personalidad, desde lo casual hasta lo urbano y deportivo.",
        img: "https://sydney.pe/wp-content/uploads/2023/09/ropa-para-verano.png"
    },
    {
        id: 6,
        nombre: "Merch",
        descripcion: "Demuestra tu pasión con artículos de colección y merchandising exclusivo. Camisetas, figuras, pósters y accesorios inspirados en tus películas, series, juegos y personajes favoritos.",
        img: "https://cdn.prod.website-files.com/63ff7c6ecc83f9ec7ffe916b/66f2f19a888f8becf858816c_66f2edc6f94096c480c22792_fourthwall-products-ezgif.com-png-to-webp-converter.webp"
    },
    {
        id: 7,
        nombre: "Componentes PC",
        descripcion: "Arma o mejora tu computadora con los mejores componentes del mercado. Tarjetas gráficas, procesadores, memorias RAM, discos SSD y más, para alcanzar el máximo rendimiento en gaming y productividad.",
        img: "https://digitalek.com/wp-content/uploads/2024/09/componentes-para-armar-una-pc-gamer.png"
    }
];

const insert = (categoria) => {
    categoria.id = ++contador;
    categorias.push(categoria);
}

const get = () => categorias;

const eliminar = (ID) => categorias = categorias.filter((cat) => cat.id !== ID);


const categoriasApi = {insert, get, eliminar};
export default categoriasApi;
