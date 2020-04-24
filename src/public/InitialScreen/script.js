const socket = io()

let players = []

let myPlayer = {
    socketId: '',
    id: '',
    name: ''
}

RenderPlayerName()
SetPlayerId()
SetPlayerName()
socket.on('connect', SetPlayerSocketId)


function SetPlayerSocketId(){
    myPlayer.socketId = socket.id
    SetPlayerId()
    StorePlayerDetails()
}


function SetPlayerId(){
    myPlayer.socketId = socket.id

    if (myPlayer.id == '') {
        const oldPlayerId = sessionStorage.getItem('myPlayerId')
        
        myPlayer.id = oldPlayerId || socket.id || ''
        sessionStorage.setItem('myPlayerId', myPlayer.id)
        
        RenderPlayerName()
    }
}

function SetPlayerName(){
    const input = document.querySelector('#playerName').value
    
    if (myPlayer.name == '' || input != myPlayer.name) {
        const oldPlayerName = sessionStorage.getItem('myPlayerName')

        myPlayer.name = input || oldPlayerName || ''
        sessionStorage.setItem('myPlayerName', myPlayer.name)

        RenderPlayerName()
        StorePlayerDetails()
    }
}

function RenderPlayerName(){
    const input = document.querySelector('#playerName')

    if (myPlayer.id == '' && socket.id){
        input.disabled = true
    } else {
        input.disabled = false
        input.value = myPlayer.name
    }
}

function StorePlayerDetails(){
    if (myPlayer.name != '' && myPlayer.id != '') {       
        socket.emit('storePlayer', myPlayer)
    }
}

function RenderPlayersList(){
    const ul = document.querySelector('#playersList')
    ul.innerHTML = ''

    players.forEach(function(player){
        if (player.id != myPlayer.id && player.actived){
            ul.innerHTML += `<li onclick=StartChallenge('${player.id}')>${player.name}</li>`
        }
    })
}

function StartChallenge(opponentId){
    const gamePlayers = {
        player1: myPlayer.id,
        player2: opponentId
    }

    socket.emit('startNewChallenge')
}



socket.on('updatedPlayers', function (playersData) {
    players = playersData

    RenderPlayersList()
})