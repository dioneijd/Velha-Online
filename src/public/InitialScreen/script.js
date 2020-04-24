const socket = io()

let players = []

let myPlayer = {
    id: '',
    name: ''
}

RenderPlayerName()
SetPlayerId()
SetPlayerName()
socket.on('connect', SetPlayerId)



function SetPlayerId(){
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

    if (myPlayer.id == ''){
        input.disabled = true
        // input.value = 'CARREGANDO ...'
    } else {
        input.disabled = false
        input.value = myPlayer.name
    }
}

function StorePlayerDetails(){
    const myPlayerId = sessionStorage.getItem('myPlayerId')
    const myPlayerName =  document.querySelector('#playerName').value

    if (myPlayerName != '' && myPlayerId != '') {
        sessionStorage.setItem('myPlayerName', myPlayerName)        
        const player = {
            id: myPlayerId,
            name: myPlayerName
        }
        
        RenderPlayerName()        
        socket.emit('storePlayer', player)
    }
}


function RenderPlayersList(){
    const myPlayerId = sessionStorage.getItem('myPlayerId')
    const ul = document.querySelector('#playersList')
    ul.innerHTML = ''

    players.forEach(function(player){
        if (player.id != myPlayerId){
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