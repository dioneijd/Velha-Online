const express = require('express')

const routes = express.Router()


// routes.get('/', (req, res)=>{
//     res.render('index.html')
// })


routes.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

module.exports = routes