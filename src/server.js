require('dotenv').config()

var express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var path = require('path')



const routes = require('./routes.js')
const port = process.env.PORT || 3334

console.log(path.join(__dirname, 'public', 'GameScreen'))

app.use(express.static(path.join(__dirname, 'public')))
//app.use('InitialScreen', express.static(path.join(__dirname, 'public', 'InitialScreen')))
app.use(express.json())
app.use(routes)


const gameController = require('./game.js')
const playerController = require('./player.js')


let games = []

io.on('connection', (socket) => {
  console.log('a user connected. ID:', socket.id)


  socket.emit('gameUpdated', gameController.game)
  socket.broadcast.emit('gameUpdated', gameController.game)



  socket.on('storePlayer', (player) => {
    playerController.StorePlayerDetails(player)

    socket.emit('updatedPlayers', playerController.players)
    socket.broadcast.emit('updatedPlayers', playerController.players)
  })


  socket.on('startNewChallenge', (gamePlayers) => {

  })



  socket.on('startNewTurn', () => {
    gameController.StartNewGameTurn()
    socket.emit('gameUpdated', gameController.game)
    socket.broadcast.emit('gameUpdated', gameController.game)
    
  })



  socket.on('turnMade', (data)=>{
    if(data.cell_id >= 0){
      gameController.MakeTurn(data.cell_id)
    
      socket.emit('gameUpdated', gameController.game)
      socket.broadcast.emit('gameUpdated', gameController.game)      
    }
  })

  


  socket.emit('testConnection', 'oi?')
  socket.on('teste', (msg)=>console.log(msg))

})

  
http.listen(port, () => {
  console.log(`Server running and listening on port: ${port}`);
});