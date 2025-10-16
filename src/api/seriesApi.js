
const contador = 3;

const Series = [
    {
        id: 1,
        nombre: "The Last of Us",
        descripción: "Una historia de supervivencia en un mundo postapocalíptico arrasado por un hongo que convierte a los humanos en criaturas violentas. Destaca por su narrativa emocional, personajes complejos y gran realismo.",
        img: "https://thelastofusdatabase.com/wp-content/uploads/2023/12/banner-tlou-1-2013.jpg",
        juegos:[
            {
            nombre: "The Last of Us",
            descripción: "Joel debe escoltar a Ellie, una joven inmune al virus, a través de un Estados Unidos devastado.",
            precio: 250,
            nombresaga: "The Last of Us",
            img: "https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/0kRqUeSBIbQzz7cen3c989c6.jpg"
            },
            {
            nombre: "The Last of Us 2",
            descripción: "Años después, Ellie busca venganza tras una tragedia personal, enfrentando las consecuencias de la violencia y la pérdida",
            precio: 250,
            nombresaga: "The Last of Us",
            img: "https://www.gameaccessibilitynexus.com/wp-content/uploads/2024/01/The-Last-of-Us-Part-2-Remastered-Header.jpg"
            }
        ]
    },
    {
        id: 2,
        nombre: "Spiderman",
        descripción: "Una reinterpretación moderna del héroe arácnido, con un enfoque en su doble vida como Peter Parker y Spider-Man",
        img: "https://i.redd.it/xwks9ein98p11.jpg",
        juegos:[
            {
            nombre: "Spiderman",
            descripción: "Peter Parker enfrenta al villano Mister Negative y a la amenaza de los Seis Siniestros mientras equilibra su vida personal.",
            precio: 250,
            nombresaga: "Spiderman",
            img: "https://image.api.playstation.com/vulcan/ap/rnd/202009/3021/QeJWAaLcYNOpCv7yCVZZEOY5.jpg?w=440"
            },
            {
            nombre: "Spiderman 2",
            descripción: "Peter y Miles Morales unen fuerzas contra enemigos, explorando el vínculo entre ambos héroes y el poder del simbionte.",
            precio: 250,
            nombresaga: "Spiderman",
            img: "https://i.imgur.com/l6x8G63.png"
            }
        ]
    },
    {
        id: 3,
        nombre: "Gears of War",
        descripción: "Una serie de acción táctica en tercera persona ambientada en un mundo en guerra contra los Locust, criaturas que emergen desde el subsuelo",
        img: "https://www.gearsofwar.com/static/a9cdf3dfbf3028602e631ba159fbf984/gearsOfWar.jpg",
        juegos:[
            {
            nombre: "Gears of War",
            descripción: "Marcus Fenix lidera al Escuadrón Delta para usar la “Bomba de Masa Ligera” y golpear al enemigo Locust en su propio territorio.",
            precio: 250,
            nombresaga: "Gears of War",
            img: "https://cdn.gearsofwar.com/gearsofwar/sites/2/2024/05/GearsOfWar_thumbnail-664e4063714f1.png"
            },
            {
            nombre: "Gears of War 2",
            descripción: "El Escuadrón Delta lleva la guerra al interior del mundo subterráneo Locust, enfrentando horrores aún mayores.",
            precio: 250,
            nombresaga: "Gears of War",
            img: "https://i.ytimg.com/vi/IU9H36cwfFc/maxresdefault.jpg"
            },
            {
            nombre: "Gears of War 3",
            descripción: "Marcus y su equipo luchan por la supervivencia final de la humanidad mientras un nuevo enemigo, los Lambent, amenaza con destruirlo todo.",
            precio: 250,
            nombresaga: "Gears of War",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Y8z3rbd7q5p2d6KFcVkt_HzsohXRMFz_Tw&s"
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