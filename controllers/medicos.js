const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {

    try {

        const medicosDB = await Medico.find({})
                                      .populate('usuario', 'nombre')
                                      .populate('hospital', 'nombre');

        res.json({
            ok: true,
            medicos: medicosDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }
   
    

}
const crearMedicos = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({ ...req.body, usuario: uid });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });   
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}
const updateMedicos = (req, res = response) => {
   
    res.json({
        ok: true,
        msg: 'updateMedicos'
    });

}
const deleteMedicos = (req, res = response) => {
   
    res.json({
        ok: true,
        msg: 'deleteMedicos'
    });

}

module.exports = {
    getMedicos,
    crearMedicos,
    updateMedicos,
    deleteMedicos
}