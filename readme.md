## Proyecto de Scraping y CRUD

Este proyecto tiene como objetivo realizar scraping de información desde la página El País - Últimas Noticias y luego implementar un CRUD (Crear, Leer, Actualizar, Borrar) para gestionar los datos obtenidos.
`const url = https://elpais.com/ultimas-noticias/`

## Configuración del proyecto.
- Utilizar Node.js, express y las bibliotecas axios, cheerio y fs para realizar solicitudes HTTP y analizar el HTML de la página y guardar el documento. Estan en el packaje.json así que con un `npm install` estarán instaladas.
- En `scraping.js` irá tu código para scrapear. El endpoint para que se ejecute será la ruta /scraping
- En `app.js` irá tu código de API REST (CRUD), el servidor http, y lo que creas necesario.
- Crea un servidor http con express
- Puedes usar si ves necesario:
```javascript
// Middleware para manejar datos JSON
app.use(express.json());

// Middleware para manejar datos de formularios URL-encoded
app.use(express.urlencoded({ extended: true }));
```
- Puedes hacer tu proyecto todo lo modular que quieras.

## El ejercicio se compone de 2 partes

1. Scraping

* Objetivo:

Extraer información relevante de las últimas noticias en la página de El País.
- Conseguiremos los datos de imagen, enlace, titulo y descripción de la noticia y guardaremos en un array cada objeto con el siguiente formato:

```javascript 
  let noticias = [];
  const noticia = {
    titulo: titulo,
    imagen: imagen,
    descripcion: descripcion,
    enlace: enlace,
  };
```

Una vez tengamos todo guardaremos los datos del array de la siguiente manera
```javascript 
  fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
```
Esto nos generará un archivo con el array y los objetos dentro.

**Pistas para resolver**

- Identificar la estructura HTML que contiene las noticias y seleccionar los elementos pertinentes.
- Extraer datos como título, descripción, imagen y enlace de cada noticia.
Almacenar los datos obtenidos en un archivo JSON.  

- Revisar el HTML para poder identificar donde tenemos que extraerlos. En elmomento que se creó este ejercicio la estructura era esta:
  - Cada uno de los elementos es así: <article class="c c-d c--m "> 
  - Aquí está el título de cada uno de ellos <header class="c_h">
  - La descripción se encuentra aquí: <p class="c_d">
  - Tambien hay que sacar el enlace de la noticia y la imagen.

* Este es el bloque de noticias donde habrá que sacar los datos. Obten todos los que haya en ese momento:
![Noticias](/imgs/noticias.png)

2. CRUD

* Objetivo:

- Implementar un CRUD para gestionar las noticias extraídas durante el scraping. Implementar rutas para realizar operaciones CRUD (GET, POST, PUT, DELETE).
- Leer y escribir datos desde/hacia un archivo JSON para almacenar las noticias.
- Crear funciones para obtener todas las noticias, obtener una noticia por índice, crear una nueva noticia, actualizar una noticia existente y eliminar una noticia.

**Pistas para resolver**
cons estas líneas podremos leer, guardar y usar los datos del archivo `noticias.json` para poder trabajar con ellos.

```javascript 
  let noticias = [];

// Leer datos desde el archivo JSON
function leerDatos() {
  try {
    const data = fs.readFileSync('noticias.json', 'utf-8');
    noticias = JSON.parse(data);
  } catch (error) {
    console.error('Error al leer el archivo noticias.json:', error.message);
  }
}

// Guardar datos en el archivo JSON
function guardarDatos() {
  fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
}
```

Aquí tienes la documentación de Cheerio: https://cheerio.js.org/docs/intro
Aquí tienes la documentación de Axios: https://axios-http.com/es/docs/intro