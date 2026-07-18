const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Token insertado
const TOKEN = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjFlYjgwNTE5LTI2N2ItNDIyZi1hYzJlLTRiMmVmMDU3NzE5OSIsImlhdCI6MTc4NDM4NDA3Miwic3ViIjoiZGV2ZWxvcGVyLzdlZGIxZWZiLWM5MDEtOTcxNS0yOGUxLTk4NDNiOWE3YjhmYiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNzQuMjIwLjQ4LjIxOSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.JaKdEwbnfNLvZ7fWViHECNWBHRTu9yG7DSyvV4MK8dea3ONnsEepxxm8e1CNd-ens2_GSx0XMX1o7MzPA9L-iw";

app.get('/mi-ip', async (req, res) => {
    const response = await fetch('https://api.ipify.org');
    const ip = await response.text();
    res.send("TU IP ACTUAL ES: " + ip);
});

app.get('/player', async (req, res) => {
    const tag = req.query.tag ? req.query.tag.replace('#', '') : '';
    const url = `https://api.brawlstars.com/v1/players/%23${tag}`;
    
    const response = await fetch(url, {
        headers: { "Authorization": TOKEN }
    });
    
    const data = await response.json();
    res.json(data);
});

app.listen(PORT, () => console.log('Servidor en marcha'));
