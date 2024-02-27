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

// Conexión a la base de datos PostgreSQL
const { Pool } = require('pg');

const pool = new Pool({
    user: 'bmaiz',
    host: '192.168.42.235',
    database: 'coop8marzo',
    password: 'bmaiz123',
    port: 5432,
});

pool.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos PostgreSQL establecida');
});

global.pool = pool;

// Importar las rutas de nuestro servidor backend
const excedenteRoutes = require('./routes/excedente.routes');
excedenteRoutes(app);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
