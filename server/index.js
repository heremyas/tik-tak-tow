const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile("C:/Users/Lenovo/PycharmProjects/Tic-Tac-Toe/tic-tac-toe" + '/index.html');
 
});

app.get('/css', (req, res) => {

  res.sendFile("C:/Users/Lenovo/PycharmProjects/Tic-Tac-Toe/tic-tac-toe" + '/styles.css');
 
});

app.get('/script', (req, res) => {

  res.sendFile("C:/Users/Lenovo/PycharmProjects/Tic-Tac-Toe/tic-tac-toe" + '/script.js');
 
});


io.on('connection',  (socket) => {

    const id = socket.id

    
    socket.join("room1");

    //this is just to make sure that there are only 2 players in a game
    if(io.sockets.adapter.rooms.get("room1").size == 3){

        socket.leave("room1");
        console.log("full" ,io.sockets.adapter.rooms.get("room1").size)
    }

    else{

        socket.join("room1");
        console.log(io.sockets.adapter.rooms.get("room1").size);

    }
    //this where we received the signal
    socket.on('player clicked', (data) => {
     
      io.in("room1").emit("update" , data);
      
    });
    
  
  


  });


server.listen(3000, () => {
  console.log('listening on *:3000');
});