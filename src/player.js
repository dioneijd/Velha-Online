let player = {
    id: '',
    name: '',
    totalScore: 0
}

let players = []



function StorePlayerDetails(player){
    const playersId = players.findIndex(p => p.id == player.id)

    if (playersId >= 0) {
        players[playersId] = player
    } else {
        player = {...player, totalScore: 0}
        players.push(player)
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
    DestroyPlayer,
    players
}
