const { io } = require('../server')

io.on('connection', (client) => {
    console.log('client connected')

    client.emit('sendMessage', {
        user: 'Admin',
        message: 'Welcome to app chat'
    })

    client.on('disconnect', () => {
        console.log('client disconnected')
    })

    client.on('sendMessage', (data, callback) => {
        console.log(data);

        client.broadcast.emit('sendMessage', data);
        
        // if (msg.user) {
        //     callback({
        //         resp: 'todo bien'
        //     })
        // } else {
        //     callback({
        //         resp: 'todo mal'
        //     })
        // }
    })
})