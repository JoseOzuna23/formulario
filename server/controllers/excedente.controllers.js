exports.obtenerExcedente = (req, res) => {
    console.log('Solicitud recibida:', req.params);
    const inputData1 = req.params.inputData1;
    const inputData2 = req.params.inputData2;
    console.log("valor1:", inputData1);
    console.log("valor2:", inputData2);

    // Realizar la consulta a la base de datos    
    pool.query('SELECT nombres,anio, apellidos, nro_cedula, total_a_cobrar FROM excedentesweb WHERE nro_cedula = $1 AND cl_fechnac = $2 and anio =2018', [inputData1, inputData2], (error, results) => {
        if (error) {
            console.error('Error al obtener excedente:', error);
            res.status(500).json({ message: 'Error al obtener excedente' });
        } else {
            // Verificar si se encontraron resultados
            if (results.rows.length === 0) {
                res.status(404).json({ message: 'No se encontraron resultados para la cedula proporcionada' });
            } else {
                res.status(200).json(results.rows);
            }
        }
    });    
};

