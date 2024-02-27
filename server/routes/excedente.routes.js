const ExcedenteListar = require('../controllers/excedente.controllers')


module.exports = (app) =>{        
    app.post('/api/excedente/:inputData1/:inputData2', ExcedenteListar.obtenerExcedente)               
}