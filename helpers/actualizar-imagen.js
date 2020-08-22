const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

borrarPathViejo = ( pathViejo ) => {
    if( fs.existsSync( pathViejo ) ) {
        // Borrar imagen anterior
        fs.unlinkSync( pathViejo );
    }
}

const actualizarImagen = async( tipo, id, nombreArchivo ) => {

    switch ( tipo ) {
        case 'usuarios':
            const usuario = await Usuario.findById( id );
            if( !usuario ) {
                return false;
            }

            borrarPathViejo(`./uploads/usuarios/${ usuario.img }`);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;
        case 'medicos':
            const medico = await Medico.findById( id );
            if( !medico ) {
                return false;
            }

            borrarPathViejo(`./uploads/medicos/${ medico.img }`);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

            break;
        case 'hospitales':
            const hospital = await Hospital.findById( id );
            if( !hospital ) {
                return false;
            }

            borrarPathViejo(`./uploads/hospitales/${ hospital.img }`);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

            break;
    
        default:
            break;
    }

}

module.exports = {
    actualizarImagen
}