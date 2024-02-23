// app.js

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000'
}));

//milddleware (ayuda para hacer consulta de tipo post)
app.use(express.json())
app.use(express.urlencoded({extended:true}))



// Conexión a la base de datos MySQL
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'excedente'
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos MySQL establecida');
});

global.db = db;

// Importar las rutas de nuestro servidor backend
const votarRoutes = require('./routes/excedente.routes');
votarRoutes(app);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
