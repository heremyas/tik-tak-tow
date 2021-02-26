const socket = io("http://localhost:3000");

// ===============================================================

// this is to change between classes from whatever turn it is
const X_CLASS = "x";
const O_CLASS = "o";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");

// if this is true o turn else x turn
let o_turn;

startGame();

function startGame() {
  o_turn = false;
  cellElements.forEach((cell) => {
    // to fire a function once add {once: true} to the parameter
    cell.addEventListener("click", handleClick, { once: true });
  });
  setHover();
}

function handleClick(e) {
  // whatever dom element player clicked
  const cell = e.target;
  //   is it x turn or o turn?
  const current_class = o_turn ? O_CLASS : X_CLASS;

  drawMark(cell, current_class);
  if (checkWin(current_class)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchTurn();
    setHover();
  }
}

function endGame(draw) {
  if (draw) {
    console.log("draw");
  } else {
    console.log(o_turn ? "o winner" : "x winner");
  }
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function drawMark(cell, current_class) {
  // BEHIND THE SCENE or the RESULT will be
  // <div class="cell <o or x>">
  socket.emit("send-draw-mark", current_class);
  socket.on("drawmark", (d) => {
    // cell.classList.add(current_class);

    console.log(d);
  });
}

function switchTurn() {
  o_turn = !o_turn;
}

function setHover() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (o_turn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(current_class) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(current_class);
    });
  });
}
