const Rol = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = async ( rol = '' )=>{
    const exists = await Rol.findOne({ rol });

    if(!exists){
        throw new Error(`El rol ${rol} no está registrado en la DB`);
    }
}

const esCorreoValido = async ( correo ) => {
    const existeCorreo = await Usuario.findOne({ correo });
    if(existeCorreo){
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}

const existeUsuarioById  = async ( id ) => {
    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ){
        throw new Error(`El usuario con el Id: ${id} no existe`);
    }
}

module.exports = {
    esRolValido,
    esCorreoValido,
    existeUsuarioById
}