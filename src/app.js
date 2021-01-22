//corremos la aplicacion en la terminar con 'npm run dev'
const express = require('express');
const app= express();

//creamos un servido http apartir de la libreria de express
const http= require('http').Server(app);
//para generar una comunicacion vamos atrabajar con soscketio
const io = require('socket.io')(http);

//rutas
app.use(require('./routes/littlezoom.routes'));

//donde se cargaran los html a trabjar
app.use(express.static(__dirname + "/public"));

//recivimos un evento de conexion que vendra desde otro archivo. Este servira como canal de comunicacion en els ervidor que se esta trabajando
io.on('connection', (socket) =>{
    socket.on('stream', (image) =>{//recivimos el evento del estream
        //emitimos el evento a todos los sockets conectados
        socket.broadcast.emit('stream',  image);
    })
})


module.exports = http;