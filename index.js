const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Ruta principal para que no salga "Cannot GET /"
app.get('/', async (req, res) => {
    res.send("Servidor funcionando. Prueba entrando en /mi-ip");
});

// Ruta para ver la IP real
app.get('/mi-ip', async (req, res) => {
    try {
        const response = await fetch('https://api.ipify.org');
        const ip = await response.text();
        res.send("TU IP ES: " + ip);
    } catch (e) {
        res.send("Error al obtener la IP: " + e.message);
    }
});

app.listen(PORT, () => console.log('Servidor activo'));
