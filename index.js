require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');


const { dbConnection } = require('./database/config');

// Crear el servidor
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura del parseo del body
app.use( express.json() );

// base de datos
dbConnection();

// Directorio publico
app.use( express.static('public') );

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));

//  Ultimo
app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html') );
});

app.listen( process.env.PORT, ()=> {
    console.log(`Servidor Online en puerto ${ process.env.PORT }`);
});