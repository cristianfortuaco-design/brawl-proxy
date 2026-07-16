const express = require('express');
const app = express();
// ... resto del código ...

app.get('/check-ip', async (req, res) => {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    res.send("LA IP REAL DE TU SERVIDOR ES: " + data.ip);
});
app.listen(PORT, () => console.log(`Proxy corriendo correctamente en el puerto ${PORT}`));
app.listen(PORT, () => console.log(`Proxy corriendo en el puerto ${PORT}`));
