// create a server with port 3000
const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});

// Everytime a user load up our website call up this function
io.on("connection", (socket) => {
  // sa client meron dun ilalagay mo yung event name na "chat-message" then sa second parameter yun yung irereturn nya na value
  // function emit() is parang mag dadagdag ka ng function na pwede mong iaccess sa client
  // more info later in the client side
  socket.on("send-draw-mark", (current_class) => {
    socket.emit("drawmark", current_class);
    console.log(current_class);
  });
});
