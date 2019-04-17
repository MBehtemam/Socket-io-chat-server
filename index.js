const server = require('./src/server')

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listen on ${process.env.SERVER_PORT}`)
})
