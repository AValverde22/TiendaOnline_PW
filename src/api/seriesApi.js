const contador = 3;

const Series = [
    {
        id: 1,
        nombre: "The Last of Us",
        descripción: "",
        img: "https://thelastofusdatabase.com/wp-content/uploads/2023/12/banner-tlou-1-2013.jpg",
        juegos:[
            {
            nombre: "The Last of Us",
            descripción: "",
            precio: 250,
            img: "https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/0kRqUeSBIbQzz7cen3c989c6.jpg"
            },
            {
            nombre: "The Last of Us 2",
            descripción: "",
            precio: 250,
            img: "https://www.gameaccessibilitynexus.com/wp-content/uploads/2024/01/The-Last-of-Us-Part-2-Remastered-Header.jpg"
            }
        ]
    },
    {
        id: 2,
        nombre: "Spiderman",
        descripción: "",
        img: "https://i.redd.it/xwks9ein98p11.jpg",
        juegos:[
            {
            nombre: "Spiderman",
            descripción: "",
            precio: 250,
            img: "https://image.api.playstation.com/vulcan/ap/rnd/202009/3021/QeJWAaLcYNOpCv7yCVZZEOY5.jpg?w=440"
            },
            {
            nombre: "Spiderman 2",
            descripción: "",
            precio: 250,
            img: "https://i.imgur.com/l6x8G63.png"
            }
        ]
    },
    {
        id: 3,
        nombre: "Gears of War",
        descripción: "",
        img: "https://www.gearsofwar.com/static/a9cdf3dfbf3028602e631ba159fbf984/gearsOfWar.jpg",
        juegos:[
            {
            nombre: "Gears of War",
            descripción: "",
            precio: 250,
            img: "https://cdn.gearsofwar.com/gearsofwar/sites/2/2024/05/GearsOfWar_thumbnail-664e4063714f1.png"
            },
            {
            nombre: "Gears of War 2",
            descripción: "",
            precio: 250,
            img: "https://i.ytimg.com/vi/IU9H36cwfFc/maxresdefault.jpg"
            },
            {
            nombre: "Gears of War 3",
            descripción: "",
            precio: 250,
            img: "https://static.wikia.nocookie.net/gearsofwar/images/d/dc/Gears_of_War_3_box_artwork.png/revision/latest/scale-to-width-down/1200?cb=20240610134243"
            }
        ]
    }
];

const insert = (nuevaSerie) => {
  contador++;
  nuevaSerie.id = contador;
  Series.push(nuevaSerie);
};

const get = () => {
  return Series;
}

const seriesApi = { insert, get }

export default seriesApi;