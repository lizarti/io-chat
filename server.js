var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)

users = []
connections = []

server.listen(process.env.PORT || 3000)

console.log('Servidor está rodando')

app.use(express.static('public'));
app.get('/', function (request, response) {
  response.sendFile(__dirname + 'public/index.html')
})

io.sockets.on('connection', function (socket) {

  /* connects */
  connections.push(socket)
  console.log('Connected: %s sockets connected', connections.length)

  /* disconnects */
  socket.on('disconnect', function (data) {
    connections.splice(connections.indexOf(socket), 1)
    console.log('Disconnected: %s sockets connected', connections.length)
  })

  /* send message */
  socket.on('send message', function (data) {
    /* broadcast message */
    io.sockets.emit('new message', { message: data })
  })  
})