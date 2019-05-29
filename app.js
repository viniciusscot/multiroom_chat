var app = require('./config/server');

var server = app.listen(80, () => console.log("Server ON"))

var io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', (socket) => {
    console.log("usuario conectou");

    socket.on('disconnect', () => {
        console.log("Usuario desconectou");
    });

    socket.on('msgParaServidor', data => {
        socket.emit('msgParaCliente', { ...data, apelido: "Eu" })
        socket.broadcast.emit('msgParaCliente', { ...data })

        socket.emit('participantesParaClientes', data.apelido)
        socket.broadcast.emit('participantesParaClientes', data.apelido)
    })
})