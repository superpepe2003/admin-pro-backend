// =========================================
// /api/upload/:tipo/:id
// =========================================

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validarToken } = require('../middlewares/validar-jwt');
const { fileUpload, retornaImagen } = require('../controllers/uploads');

const router = Router();

router.use( expressFileUpload() );

router.put('/:tipo/:id', validarToken, fileUpload );
router.get('/:tipo/:foto', retornaImagen );

module.exports = router;