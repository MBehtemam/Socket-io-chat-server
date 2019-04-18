const dotenv = require('dotenv').config()
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const Events = require('./Constants/Events')
const EventsController = require('./Controllers/Events')
var people = {}
var connectedUsers = {}

io.on(Events.CONNECTION, socket => {
    socket.on(Events.CLIENT_JOIN, () => {
        const result = EventsController.join({
            socket,
            connectedUsers: people,
        })
        Object.assign(people, result)
    })

    socket.on(
        Events.CLIENT_DISCONNECT,
        () =>
            (connectedUsers = EventsController.disconnect({
                socket,
                connectedUsers,
            }))
    )
    socket.on(Events.CLIENT_USER_NAME_CHANGE, ({ newUserName }) => {
        const result = EventsController.changeUserName({
            socket,
            newUserName,
            connectedUsers: people,
        })
        Object.assign(people, result)
    })
    socket.on(Events.CLIENT_SEND_MESSAGE_TO_CHAT, msg => {
        EventsController.sendPublicMessage({ socket, msg })
    })
})

module.exports = http
