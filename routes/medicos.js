// =========================================
// RUTA: /api/medicos
// =========================================

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar');

const { validarToken } = require('../middlewares/validar-jwt');
const { getMedicos, crearMedicos, updateMedicos, deleteMedicos } = require('../controllers/medicos')
const router = Router();

router.get( '/', validarToken, getMedicos );

router.post( '/', 
    [ 
        validarToken,
        check('nombre', 'El nombre es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser valido').isMongoId(),
        validarCampos
    ], 
    crearMedicos );

router.put( '/:id',
            [], updateMedicos );

router.delete( '/:id', validarToken, deleteMedicos);

module.exports = router;