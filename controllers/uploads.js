const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');


const fileUpload = ( req, res = response) => {

    const { tipo, id } = req.params;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    // Validar que sea 1 tipo válido
    if( !tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg: 'No es una medicos/usuarios/hospitales el tipo'
        });
    }

    // Validar que exista 1 archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'});
    }

    // Procesar la imagen....
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.'); 
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    // Validar extensión
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if( !extensionesValidas.includes(extensionArchivo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión válida'
        });
    }

    // Generar el nombre del archivo único
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    file.mv( path, ( err ) => {
        if( err ){
            return res.status(500).json({
                ok: false,
                msg: 'No se pudo guardar la imagen'
            });
        }

        // Actualizar Base de datos
        actualizarImagen( tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'La imagen se guardo correctamente!',
            nombreArchivo
        });

    });

};

const retornaImagen = ( req, res=response ) => {
    const { tipo, foto } = req.params;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );

    // Imagen por defecto
    if( fs.existsSync( pathImg )){
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/noimage.png` );
        res.sendFile( pathImg );
    }

}

module.exports = {
    fileUpload,
    retornaImagen
}