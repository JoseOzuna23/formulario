const ExcedenteListar = require('../controllers/excedente.controllers')


module.exports = (app) =>{        
    app.post('/api/excedente/:inputData', ExcedenteListar.obtenerExcedente)               
}