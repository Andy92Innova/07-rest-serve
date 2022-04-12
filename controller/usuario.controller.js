const { request,response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');


const usuariosGet = async (req = request, res = response) => {

    const { desde, limit } = req.query;

    const query = { estado: true };

    const [ usuarios, total ] = await Promise.all([
        Usuario.find( query )
            .skip(Number( desde ))
            .limit(Number( limit )),
        Usuario.countDocuments( query )
    ]);

    res.json({
        total,
        usuarios
    });
};

const usuarioPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    
    const usuario = new Usuario( { nombre, correo, password, rol } );

    //encriptar el correo
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    //guardar
    await usuario.save();
    res.json({
        usuario
    });



};
const usuarioPut = async (req, res = response) => {

    const { id } = req.params;

    const { _id, password, correo, gloogle , ...resto } = req.body;

    if( password ){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );
    }

    const usuario = await  Usuario.findByIdAndUpdate(id, resto, { new: true } );

    res.json({
        msg:'put url - controller',
        usuario
    });
};
const usuarioPatch = (req, res = response) => {
    res.json({
        msg:'patch url - controller'}
        );
};
const usuarioDelete = async (req, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new : true });

    res.json({
        msg:'El usuario fue eliminado',
        usuario
    });
};

module.exports = {
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioPatch,
    usuarioDelete
}
