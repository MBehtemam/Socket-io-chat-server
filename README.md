# Chat with Socket.io and React

## How to run

To run the project you must clone 2 project. one of project is Server and the other is client so clone both of these projects;
[Server](<[https://github.com/MBehtemam/Socket-io-chat-server](https://github.com/MBehtemam/Socket-io-chat-server)>)
[Client](<[https://github.com/MBehtemam/socket-io-chat-client-react](https://github.com/MBehtemam/socket-io-chat-client-react)>)

after that run `npm install` in both projects. before run the client you must change the url of server in `.env` file in client directory. for example if you run the server on `http://localhost:3002` change the `REACT_APP_SERVER_URL` to `REACT_APP_SERVER_URL = http://localhost:3002`

## Test

In both project I used `Jest` for test. so you can run `yarn test` for run th
