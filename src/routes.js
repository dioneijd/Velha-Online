const express = require('express')

const routes = express.Router()


// routes.get('/', (req, res)=>{
//     res.render('index.html')
// })


routes.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/InitialScreen/index.html');
});

routes.get('/:id', (req, res) => {
    res.sendFile(__dirname + '/public/GameScreen/index.html');
});

routes.get('/gameDemo', (req, res) => {
    res.sendFile(__dirname + '/public/GameScreen/index.html');
});

module.exports = routes