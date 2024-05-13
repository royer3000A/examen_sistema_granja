const mongoose = require('mongoose');
//definir el esquema
const granjaSchema = new mongoose.Schema({
    // nombre: { type: String, require: true}
    nombre: String,
    capacidad: Number,
    tipo: String
    
});

const granjaModel = mongoose.model('Granja',granjaSchema, 'granja');
module.exports = granjaModel;