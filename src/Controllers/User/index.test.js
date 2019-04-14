const {
    addUser,
    removeUser,
    isUserNameExistsByUserName,
    isUserNameExistsById,
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
        expect(
            isUserNameExistsByUserName(usernameExists, connectedUsers)
        ).toBeTruthy()
    })
    test('that list has not this user', () => {
        expect(
            isUserNameExistsByUserName(userNameNotExists, connectedUsers)
        ).toBeFalsy()
    })
})
describe('Test suits for isUserNameExistsById', () => {
    const existsId = 'guest-110'
    const notExistsId = 'guest-111'
    const connectedUsers = { 'guest-110': { username: 'someuser' } }
    test('that list has username', () => {
        expect(isUserNameExistsById(existsId, connectedUsers)).toBeTruthy()
    })
    test('that list has not this user', () => {
        expect(isUserNameExistsById(notExistsId, connectedUsers)).toBeFalsy()
    })
})
