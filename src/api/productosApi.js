let contador = 4;

let productos = [
    {
      id: 1,
      titulo: "Playstation 5",
      descripcion: "Consola de videojuegos",
      precio: 2500.00,
      ID_Categoria: 2,
      img: "https://plazavea.vteximg.com.br/arquivos/ids/29033795-1000-1000/20404194.jpg"
    },
    {
      id: 2,
      titulo: "Nintendo Switch 2",
      descripcion: "Consola de videojuegos",
      precio: 2900.00,
      ID_Categoria: 2,
      img: "https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/2534/PMP20000870001/full_image-1.jpeg"
    },
    {
      id: 3,
      titulo: "Ghost of Yotei Collector's Edition",
      descripcion: "Edición de colección de Ghost of Yotei",
      precio: 1000,
      ID_Categoria: 2,
      img: "https://press-start.com.au/wp-content/uploads/2025/04/Ghost-of-YOtei-CE-1.jpg"
    },
    {
      id: 4,
      titulo: "EAFC26 Ultimate edition",
      descripcion: "Edición Ultima de EAFC 26",
      precio: 300,
      ID_Categoria: 1,
      img: "https://gamescenter.pe/wp-content/uploads/2025/07/FC-26-Ultimate-Edition-PS5.webp"
    }
  ]

const insert = (producto) => {
  producto.id = ++contador;
  productos.push(producto)
}

const get = () => {
  return productos;
}

const productosApi = { insert, get }

export default productosApi;