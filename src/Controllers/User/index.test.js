const { addUser, removeUser } = require('./index');

describe('Test suits for addUser', () => {
  test('add new user', () => {
    let connectedUsers = {};
    const socketId = 'myid';
    connectedUsers = addUser(socketId, connectedUsers);
    expect(connectedUsers).toHaveProperty(socketId);
  });

  test('new user must have username', () => {
    let connectedUsers = {};
    const socketId = 'myid';
    connectedUsers = addUser(socketId, connectedUsers);
    expect(connectedUsers[socketId]).toHaveProperty('username');
  });
});

describe('Test suits for removeUser', () => {
  test('remove user', () => {
    let connectedUsers = { myId: { username: 'guest' } };
    const socketId = 'myid';
    connectedUsers = removeUser(socketId, connectedUsers);
    expect(connectedUsers).not.toHaveProperty(socketId);
  });
});
