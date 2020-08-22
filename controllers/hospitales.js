const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) => {

    try {

        const hospitalesDB = await Hospital.find({})
                                           .populate('usuario', 'nombre img');

        res.json({
            ok: true,
            hospitales: hospitalesDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}
const crearHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital( { ...req.body, usuario: uid} );

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}
const updateHospital = (req, res = response) => {
   
    res.json({
        ok: true,
        msg: 'updateHospital'
    });

}
const deleteHospital = (req, res = response) => {
   
    res.json({
        ok: true,
        msg: 'deleteHospital'
    });

}

module.exports = {
    getHospitales,
    crearHospital,
    updateHospital,
    deleteHospital
}