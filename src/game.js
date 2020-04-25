let data = {
    id: '', 
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
    const playerId = data.players.findIndex(player => player.socketId == newPlayer.socketId)

    if (playerId){

        newPlayer = {
            ...newPlayer, 
            score: 0,
            symbol: ''
        }

        data.players[playerId] = newPlayer
    } else {
        data.players.push(player)
    }    
}


function StartNewGameTurn(){
    data.board.fill('')
    data.winnerSequence = []
    data.numberOfTurns ++
    data.gameOver = false
    data.gameTied = false
    SetNextPlayer()
}


function MakeTurn(id){
    if (data.board[id] == '' && !data.gameOver) {
        
        const player = data.turnPlayer        
        data.board[id] = player.symbol

        CheckWinningSeq()
        CheckGameTied()
        
        if (!data.gameOver) {
            SetNextPlayer()
        }
    }
}



function CheckWinningSeq(){
    const symbol = data.turnPlayer.symbol
   
    for (i in winSequence) {
        if (
            data.board[winSequence[i][0]] == symbol &&
            data.board[winSequence[i][1]] == symbol &&
            data.board[winSequence[i][2]] == symbol
        ){
            data.gameOver = true
            data.winnerSequence = winSequence[i]
            AddScore()
        }
    }
}

function CheckGameTied(){
    const emptyCell = data.board.find(cell => cell == '')

    if (emptyCell != ''){
        data.gameOver = true
        data.gameTied = true
    }
}


function SetNextPlayer(){
    const nextPlayerSeq = data.turnPlayer.sequence == 0 ? 1 : 0
    const nextPlayer = data.players[nextPlayerSeq]

    data.turnPlayer = {sequence: nextPlayerSeq, ...nextPlayer} 
}

function AddScore(){
    const playerId = data.turnPlayer.sequence
    data.players[playerId].score ++    
}



module.exports = {
    data,
    StorePlayer,
    StartNewGameTurn,
    MakeTurn
}




