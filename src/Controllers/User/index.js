const nanoid = require('nanoid');
/**
 * addUser
 * this method add new user to connected users list
 * @param {String} socketId unique id of socket
 * @param {Object} connectedUsers list of all connected users
 * @returns new connected users list that contain new user
 */
const addUser = (socketId, connectedUsers) => {
  if (!socketId) throw new Error('You must pass the socket id');
  if (socketId in connectedUsers) throw new Error('User already exist in connected users');
  return {
    ...connectedUsers,
    [socketId]: {
      username: `guest-${nanoid(5)}`,
    },
  };
};

const removeUser = (socketId, connectedUsers) => {
  const newList = { ...connectedUsers };
  delete newList[socketId];
  return newList;
};
module.exports = {
  addUser,
  removeUser,
};
