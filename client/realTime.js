// created a variable named socket
// io() = not sure about this function. Inside it the link where we are hosting the SERVER
const socket = io("http://localhost:3000");

// socket.on("chat-message", (data) => {
//   console.log(data);
// });

const box = document.querySelector(".container");
state = false;

function changeColor(box, color) {
  box.style.backgroundColor = color;
}

box.addEventListener("click", () => {
  state = !state;
  socket.emit("send-state", state);
});

socket.on("send-the-state", (state) => {
  if (state) {
    changeColor(box, "red");
  } else {
    changeColor(box, "blue");
  }
});
