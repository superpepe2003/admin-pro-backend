const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/usuario');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        
        // Verificar Email
        const usuarioDB = await Usuario.findOne({ email });

        if( !usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email/Contraseña no válida'
            })
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

        if( !validPassword ) {
            
            res.status(400).json({
                ok: false,
                msg: 'Email/Contraseña no válida'
            });
            
        }

        // Generar un TOKEN - JWT
        const token = await generarJWT( usuarioDB._id );
        res.json({
            ok: true,
            token
        });

        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    login
}