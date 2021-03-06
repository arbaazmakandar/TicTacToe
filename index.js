let players = [];
let turn = 0;
let gameOver = false;
let gameInProgress = false;
let dimension = parseInt(document.getElementById("dimensions").value);
let board = new Array(dimension)
.fill("")
.map(() => new Array(dimension).fill(""));

const changeDimension = (event) => {
  dimension = parseInt(event.target.value);
  board = new Array(dimension)
              .fill("")
              .map(() => new Array(dimension).fill(""));
}


document.getElementById('dimensions').addEventListener('change', changeDimension);

//Scroll to game
const scrollWin = () => {
  window.scrollTo({
    top: 650,
    left: 0,
    behavior: 'smooth'
  });
}


const StartGame = () => {
  scrollWin();
  if(gameInProgress){
    return;
  }

  let input1 = document.getElementById("p1");
  let input2 = document.getElementById("p2");
  let select = document.getElementById('dimensions');
  let player1 = input1.value;
  let player2 = input2.value;

  if (isEmpty(player1) || isEmpty(player2)) {
    alert("Player name is required");
    return;
  }

  input1.setAttribute("disabled", true);
  input2.setAttribute("disabled", true);
  select.setAttribute("disabled", true);

  let game = document.getElementById("game-container");
  game.classList.remove("hide");

  gameInProgress = true;

  players.push(player1);
  players.push(player2);
  document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";
  initGame();
  
};


const handleClick = (cell, i, j) => {
  console.log(i, j);
  console.log(board);
  const e1 = cell;

  //If already X or O is there  or gameOver is there then return
  if (e1.innerHTML !== "" || gameOver) {
    return;
  }

  board[i][j] = turn % 2 === 0 ? "X" : "O";

  if(board[i][j] === "X") e1.style.color = "#0000cc";
  else e1.style.color = "#e60000";


  e1.innerHTML = board[i][j];

  if (calculateWinner()) {
    alert(players[turn % 2] + " won");
    gameOver = true;
    return;
  }

  turn++;

  document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";

  if (turn === dimension * dimension) {
    alert("Game is drawn");
    gameOver = true;
    return;
  }
};


//creates the board and initializes
const initGame = () => {
  let gameContainer = document.getElementById("game-container");
  
  
    for (let i = 0; i < dimension; i++) {
      let row = document.createElement("div");
      row.className = "row";
        for (let j = 0; j < dimension; j++) {
          let cell = document.createElement("div");
          cell.addEventListener('click', () => handleClick(cell, i,j));
          cell.className = "cell";
          row.appendChild(cell);
                  
        }
      gameContainer.appendChild(row);
      }
      scrollWin();
  };

const calculateWinner = () => {
  // first check for all rows in board and then for col and then for diagonals
  let len = board.length;
  if (turn < len) {
    return false;
  }
  //console.log(board);

  for (let i = 0; i < len; i++) {
    if (board[i].every((el) => el === board[i][0] && el !== "")) {
      return true;
    }
    //console.log(`${i} Row clear`);
    let start_col_val = board[0][i];
    let count = 1;
    for (let j = 1; j < len; j++) {
      if (start_col_val === board[j][i] && start_col_val !== "") {
        count++;
      }
    }
    //console.log(`${i} Col clear`);
    if (count === len) {
      return true;
    }
  }

  // check for diagonal

  let i = board[0][0];
  let j = 0;
  while (j < len) {
    //console.log(`${board[j][j]} diagonal`);
    if (board[0][0] === "") {
      break;
    }
    if (board[j][j] !== i) {
      break;
    } else {
      j++;
    }
  }
  //console.log(`Diagonal clear`);
  //console.log(`${j} j for diagonal`);
  if (j === len) {
    return true;
  }

  let rev_i = 0;
  let rev_j = len - 1;
  let rev_val = board[rev_i][rev_j];

  while (rev_i < len) {
    if (board[rev_i][rev_j] === "") {
      break;
    }
    if (rev_val !== board[rev_i][rev_j]) {
      break;
    } else {
      rev_i++;
      rev_j--;
    }
  }
  //console.log(`reverse Diagonal clear`);
  if (rev_i === len) {
    return true;
  }

  return false;
};


  const isEmpty = (value) => !value || !value.trim();
