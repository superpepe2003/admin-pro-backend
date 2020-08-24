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
const updateHospital = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospitalDB = await Hospital.findById( id );

        if( !hospitalDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el hospital por ese id'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }
        const hospitalActualizado =  await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true });
        
        res.json({
            ok: true,
            hospital: hospitalActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
   
}
const deleteHospital = async(req, res = response) => {

    const id = req.params.id;

    try {
        
        const hospitalDB = await Hospital.findById( id );

        if( !hospitalDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el hospital por ese id'
            });
        }

        await Hospital.findByIdAndDelete( id );
        
        
         res.json({
             ok: true,
             msg: 'Hospital Borrado'
         });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

module.exports = {
    getHospitales,
    crearHospital,
    updateHospital,
    deleteHospital
}