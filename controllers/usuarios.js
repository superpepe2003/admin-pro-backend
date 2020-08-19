const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    });
    
}


const crearUsuarios = async(req, res = response) => {

    const { email, password, nombre} =  req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        const usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        const token = await generarJWT(usuario._id);

        res.json({
            ok: true,
            usuario,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en la Base de Datos'
        });
    }

    
}

const updateUsuarios = async( req, res = response) => {

    // TODO: Validar token y comprobar si el usuario es correcto

    const uid = req.params.id;
    
    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        const { password, google, email, ...campos} = req.body;

        if( usuarioDB.email !== email ){
            const existeEmail = await Usuario.findOne({ email });
            if( existeEmail ){
                return res.status().json({
                    ok: false,
                    msg: 'El email que quiere modificar esta en uso'
                })
            }
            campos.email = email;
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );
        

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log('Error ', error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const deleteUsuario = async( req, res = response) => { 

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })
        
    } catch (error) {
        console.log('Error ', error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

module.exports = {
    getUsuarios,
    crearUsuarios,
    updateUsuarios,
    deleteUsuario
}