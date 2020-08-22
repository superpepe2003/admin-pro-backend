// =========================================
// RUTA: /api/hospitales
// =========================================

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar');

const { validarToken } = require('../middlewares/validar-jwt');
const { getHospitales, crearHospital, updateHospital, deleteHospital } = require('../controllers/hospitales');

const router = Router();

router.get( '/', validarToken, getHospitales );

router.post( '/', 
    [ 
        validarToken,
        check('nombre', 'El nombre de hospital es necesario').not().isEmpty(),
        validarCampos
    ], 
    crearHospital );

router.put( '/:id',
            [], updateHospital );

router.delete( '/:id', validarToken, deleteHospital);

module.exports = router;