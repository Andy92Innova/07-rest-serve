const express = require('express')
const cors = require('cors');
const routers = require('../routes/usuario');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.apiUsuario = '/api/usuario';
        //midlewares
        this.midlewares();

        //routes
        this.routes();
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