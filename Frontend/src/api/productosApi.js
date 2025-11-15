import topGames from "../componentes/TopGames.jsx";
import seriesApi from "./seriesApi.js";
let contador = 6;

let productos = [
    {
      id: 1,
      titulo: "Playstation 5",
      descripcion: "Consola de videojuegos",
      precio: 2500.00,
      presentacion : "fisico",
      stock: 10,
      ID_Categoria: 2,
      img: "https://plazavea.vteximg.com.br/arquivos/ids/29033795-1000-1000/20404194.jpg"
    },
    {
      id: 2,
      titulo: "Nintendo Switch 2",
      descripcion: "Consola de videojuegos",
      precio: 2900.00,
      presentacion : "fisico",
      stock: 10,
      ID_Categoria: 2,
      img: "https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/2534/PMP20000870001/full_image-1.jpeg"
    },
    {
      id: 3,
      titulo: "Ghost of Yotei Collector's Edition",
      descripcion: "Edición de colección de Ghost of Yotei",
      precio: 1000,
      presentacion : "fisico",
      stock: 10,
      ID_Categoria: 2,
      img: "https://press-start.com.au/wp-content/uploads/2025/04/Ghost-of-YOtei-CE-1.jpg"
    },
    {
      id: 4,
      titulo: "EAFC26 Ultimate edition",
      descripcion: "Edición Ultima de EAFC 26",
      precio: 300,
      presentacion : "digital",
      stock: 10,
      ID_Categoria: 1,
      img: "https://gamescenter.pe/wp-content/uploads/2025/07/FC-26-Ultimate-Edition-PS5.webp"
    },
    {
      id: 5,
      titulo: "Rick Grimes's Funko Pop",
      descripcion: "Figura coleccionable de vinilo del protagonista de la serie 'The Walking Dead'",
      precio: 150,
      presentacion : "fisico",
      stock: 10,
      ID_Categoria: 4,
      img: "https://i0.wp.com/www.planetafunk.com.pe/wp-content/uploads/2024/10/FUNKO-POP-RICK-GRIMES-306-1.jpg?fit=800%2C800&ssl=1"
    },
    {
      id: 6,
      titulo: "Audífonos Bluetooth Haylou S30 PRO ANC Hybrid Hi-Res",
      descripcion: "Audífonos con -43dB para cancelar de ruido profundo e inalámbricos con 80 horas de batería",
      precio: 150,
      presentacion : "fisico",
      stock: 10,
      ID_Categoria: 3,
      img: "https://media.falabella.com/falabellaPE/138655627_01/w=1500,h=1500,fit=pad"
    }
  ]


const nuevosTopGames = topGames.map((game, i) => ({
  id: productos.length + i + 1, 
  titulo: game.nombre,
  descripcion: game.descripcion,
  precio: game.precio,
  presentacion: game.presentacion,
  stock: game.stock,
  ID_Categoria: 1, 
  img: game.img
}));

const update = (id, productoActualizado) => {
  const index = productos.findIndex(p => p.id == id);
  
  if (index !== -1) {
    productos[index] = { ...productoActualizado, id: parseInt(id) }; 
  }
};


const series = seriesApi.get();
let idBaseSeries = productos.length + nuevosTopGames.length;

const juegosDeSeries = series.flatMap((serie) =>
  serie.juegos.map((juego, i) => ({
    id: ++idBaseSeries,
    titulo: juego.nombre,
    descripcion: juego.descripción,
    precio: juego.precio,
    presentacion: juego.presentacion,
    stock: juego.stock,
    ID_Categoria: 1, 
    img: juego.img,
    id_serie: serie.id,
    saga: serie.nombre, 
  }))
);

productos = [...productos, ...nuevosTopGames, ...juegosDeSeries];
contador = productos.length;

const insert = (producto) => {
  producto.id = ++contador;
  productos.push(producto)
}

const get = () => {
  return productos;
}

const modificarID_Categoria = (idProducto, nuevoIdCategoria) => {
  for(let i = 0; i < contador; i++) if(productos[i].id == idProducto) {productos[i].ID_Categoria = nuevoIdCategoria; return;}
}

const productosApi = { insert, get, modificarID_Categoria, update }

export default productosApi;