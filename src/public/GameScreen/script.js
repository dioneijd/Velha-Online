const socket = io()

let game = {}

const gameId = window.location.pathname.slice(1)

function RenderHeader(){
    const player1 = document.querySelector('#player1')
    const player2 = document.querySelector('#player2')
    const score1 = document.querySelector('#score1')
    const score2 = document.querySelector('#score2')

    player1.innerText = game.players[0].name.toUpperCase()
    player2.innerText = game.players[1].name.toUpperCase()
    score1.innerText = game.players[0].score
    score2.innerText = game.players[1].score    
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

function RenderWinnerSeq(){
    const winSeq = game.winnerSequence

    winSeq.forEach((cell) => {
        const el = document.querySelector(`#cell_${cell}`)
        el.classList.add("winnerSeq");
    })
}

function RenderConsoleButton(){
    const btn = document.querySelector('#btnStartTurn')
    btn.style.visibility = game.gameOver ? '' : 'hidden'
}

function RenderConsoleMessage(){
    const h3 = document.querySelector('main div.console h3')
    let msg = ''

    if (game.gameOver && game.gameTied){
        msg = 'DEU VELHA!!!'
    } else if (game.gameOver && game.winnerSequence == '') {
        msg = 'Clique para iniciar uma nova partida >>>'
    }  else if (game.gameOver) {
        msg = `${game.turnPlayer.name.toUpperCase()} você ganhou!!!!`
    } else {
        msg = `${game.turnPlayer.name.toUpperCase()} é sua vez de jogar.`
    }

    h3.innerText = msg
}


function MakeTurn(cell_id){
    socket.emit('makeTurn', {gameId, cell_id} )
}

function StartTurn(){
    socket.emit('startNewTurn', gameId)
}


socket.on('connect', function(){
    socket.emit('requestGameData', gameId)
})


socket.on('gameDataUpdated', function(gameData){
    if (gameData.id == gameId){
        game = gameData    
        RenderHeader()
        RenderBoard()
        RenderConsoleButton()
        RenderConsoleMessage()
    
        if (game.winnerSequence != '') RenderWinnerSeq()
    } else {
        console.log(`socket: gameUpdated - Game id is not equal`)
    }
})




