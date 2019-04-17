const UserControllers = require('../User/index')
const Events = require('../../Constants/Events')

const join = ({ socket, connectedUsers }) => {
  try {
    connectedUsers = UserControllers.addUser(socket.id, connectedUsers)

    //send user object to joined
    socket.emit(Events.CLIENT_JOIN, {
      ok: 1,
      data: {
        user: connectedUsers[socket.id],
        msg: 'Welcome to chatroom',
      },
    })
    socket.broadcast.emit(Events.USER_JOIN, {
      ok: 1,
      data: { user: connectedUsers[socket.id] },
    })
  } catch (err) {
    console.log(err)
    socket.emit(Events.JOIN, {
      ok: 0,
      data: {
        err,
      },
    })
  }
  return connectedUsers
}

const disconnect = ({ socket, connectedUsers }) => {
  try {
    connectedUsers = UserControllers.removeUser(socket.id, connectedUsers)
    socket.broadcast.emit(Events.USER_DISCONNECTED, {
      ok: 1,
      data: { userId: socket.id },
    })
  } catch (err) {}
}

const changeUserName = ({ socket, newUserName, connectedUsers }) => {
  try {
    connectedUsers = UserControllers.changeUserNameById(
      socket.id,
      newUserName,
      connectedUsers
    )
    socket.emit(Events.CLIENT_USER_NAME_CHANGE, {
      ok: 1,
      data: { username: connectedUsers[socket.id].username },
    })
    socket.broadcast.emit(Events.USER_USER_NAME_CHANGE, {
      ok: 1,
      data: {
        userId: socket.id,
        username: connectedUsers[socket.id].username,
      },
    })
  } catch (err) {}
}

const sendPublicMessage = ({ socket, msg }) => {
  const chatMSG = {
    msg,
    sender: socket.id,
    time: Date.now(),
  }
  socket.emit(Events.CLIENT_SEND_MESSAGE_TO_CHAT, chatMSG)
  socket.broadcast.emit(Events.CLIENT_SEND_MESSAGE_TO_CHAT, chatMSG)
}
module.exports = {
  join,
  disconnect,
  changeUserName,
  sendPublicMessage,
}
