let game = {
    players: [
        {
            socketId: '',
            name: 'dionei',
            score: 0,
            symbol: 'X',
        },
        {
            socketId: '',
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
    numberOfGames: 0,
    board: ['','','','','','','','',''],
    gameOver: true

}

const winSequence = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]
    

function StartTurn(){
    game.board.fill('')
    game.numberOfGames ++
    game.gameOver = false
    SetNextPlayer()
    RenderBoard()
}


function SetNewPlayer(player){
    
}




function MakeTurn(id){
    if (game.board[id] == '' && !game.gameOver) {

        const player = game.turnPlayer        
        game.board[id] = player.symbol

        RenderBoard()
        CheckWinningSeq()
        SetNextPlayer()
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
            RenderWinnerSeq(i)
            AddScore()
            RenderHeader()
            SetConsoleMessage('Clique para iniciar uma nova partida >>>')
        }
    }
}

// function WhoIsNextPlayer() {
//     return game.turnPlayer.id == 0 ? 1 : 0
// }

function SetNextPlayer(){
    if (!game.gameOver) {
        const nextPlayerId = game.turnPlayer.id == 0 ? 1 : 0
        const nextPlayer = game.players[nextPlayerId]

        game.turnPlayer = {id: nextPlayerId, ...nextPlayer} 

        
        SetConsoleMessage(`${nextPlayer.name.toUpperCase()} é sua vez`)
        ToggleButtonVisible()
    }
}

function AddScore(){
    const playerId = game.turnPlayer.id
    game.players[playerId].score ++    
}


function RenderBoard(){
    let content = '';        
    const board = document.querySelector('main .board')
    for (i in game.board){
        content += '<div id="cell_' + i + '" class="cell" onclick="MakeTurn(' + i + ')">'+ game.board[i] +'</div>'
    }
    if (board){
        document.querySelector('main .board').innerHTML = content
    }
}

// function RenderWinnerSeq(seqId){

//     const winSeq = winSequence[seqId]

//     winSeq.forEach((cell) => {
//         const el = document.querySelector(`#cell_${cell}`)
//         el.classList.add("winnerSeq");
//     })

// }

// function ToggleButtonVisible(){
//     const btn = document.querySelector('#btnStartTurn')

//     btn.style.visibility = btn.style.visibility == 'hidden' ? 'none' : 'hidden'
// }

// function SetConsoleMessage(msg){
//     const h3 = document.querySelector('main div.console h3')
//     h3.innerText = msg
// }

RenderHeader()
RenderBoard()
SetNextPlayer()







