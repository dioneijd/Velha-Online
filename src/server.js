require('dotenv').config()
const port = process.env.PORT || 3334

var express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path')

const routes = require('./routes.js')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(routes)


const playerController = require('./player.js')
const challengerController = require('./challanger.js')

io.on('connection', (socket) => {
  console.log('a user connected. ID:', socket.id)



  // INITIAL SCREEN
  socket.on('storePlayer', player => {
    playerController.StorePlayerDetails(player)

    socket.emit('updatedPlayers', playerController.players)
    socket.broadcast.emit('updatedPlayers', playerController.players)
  })

  socket.on('startNewChallenge', gamePlayers => {
    challengerController.StartNewChallange(gamePlayers)

    const game = challengerController.games[games.length-1]

    socket.emit('newChallengeStarted', game.data)
    socket.broadcast.emit('newChallengeStarted', game.data)
    socket.broadcast.emit('updatedPlayers', playerController.players)
  })


  // GAME SCREEN
  socket.on('requestGameData', (gameId) => {
    const game = challengerController.GetGameById(gameId)

    if(game){
      socket.emit('gameDataUpdated', game.data)
    }
  })

  socket.on('startNewTurn', (gameId) => {
    const game = challengerController.GetGameById(gameId)
    
    if (game){
      game.StartNewGameTurn()
  
      socket.emit('gameDataUpdated', game.data)
      socket.broadcast.emit('gameDataUpdated', game.data)    
    }
  })

  socket.on('makeTurn', (data) => {
    if(data.cell_id >= 0){
      const game = challengerController.GetGameById(data.gameId)

      if (game){
        game.MakeTurn(data.cell_id)
      
        socket.emit('gameDataUpdated', game.data)
        socket.broadcast.emit('gameDataUpdated', game.data)      
      }
    }
  })


  // OTHERS
  socket.on('disconnect', () => {
    playerController.MakeInactive(socket.id)
    socket.broadcast.emit('updatedPlayers', playerController.players)
  })

})

  
http.listen(port, () => {
  console.log(`Server running and listening on port: ${port}`);
});