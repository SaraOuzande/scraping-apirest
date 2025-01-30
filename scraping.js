const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://elpais.com/ultimas-noticias/';

async function obtenerNoticias() {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        let noticias = [];

        $('.section .article').each((index, element) => {
            const titulo = $(element).find('h2').text().trim();
            const descripcion = $(element).find('p').text().trim();
            const enlace = $(element).find('a').attr('href');
            const imagen = $(element).find('img').attr('src');

            if (titulo && enlace) {
                noticias.push({ titulo, descripcion, enlace, imagen });
            }
        });

        fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
        console.log('Noticias guardadas en noticias.json');
    } catch (error) {
        console.error('Error al obtener noticias:', error.message);
    }
}

module.exports = obtenerNoticias;
