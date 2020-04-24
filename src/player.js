let player = {
    id: '',    
    name: '',
    totalScore: 0,
    actived: true,
    socketId: ''
}

let players = []



function StorePlayerDetails(player){
    const playersId = players.findIndex(p => p.id == player.id)

    if (playersId >= 0) {
        player = {...player, actived: true}
        players[playersId] = player
    } else {
        player = {...player, totalScore: 0, actived: true}
        players.push(player)
    }

}

function MakeInactive(socketId){
    const playersIndex = players.findIndex(p => p.socketId == socketId)
    if (playersIndex >= 0) {
        players[playersIndex].actived = false
    }
}


function DestroyPlayer(socketId){
    const playersId = players.findIndex(p => p.id == player.id)

    if (playersId >= 0){
        players.splice(playersId, 1)
    }
}





module.exports = {
    StorePlayerDetails,
    MakeInactive,
    DestroyPlayer,
    players
}
