
exports.obtenerExcedente = (req, res) => {
    db.query('SELECT * FROM excedente', (error, results) => {
        if (error) {
            console.error('Error al obtener los votos:', error);
            res.status(500).json({ message: 'Error al obtener los votos' });
        } else {
            res.status(200).json(results);
        }
    });
};
