const dotenv = require('dotenv').config()
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const Events = require('./Constants/Events')
const EventsController = require('./Controllers/Events')

io.on(Events.CONNECTION, socket => {
  let connectedUsers = {}
  socket.on(Events.CLIENT_JOIN, () => {
    console.log(typeof connectedUsers)
    connectedUsers = EventsController.join({ socket, connectedUsers })
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
    connectedUsers = EventsController.changeUserName({
      socket,
      newUserName,
      connectedUsers,
    })
  })
  socket.on(Events.CLIENT_SEND_MESSAGE_TO_CHAT, msg => {
    EventsController.sendPublicMessage({ socket, msg })
  })
})

module.exports = http
