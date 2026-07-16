const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Habilitamos CORS para que tu app de Android pueda hacer consultas sin bloqueos
app.use(cors());

// Tu Token real de Brawl Stars (mantén el "Bearer " delante)
const API_TOKEN = "Bearer TU_TOKEN_DE_BRAWL_STARS_AQUÍ"; 

app.get('/player', async (req, res) => {
    const playerTag = req.query.tag;
    if (!playerTag) {
        return res.status(400).json({ error: "Falta el parámetro 'tag'" });
    }

    // Limpiamos el tag por si el móvil lo manda con '#'
    const cleanTag = playerTag.replace('#', '').trim();
    const url = `https://api.brawlstars.com/v1/players/%23${cleanTag}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": API_TOKEN,
                "Accept": "application/json"
            }
        });
        
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: "Error al conectar con la API de Supercell", details: error.message });
    }
});

app.listen(PORT, () => console.log(`Proxy corriendo en el puerto ${PORT}`));
