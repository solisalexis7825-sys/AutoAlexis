require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Vehiculo = require('./models/Vehiculo');

const app = express();

// ====================== MIDDLEWARE ======================
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ====================== CONEXIÓN MONGODB ======================
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log('Error MongoDB:', err));

// ====================== GUARDAR (CREATE) ======================
app.post('/vehiculos', async (req, res) => {

    try {
        const nuevoVehiculo = new Vehiculo(req.body);
        await nuevoVehiculo.save();

        res.json({
            mensaje: 'Vehículo guardado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al guardar vehículo',
            error
        });
    }
});

// ====================== MOSTRAR TODOS (READ) ======================
app.get('/vehiculos', async (req, res) => {

    try {
        const vehiculos = await Vehiculo.find();
        res.json(vehiculos);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener vehículos',
            error
        });
    }
});

// ====================== MOSTRAR UNO (READ BY ID) ======================
app.get('/vehiculos/:id', async (req, res) => {

    try {
        const vehiculo = await Vehiculo.findById(req.params.id);

        if (!vehiculo) {
            return res.status(404).json({
                mensaje: 'Vehículo no encontrado'
            });
        }

        res.json(vehiculo);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener vehículo',
            error
        });
    }
});

// ====================== ACTUALIZAR (UPDATE) ======================
app.put('/vehiculos/:id', async (req, res) => {

    try {
        await Vehiculo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            mensaje: 'Vehículo actualizado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar vehículo',
            error
        });
    }
});

// ====================== ELIMINAR (DELETE) ======================
app.delete('/vehiculos/:id', async (req, res) => {

    try {
        await Vehiculo.findByIdAndDelete(req.params.id);

        res.json({
            mensaje: 'Vehículo eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar vehículo',
            error
        });
    }
});

// ====================== SERVIDOR ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});