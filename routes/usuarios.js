// =========================================
// RUTA: /api/usuarios
// =========================================

const { Router } = require('express');
const { getUsuarios, crearUsuarios, updateUsuarios, deleteUsuario } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar');
const { validarToken, validarAdmin, validarAdminOIgual } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', [ validarToken ], getUsuarios );

router.post( '/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ], 
    crearUsuarios );

router.put( '/:id',
            [
                validarToken,
                validarAdminOIgual,
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').isEmail(),
                check('role', 'El Role es obligatorio').not().isEmpty(),
                validarCampos,
            ], updateUsuarios );

router.delete( '/:id', [validarToken, validarAdmin], deleteUsuario);

module.exports = router;