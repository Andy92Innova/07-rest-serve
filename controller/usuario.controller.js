const { response } = require('express');

const usuariosGet = (req, res = response) => {

    const query = req.query;

    const { q, nombre = '', page = 1, limit } = req.query;

    res.json({
        msg:'get url - controller',
        query,
        q,
        nombre,
        page,
        limit
    });
};

const usuarioPost = (req, res = response) => {
    const body = req.body;
    const { nombre, edad } = req.body;

    res.json({
        msg:'post url - controller',
        body,
        nombre,
        edad
    });
};
const usuarioPut = (req, res = response) => {

    const id = req.params;

    res.json({
        msg:'put url - controller',
        id
    });
};
const usuarioPatch = (req, res = response) => {
    res.json({
        msg:'patch url - controller'}
        );
};
const usuarioDelete = (req, res = response) => {
    res.json({
        msg:'delete url - controller'}
        );
};

module.exports = {
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioPatch,
    usuarioDelete
}
