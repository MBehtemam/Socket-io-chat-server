const nanoid = require('nanoid')
/**
 * addUser
 * this method add new user to connected users list
 * @param {String} socketId unique id of socket
 * @param {Object} connectedUsers list of all connected users
 * @returns new connected users list that contain new user
 */
const addUser = (socketId, connectedUsers) => {
    if (!socketId) throw new Error('You must pass the socket id')
    if (socketId in connectedUsers)
        throw new Error('User already exist in connected users')
    return {
        ...connectedUsers,
        [socketId]: {
            username: `guest-${nanoid(5)}`,
        },
    }
}
/**
 * removeUser
 * this method get socketId and connectedUsers and remove the user
 * @param {String} socketId id of socket
 * @param {Object} connectedUsers list of connected users
 */
const removeUser = (socketId, connectedUsers) => {
    const newList = { ...connectedUsers }
    delete newList[socketId]
    return newList
}
/**
 * isUserNameExistsByUserName
 * check where given user name exists in connected users or not
 * @param {String} username username of user that we want to check is it exists or not
 * @param {Object} connectedUsers list of all connected users
 */
const isUserNameExistsByUserName = (username, connectedUsers) =>
    Object.keys(connectedUsers).some(
        u => connectedUsers[u].username === username
    )
/**
 * isUserNameExistsById
 * check is given id exists in connected in users or not
 * @param {String} id
 * @param {Object} connectedUsers
 */
const isUserNameExistsById = (id, connectedUsers) => id in connectedUsers

/**
 * changeUserNameById
 * this method change username of a user
 * @param {String} userId id of user that we want to change username of it
 * @param {String} newUserName new username for our user
 * @param {Object} connectedUsers list of connected users
 */
const changeUserNameById = (userId, newUserName, connectedUsers) => {
    if (isUserNameExistsById(userId, connectedUsers)) {
        throw new Error('username is taken')
    } else {
        let newList = {
            ...connectedUsers,
            [userId]: {
                ...connectedUsers[userId],
                username: newUserName,
            },
        }
    }
}
module.exports = {
    addUser,
    removeUser,
    isUserNameExistsByUserName,
    isUserNameExistsById,
    changeUserNameById,
}
