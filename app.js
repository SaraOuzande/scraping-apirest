const express = require('express');
const fs = require('fs');
const obtenerNoticias = require('./scraping');

const app = express();
const port = 3000;

app.use(express.json());

let noticias = [];

function leerDatos() {
    try {
        const data = fs.readFileSync('noticias.json', 'utf-8');
        noticias = JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo noticias.json:', error.message);
    }
}

function guardarDatos() {
    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
}

app.get('/scraping', async (req, res) => {
    await obtenerNoticias();
    leerDatos();
    res.json({ mensaje: 'Scraping completado y datos actualizados' });
});

app.get('/noticias', (req, res) => {
    leerDatos();
    res.json(noticias);
});

app.get('/noticias/:id', (req, res) => {
    leerDatos();
    const id = parseInt(req.params.id);
    if (id >= 0 && id < noticias.length) {
        res.json(noticias[id]);
    } else {
        res.status(404).json({ mensaje: 'Noticia no encontrada' });
    }
});

app.post('/noticias', (req, res) => {
    leerDatos();
    noticias.push(req.body);
    guardarDatos();
    res.status(201).json({ mensaje: 'Noticia agregada' });
});

app.put('/noticias/:id', (req, res) => {
    leerDatos();
    const id = parseInt(req.params.id);
    if (id >= 0 && id < noticias.length) {
        noticias[id] = req.body;
        guardarDatos();
        res.json({ mensaje: 'Noticia actualizada' });
    } else {
        res.status(404).json({ mensaje: 'Noticia no encontrada' });
    }
});

app.delete('/noticias/:id', (req, res) => {
    leerDatos();
    const id = parseInt(req.params.id);
    if (id >= 0 && id < noticias.length) {
        noticias.splice(id, 1);
        guardarDatos();
        res.json({ mensaje: 'Noticia eliminada' });
    } else {
        res.status(404).json({ mensaje: 'Noticia no encontrada' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
