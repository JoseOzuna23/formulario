exports.obtenerExcedente = (req, res) => {    
    const inputData1 = req.params.inputData1;
    const inputData2 = req.params.inputData2;
    const inputData3 = req.params.inputData3;
    
    // Realizar la consulta a la base de datos    
    pool.query('SELECT nombres, nro_cedula, TO_CHAR(cl_fechnac, \'DD-MM-YYYY\') AS cl_fechnac_formatted, anio, nro_socio, por_aporte, por_intereses, por_tarjeta, total_excedente, desc1, desc2, desc3, desc4, desc5, retencion_irp, total_deuda, total_a_cobrar FROM excedentesweb WHERE nro_cedula = $1 AND cl_fechnac = $2 and anio= 2021 and nro_socio =$3', [inputData1, inputData2, inputData3 ], (error, results) => {
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

