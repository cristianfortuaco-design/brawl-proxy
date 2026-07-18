const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del Token
// Importante: Mantén el prefijo "Bearer " antes de tu token
const TOKEN = "Bearer TU_TOKEN_AQUI";

// Ruta principal para verificar que el servidor está vivo
app.get('/', (req, res) => {
    res.send("Servidor de Brawl Proxy activo.");
});

// Ruta para obtener datos de jugador
app.get('/player', async (req, res) => {
    const tag = req.query.tag ? req.query.tag.replace('#', '') : '';
    
    if (!tag) {
        return res.status(400).json({ error: "Debes proporcionar un tag de jugador" });
    }

    try {
        const url = `https://api.brawlstars.com/v1/players/%23${tag}`;
        const response = await fetch(url, {
            headers: { 
                "Authorization": TOKEN,
                "Accept": "application/json"
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error interno al conectar con la API de Brawl Stars" });
    }
});

// Ruta de diagnóstico para obtener la IP pública del servidor
app.get('/mi-ip', async (req, res) => {
    try {
        const response = await fetch('https://api.ipify.org');
        const ip = await response.text();
        res.send("IP actual del servidor: " + ip);
    } catch (e) {
        res.status(500).send("No se pudo obtener la IP");
    }
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
