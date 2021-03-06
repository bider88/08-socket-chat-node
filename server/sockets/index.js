const { io } = require('../server')
const { User } = require('../classes/user')
const { createMessage } = require('../utils/utils')

const user = new User()

io.on('connection', (client) => {
    
    client.on('inChat', (data, callback) => {

        if ( !data.name ) { return callback({ ok: false, message: 'name is required' }) }

        if ( !data.channel ) { return callback({ ok: false, message: 'channel is required' }) }

        client.join(data.channel)

        user.addPerson( client.id, data.name, data.channel )

        client.broadcast.to(data.channel).emit('listenPersons', user.getPersonsPerChannel(data.channel) )

        client.broadcast.to(data.channel).emit('createMessage', createMessage('Admin', `<b> ${data.name} </b> se unió`))

        callback(user.getPersonsPerChannel(data.channel))
    })

    client.on('createMessage', (data, callback) => {

        const person = user.getPerson(client.id)

        const message = createMessage(person.name, data.message)

        client.broadcast.to(person.channel).emit('createMessage', message)

        callback(message )
    })

    client.on('disconnect', () => {
        const personDeleted = user.deletePerson( client.id )

        if (personDeleted) {
            client.broadcast.to(personDeleted.channel).emit('createMessage', createMessage('Admin', `<b> ${personDeleted.name} </b> salió`))
        }

        if (personDeleted) {
            client.broadcast.to(personDeleted.channel).emit('listenPersons', user.getPersonsPerChannel(personDeleted.channel))
        }
    })

    // private messages 

    client.on('privateMessage', (data, callback) => {
        if ( !data.to ) {
            return callback({
                ok: false,
                message: 'user to send private message is required'
            })
        }

        if ( !data.message ) {
            return callback({
                ok: false,
                message: 'message is required'
            })
        }

        const person = user.getPerson(client.id)

        client.broadcast.to(data.to).emit('privateMessage', createMessage(person.name, data.message))
    })

})