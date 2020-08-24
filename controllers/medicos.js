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
const updateMedicos = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medicoDB = await Medico.findById( id );

        if( !medicoDB ){

            return res.status(404).json({
                ok: false,
                msg: 'El medico no existe con ese id'
            });
        }

        const datosModificar = {
            ...req.body,
            usuario: uid
        }

        const medicoModificado = await Medico.findByIdAndUpdate( id, datosModificar, { new: true});
        
        res.json({
             ok: true,
             medico: medicoModificado
         });
         
    } catch (error) {
            
        res.status(500).json({
            ok: false,
            msg: 'comuniquese con el administrador'
        });
        
    }

}
const deleteMedicos = async(req, res = response) => {
   
    const id = req.params.id;

    try {

        const medicoDB = await Medico.findById( id );

        if( !medicoDB ){

            return res.status(404).json({
                ok: false,
                msg: 'El medico no existe con ese id'
            });
        }

        await Medico.findByIdAndDelete( id );
        
        res.json({
             ok: true,
             medico: 'El medico se elimino correctamente'
         });
         
    } catch (error) {
            
        res.status(500).json({
            ok: false,
            msg: 'comuniquese con el administrador'
        });
        
    }

}

module.exports = {
    getMedicos,
    crearMedicos,
    updateMedicos,
    deleteMedicos
}