const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Pega tu token EXACTAMENTE dentro de las comillas, sin espacios al inicio o final
const API_TOKEN = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjEyZDI5OGQxLTFhOTktNDk3Zi04Mjg0LWYzODMxNzJjOWY2NSIsImlhdCI6MTc4NDIxMjAxMSwic3ViIjoiZGV2ZWxvcGVyLzdlZGIxZWZiLWM5MDEtOTcxNS0yOGUxLTk4NDNiOWE3YjhmYiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNzQuMjIwLjQ4LjAiLCI3NC4yMjAuNTYuMCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.1eP1Mcs2N1JrxtAlkmrrl0QJGhf4aiVSsYJr1EBt8zSWTr8cGKMKG9WUDmo6nq0EbIFTFUgBDDO0szLdBbfJ9g";

app.get('/player', async (req, res) => {
    try {
        const tag = req.query.tag ? req.query.tag.replace('#', '') : '';
        if (!tag) return res.status(400).json({ error: "Falta tag" });

        const url = `https://api.brawlstars.com/v1/players/%23${tag}`;
        const response = await fetch(url, {
            headers: {
                "Authorization": API_TOKEN,
                "Accept": "application/json"
            }
        });
        
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Error interno" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});
