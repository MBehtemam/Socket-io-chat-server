const {
    addUser,
    removeUser,
    isUserNameExists,
    changeUserNameById,
} = require('./index')

describe('Test suits for addUser', () => {
    test('add new user', () => {
        let connectedUsers = {}
        const socketId = 'myid'
        connectedUsers = addUser(socketId, connectedUsers)
        expect(connectedUsers).toHaveProperty(socketId)
    })

    test('new user must have username', () => {
        let connectedUsers = {}
        const socketId = 'myid'
        connectedUsers = addUser(socketId, connectedUsers)
        expect(connectedUsers[socketId]).toHaveProperty('username')
    })
})

describe('Test suits for removeUser', () => {
    test('remove user', () => {
        let connectedUsers = { myId: { username: 'guest' } }
        const socketId = 'myid'
        connectedUsers = removeUser(socketId, connectedUsers)
        expect(connectedUsers).not.toHaveProperty(socketId)
    })
})

describe('Test suits for isUserNameExistsByUserName', () => {
    const usernameExists = 'myusername'
    const userNameNotExists = 'notusername'
    const connectedUsers = { 'guest-110': { username: usernameExists } }
    test('that list has username', () => {
        expect(isUserNameExists(usernameExists, connectedUsers)).toBeTruthy()
    })
    test('that list has not this user', () => {
        expect(isUserNameExists(userNameNotExists, connectedUsers)).toBeFalsy()
    })
})

describe('Test suits for change username by id', () => {
    const userId = 'someid'
    const username = 'guest-110'
    const newusername = 'guest-112'
    const existUserName = 'guest-111'
    let connectedUsers = { [userId]: { username } }
    test('it should change the username', () =>
        expect(
            changeUserNameById(userId, newusername, connectedUsers)[userId]
                .username
        ).toBe(newusername))
})
