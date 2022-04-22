const canvas = document.getElementById("gameCanvas");
const canvasContext = canvas.getContext("2d");

//Builds a "snake body part"
class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

//Speed and difficulty controls
const easyDifficulty = 6;
const mediumDifficulty = 12;
const hardDifficulty = 18;

//Speed starts on easy and increases with score
let speed = easyDifficulty;

let sideLength = 20;
let cellSize = canvas.width / sideLength - 2;

//Snake head location
let headX = 0;
let headY = 10;

//Snake body
const snakeParts = [];
let tailLength = 2;

//Apple location
let appleX = 15;
let appleY = 15;

//Snake speed and direction
let inputsXVelocity = 0;
let inputsYVelocity = 0;
let xVelocity = 0;
let yVelocity = 0;

//Score
let score = 0;

/*
Main game loop
*/
function gameLoop() {
  xVelocity = inputsXVelocity;
  yVelocity = inputsYVelocity;

  updateSnakeLocation();
  let result = isendGame();
  if (result) {
    //If the isendGame function returns true, stop looping and end game
    return;
  }

  setBackground();
  snakeEatApple();
  createAppleCell();
  buildSnake();
  scoreboard();

  if (score >= 4) {
    speed = mediumDifficulty;
  }
  if (score >= 8) {
    speed = hardDifficulty;
  }

  //Loop
  setTimeout(gameLoop, 1000 / speed);
}

/*
Performs checks to see if game is over
If the snake is not moving, return false
If the snake has exceeded boundaries, return true
If the snake has ran into itself, return true
If return true, display message
*/
function isendGame() {
  let endGame = false;

  if (yVelocity === 0 && xVelocity === 0) {
    //Snake is not started / snake is not moving, game cannot be over, return false.
    return false;
  }

  //If the snake hits any walls, end game
  //Walls are located at 0 and sideLength
  if (headX < 0) {
    endGame = true;
  } else if (headX === sideLength) {
    endGame = true;
  } else if (headY < 0) {
    endGame = true;
  } else if (headY === sideLength) {
    endGame = true;
  }

  //If snake head touches itself or body, end game
  for (let i = 1; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      console.log("Snake touched itself, end game");
      endGame = true;
      break;
    }
  }

  //Display GAME OVER message
  if (endGame) {
    canvasContext.fillStyle = "black";
    canvasContext.font = "65px Calibri Light";
    canvasContext.fillText("Game Over", canvas.width / 7.5, canvas.height / 2);
  }

  //Return false to stop main game loop
  return endGame;
}

/*
  Makes the background white
  */
function setBackground() {
  canvasContext.fillStyle = "white";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

/*
Draws the snake 
 */
function buildSnake() {
  canvasContext.fillStyle = "#F1BE48";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    canvasContext.fillRect(
      part.x * sideLength,
      part.y * sideLength,
      cellSize,
      cellSize
    );
  }

  //Add to snake body
  snakeParts.push(new SnakePart(headX, headY));
  while (snakeParts.length > tailLength) {
    //If snake body is longer than than tailLength, remove one
    snakeParts.shift();
  }

  canvasContext.fillStyle = "#C8102E";
  canvasContext.fillRect(
    headX * sideLength,
    headY * sideLength,
    cellSize,
    cellSize
  );
}

/*
Snake is updated once every main loop with location + velocity
*/
function updateSnakeLocation() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

/*
Apples are represented by a green cell on the grid
*/
function createAppleCell() {
  canvasContext.fillStyle = "green";
  canvasContext.fillRect(
    appleX * sideLength,
    appleY * sideLength,
    cellSize,
    cellSize
  );
}

/*
Draws a scoreboard in the top right of the screen.
Each apple eaten by the snake will add one to the score
*/
function scoreboard() {
  canvasContext.fillStyle = "black";
  canvasContext.font = "12px Calibri Light";
  canvasContext.fillText("Score: " + score, canvas.width - 65, 15);
}

/*
If snakes head x and y are at the same cell as the apple x and y:
move the apple to a random cell in canvas
add one to snake body length
add one to score
*/
function snakeEatApple() {
  if (appleX === headX && appleY == headY) {
    appleY = Math.floor(Math.random() * sideLength);
    appleX = Math.floor(Math.random() * sideLength);
    score++;
    tailLength++;
  }
}

/*
Move Snake
User tapped a key. WSAD and the arrow keys will both move the user in the corresponding direction.
*/
document.body.addEventListener("keydown", userTap);

function userTap(event) {
  //W or Up Arrow tapped
  if (event.keyCode == 38 || event.keyCode == 87) {
    if (inputsYVelocity == 1) {
      console.log("cannot go up, will run into own body");
      return;
    }
    inputsYVelocity = -1;
    inputsXVelocity = 0;
  }

  //S or Down Arrow tapped
  if (event.keyCode == 40 || event.keyCode == 83) {
    if (inputsYVelocity == -1) {
      console.log("cannot go down, will run into own body");
      return;
    }
    inputsYVelocity = 1;
    inputsXVelocity = 0;
  }

  //A or Left Arrow tapped
  if (event.keyCode == 37 || event.keyCode == 65) {
    if (inputsXVelocity == 1) {
      console.log("cannot go left, will run into own body");
      return;
    }
    inputsYVelocity = 0;
    inputsXVelocity = -1;
  }

  //D or Right Arrow tapped
  if (event.keyCode == 39 || event.keyCode == 68) {
    if (inputsXVelocity == -1) {
      console.log("cannot go right, will run into own body");
      return;
    }
    inputsYVelocity = 0;
    inputsXVelocity = 1;
  }
}

/*
Starts the game if user presses start
*/
function toggleButton() {
  var btn = document.getElementById("startstop_button");

  if (btn.innerHTML.trim() == "Start") {
    inputsYVelocity = 0;
    inputsXVelocity = 0;
    btn.innerHTML = "Stop";
  } else {
    btn.innerHTML = "Start";
    inputsYVelocity = 0;
    inputsXVelocity = 1;
  }
}

function turnLeft() {
  if (inputsXVelocity == 1) {
    console.log("cannot go left, will run into own body");
    return;
  }
  inputsYVelocity = 1;
  inputsXVelocity = 1;
}

function turnRight() {
  if (inputsXVelocity == -1) {
    console.log("cannot go right, will run into own body");
    return;
  }
  inputsYVelocity = 0;
  inputsXVelocity = 1;
  console.log("Turning right");
}

document
  .getElementById("leftButton")
  .addEventListener("click", clickHandlerLeft);

function clickHandlerLeft(event) {
  console.log("Left Button Clicked");
  turnLeft();
}

document
  .getElementById("rightButton")
  .addEventListener("click", clickHandlerRight);

function clickHandlerRight(event) {
  console.log("Right Button Clicked");
  turnRight();
}

gameLoop();
