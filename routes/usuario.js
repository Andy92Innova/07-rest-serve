const { Router } = require('express');
const { usuariosGet, usuarioPost, usuarioPut, usuarioPatch, usuarioDelete } = require('../controller/usuario.controller')

const routers = Router();

routers.get('/',usuariosGet);

routers.post('/', usuarioPost);

routers.put('/:idU/:IDa', usuarioPut);

routers.patch('/', usuarioPatch);

routers.delete('/', usuarioDelete);

module.exports = routers;