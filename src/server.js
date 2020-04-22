require('dotenv').config()

var express = require('express')
var app = express();
var http = require('http').createServer(app);

var path = require('path')



const routes = require('./routes.js')
const port = process.env.PORT || 3333


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(routes)




  
http.listen(port, () => {
  console.log(`Server running and listening on port: ${port}`);
});

