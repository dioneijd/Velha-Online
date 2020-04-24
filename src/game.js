let game = {
    players: [
        {
            id: '',
            name: 'dionei',
            score: 0,
            symbol: 'X',
        },
        {
            id: '',
            name: 'manu',
            score: 0,
            symbol: 'O',
        },
    ],
    turnPlayer: {
        id: 0,
        name: '',
        score: 0,
        symbol: ''
    },
    numberOfTurns: 0,
    board: ['','','','','','','','',''],
    gameOver: true,
    gameTied: false,
    winnerSequence: []

}


const winSequence = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]


function StorePlayer(newPlayer){
    const playerId = game.players.findIndex(player => player.socketId == newPlayer.socketId)

    if (playerId){

        newPlayer = {
            ...newPlayer, 
            score: 0,
            symbol: ''
        }

        game.players[playerId] = newPlayer
    } else {
        game.players.push(player)
    }    
}


function StartNewGameTurn(){
    game.board.fill('')
    game.winnerSequence = []
    game.numberOfTurns ++
    game.gameOver = false
    game.gameTied = false
    SetNextPlayer()
}


function MakeTurn(id){
    if (game.board[id] == '' && !game.gameOver) {
        
        const player = game.turnPlayer        
        game.board[id] = player.symbol

        CheckWinningSeq()
        CheckGameTied()
        
        if (!game.gameOver) {
            SetNextPlayer()
        }
    }
}



function CheckWinningSeq(){
    const symbol = game.turnPlayer.symbol
   
    for (i in winSequence) {
        if (
            game.board[winSequence[i][0]] == symbol &&
            game.board[winSequence[i][1]] == symbol &&
            game.board[winSequence[i][2]] == symbol
        ){
            game.gameOver = true
            game.winnerSequence = winSequence[i]
            AddScore()
        }
    }
}

function CheckGameTied(){
    const emptyCell = game.board.find(cell => cell == '')

    if (emptyCell != ''){
        game.gameOver = true
        game.gameTied = true
    }
}


function SetNextPlayer(){
    const nextPlayerSeq = game.turnPlayer.sequence == 0 ? 1 : 0
    const nextPlayer = game.players[nextPlayerSeq]

    game.turnPlayer = {sequence: nextPlayerSeq, ...nextPlayer} 
}

function AddScore(){
    const playerId = game.turnPlayer.sequence
    game.players[playerId].score ++    
}



module.exports = {
    game,
    StorePlayer,
    StartNewGameTurn,
    MakeTurn
}




