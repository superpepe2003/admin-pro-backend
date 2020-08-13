require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

app.use( cors() );

// base de datos
dbConnection();

// Rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
        mensaje: 'Hola Mundo!'
    })

});

app.listen( process.env.PORT, ()=> {
    console.log(`Servidor Online en puerto ${ process.env.PORT }`);
})