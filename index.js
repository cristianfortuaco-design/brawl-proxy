const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Habilitamos CORS para evitar bloqueos de red
app.use(cors());

// Tu NUEVO Token de la API de Brawl Stars (¡Este sí es el correcto!)
const API_TOKEN = "Bearer EyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjEyZDI5OGQxLTFhOTktNDk3Zi04Mjg0LWYzODMxNzJjOWY2NSIsImlhdCI6MTc4NDIxMjAxMSwic3ViIjoiZGV2ZWxvcGVyLzdlZGIxZWZiLWM5MDEtOTcxNS0yOGUxLTk4NDNiOWE3YjhmYiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNzQuMjIwLjQ4LjAiLCI3NC4yMjAuNTYuMCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.1eP1Mcs2N1JrxtAlkmrrl0QJGhf4aiVSsYJr1EBt8zSWTr8cGKMKG9WUDmo6nq0EbIFTFUgBDDO0szLdBbfJ9g";

app.get('/player', async (req, res) => {
    const playerTag = req.query.tag;
    if (!playerTag) {
        return res.status(400).json({ error: "Falta el parámetro 'tag'" });
    }

    // Quitamos la almohadilla '#' si viene en la petición
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

app.listen(PORT, () => console.log(`Proxy corriendo correctamente en el puerto ${PORT}`));
app.listen(PORT, () => console.log(`Proxy corriendo en el puerto ${PORT}`));
