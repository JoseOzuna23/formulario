
/* exports.obtenerExcedente = (req, res) => {
    db.query('SELECT * FROM usuario', (error, results) => {
        if (error) {
            console.error('Error al obtener los votos:', error);
            res.status(500).json({ message: 'Error al obtener los votos' });
        } else {
            res.status(200).json(results);
        }
    });
};
 */
exports.obtenerExcedente = (req, res) => {
    console.log('Solicitud recibida:', req.params);
    const ncedula = req.params.inputData; // Capturar el valor de la cédula desde la URL
    console.log("la cedula se muestra",inputData)

    // Realizar la consulta a la base de datos
    db.query('SELECT nombre FROM usuario WHERE cedula = ?', [inputData], (error, results) => {
        if (error) {
            console.error('Error al obtener excedente:', error);
            res.status(500).json({ message: 'Error al obtener excedente' });
        } else {
            // Verificar si se encontraron resultados
            if (results.length === 0) {
                res.status(404).json({ message: 'No se encontraron resultados para la cedula proporcionada' });
            } else {
                res.status(200).json(results);
            }
        }
    });
};
