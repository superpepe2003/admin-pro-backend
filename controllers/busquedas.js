
const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async( req, res = response ) => {
    
    const buscar = req.params.busqueda;

    const regex = new RegExp( buscar, 'i' );

    const [ usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);

    try {
        
        res.json({
            ok: true,
            usuarios,
            medicos,
            hospitales
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}


const getDocumentoColeccion = async( req, res = response ) => {
    
    const buscar = req.params.busqueda;
    const tabla = req.params.tabla;

    const regex = new RegExp( buscar, 'i' );

    let data = [];
    try {
    
        switch (tabla) {
            case 'usuarios':
                data = await Usuario.find({ nombre: regex });
                break;
            case 'medicos':
                data = await Medico.find({ nombre: regex })
                                    .populate('hospital', 'nombre img')
                                    .populate('usuario', 'nombre img');
                break;
            case 'hospitales':
                data = await Hospital.find({ nombre: regex })
                                     .populate('usuario', 'nombre img');
                break;
        
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'la tabla tiene que ser usuarios/medicos/hospitales'
                })
                break;
        }
    
        res.json({
            ok: true,
            resultados: data
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

module.exports = {
    getTodo,
    getDocumentoColeccion
}