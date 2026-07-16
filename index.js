const express = require('express');
const app = express();

app.get('/mi-ip', async (req, res) => {
    const response = await fetch('https://api.ipify.org');
    const ip = await response.text();
    res.send("TU IP ES: " + ip);
});

app.get('/player', async (req, res) => {
    const tag = req.query.tag.replace('#', '');
    const url = `https://api.brawlstars.com/v1/players/%23${tag}`;
    const response = await fetch(url, {
        headers: { "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjEyZDI5OGQxLTFhOTktNDk3Zi04Mjg0LWYzODMxNzJjOWY2NSIsImlhdCI6MTc4NDIxMjAxMSwic3ViIjoiZGV2ZWxvcGVyLzdlZGIxZWZiLWM5MDEtOTcxNS0yOGUxLTk4NDNiOWE3YjhmYiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNzQuMjIwLjQ4LjAiLCI3NC4yMjAuNTYuMCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.1eP1Mcs2N1JrxtAlkmrrl0QJGhf4aiVSsYJr1EBt8zSWTr8cGKMKG9WUDmo6nq0EbIFTFUgBDDO0szLdBbfJ9g" }
    });
    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => console.log('Servidor OK'));
