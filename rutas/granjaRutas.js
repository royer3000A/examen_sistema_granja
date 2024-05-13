const express = require('express');
const rutas = express.Router();
const granjaModel = require('../models/Granja');

//endpoint 1.  traer todas las granjas
rutas.get('/getGranja', async (req, res) => {
    try  {
        const granja = await  granjaModel.find();
        res.json(granja);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});
//endpoint 2. Crear
rutas.post('/crear', async (req, res) => {
    const granja = new granjaModel({
        nombre: req.body.nombre,
        capacidad: req.body.capacidad,
        tipo: req.body.tipo
    })
    try {
        const nuevaGranja = await granja.save();
        res.status(201).json(nuevaGranja);
    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
});
//endpoint 3. Editar
rutas.put('/editar/:id', async (req, res) => {
    try {
        const granjaEditada = await granjaModel.findByIdAndUpdate(req.params.id, req.body, { new : true });
        if (!granjaEditada)
            return res.status(404).json({ mensaje : 'granja no encontrada!!!'});
        else
            return res.status(201).json(granjaEditada);

    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
})
//ENDPOINT 4. eliminar
rutas.delete('/eliminar/:id',async (req, res) => {
    try {
       const granjaEliminada = await granjaModel.findByIdAndDelete(req.params.id);
       if (!granjaEliminada)
            return res.status(404).json({ mensaje : 'Granja no encontrada!!!'});
       else 
            return res.json({mensaje :  'granja eliminada'});    
       } 
    catch (error) {
        res.status(500).json({ mensaje :  error.message})
    }
});
// - 5. obtener una granja por su ID
rutas.get('/granja/:id', async (req, res) => {
    try {
        const granja = await granjaModel.findById(req.params.id);
        if (!granja)
            return res.status(404).json({ mensaje : 'Granja no encontrada!!!'});
        else 
            return res.json(granja);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});
// - 6. obtener granja por un tipo especifico
rutas.get('/GranjaPorTipo/:tipo', async (req, res) => {
    try {
        const granjaTipo = await granjaModel.find({ tipo: req.params.tipo});
        return res.json(granjaTipo);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

// - 7. contar el numero total de granjas
rutas.get('/totalGranjas', async (req, res) => {
    try {
        const total = await granjaModel.countDocuments();
        return res.json({totalGranja: total });
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});
// - 8. obtener granjas ordenadas por nombre ascendente
rutas.get('/ordenarGranjas', async (req, res) => {
    try {
       const granjasOrdenadas = await granjaModel.find().sort({ nombre: -1});
       res.status(200).json(granjasOrdenadas);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});



module.exports = rutas;