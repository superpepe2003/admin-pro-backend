// =========================================
// /api/todo/:busqueda
// =========================================

const { Router } = require('express');
const { getTodo, getDocumentoColeccion } = require('../controllers/busquedas');
const { validarToken } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:busqueda', validarToken, getTodo);
router.get('/coleccion/:tabla/:busqueda', validarToken, getDocumentoColeccion);


module.exports = router;