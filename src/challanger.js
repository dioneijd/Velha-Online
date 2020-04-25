const game = require('./game.js')
const players = require('./player.js').players
const crypto = require('crypto')


games = []


function StartNewChallange(gamePlayers){

    const player1 = players.find(p => p.id == gamePlayers.player1)
    const player2 = players.find(p => p.id == gamePlayers.player2)
    
    delete player1.socketId
    delete player2.socketId

    player1.score = 0
    player2.score = 0

    player1.symbol = 'X'
    player2.symbol = 'O'

    const newGame = {...game}

    newGame.data.id = crypto.randomBytes(4).toString('HEX'),
    newGame.data.players = [player1, player2]    

    games.push(newGame)

    // console.log(games)
    // console.log(games[0].players)

}

function GetGameById(gameId){
    return games.find(g => g.data.id == gameId)
}

module.exports = {
    games,
    StartNewChallange,
    GetGameById
}