var socket = io()

socket.on('connect', function() {
    console.log('Connect to server')
})

socket.on('disconnect', function() {
    console.log('Connection missing with server')
})

// send information
socket.emit('sendMessage', {
    user: 'Irvig Didier',
    message: 'Hello world'
}, function(res) {
    console.log('res server:', res);
})

// listen information
socket.on('sendMessage', function(msg) {
    console.log('servidor', msg);
})