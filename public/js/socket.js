var socket = io()

var params = new URLSearchParams( window.location.search )

var instances1, instances2;

var modal1 = document.getElementById('modal1');
var modal2 = document.getElementById('modal2');

instances1 = M.Modal.init( modal1, { onCloseEnd: function() { window.location = 'index.html' } });
instances2 = M.Modal.init( modal2, { onCloseEnd: function() { window.location = 'index.html' } });

if ( !params.has('name') ) { instances1.open(); }
if ( !params.has('channel') ) { instances2.open(); }

var user = {
    name: params.get('name'),
    channel: params.get('channel')
}

socket.on('connect', function() {
    console.log('Connect to server')

    socket.emit('inChat', user,
    function( res ) {
        if ( ! res.ok && res.message === 'name is required') {
            instances1.open();
        }
        if ( ! res.ok && res.message === 'channel is required') {
            instances2.open();
        }
        console.log('Usuarios conectados ', res )
    })
})

socket.on('disconnect', function() {
    console.log('Connection missing with server')
})

// emit/send message 
// socket.emit('createMessage', {
// 	message: 'Hola a todos'
// })

// listen information
socket.on('createMessage', function(msg) {
    if (msg.length) {
        console.log('servidor', msg);
    }
})

socket.on('listenPersons', function(persons) {
    console.log( persons );
})

// private messages

socket.on('privateMessage', function(message) {
    console.log('Mensaje privado', message);
})