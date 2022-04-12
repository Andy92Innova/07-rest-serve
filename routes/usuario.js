const { Router } = require('express');
const { check } = require('express-validator'); 

const { usuariosGet, usuarioPost, usuarioPut, usuarioPatch, usuarioDelete } = require('../controller/usuario.controller');

const { esRolValido, esCorreoValido, existeUsuarioById } = require('../helpers/db-validators');
const ValidarCampos  = require('../middlewares/validar-campos');


const routers = Router();

routers.get('/',usuariosGet);

routers.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(), 
    check('correo','El correo no es válido').isEmail(), 
    check('correo').custom(esCorreoValido), 
    check('password','El password debe tener mas de 6 caracteres').isLength({ min:6 }), 
    check('rol').custom(esRolValido),
    ValidarCampos
],usuarioPost);

routers.put('/:id', [
    check('id', 'No es una ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('rol').custom(esRolValido),
    ValidarCampos
],usuarioPut);

routers.patch('/', usuarioPatch);

routers.delete('/:id', [
    check('id', 'No es una ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    ValidarCampos
],usuarioDelete);

module.exports = routers;