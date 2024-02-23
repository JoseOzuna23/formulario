const ExcedenteListar = require('../controllers/excedente.controllers')


module.exports = (app) =>{        
    app.get('/api/excedentes', ExcedenteListar.obtenerExcedente)               
}