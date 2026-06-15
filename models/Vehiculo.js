const mongoose = require('mongoose');

const vehiculoSchema = new mongoose.Schema({
    marca:String,
    modelo:String,
    anio:Number,
    color:String,
    precio:Number,
    estado:String
});

module.exports = mongoose.model('Vehiculo', vehiculoSchema);