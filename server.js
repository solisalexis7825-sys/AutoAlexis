require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Vehiculo = require('./models/Vehiculo');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('MongoDB conectado'))
.catch(err=>console.log(err));

app.post('/vehiculos', async(req,res)=>{

    const nuevoVehiculo = new Vehiculo(req.body);

    await nuevoVehiculo.save();

    res.json({
        mensaje:'Vehículo guardado'
    });

});

app.get('/vehiculos', async(req,res)=>{

    const vehiculos = await Vehiculo.find();

    res.json(vehiculos);

});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Servidor en puerto ${PORT}`);
});