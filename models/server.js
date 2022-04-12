const express = require('express')
const cors = require('cors');
const routers = require('../routes/usuario');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.apiUsuario = '/api/usuario';

        //conectar a base de datos
        this.conectarDB();

        //midlewares
        this.midlewares();

        //routes
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    midlewares(){
        this.app.use( cors() );
        //lectura y parseo a JSON
        this.app.use( express.json() );
        
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use( this.apiUsuario, routers );
    }
    
    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Servidor corriendo en puerto", this.port);
        })
    }


}

module.exports = Server;