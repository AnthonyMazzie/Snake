const canvas = document.getElementById("gameCanvas");
const canvasContext = canvas.getContext("2d");

var leftBtn = document.getElementById("left");
var rightBtn = document.getElementById("right");
var startStopBtn = document.getElementById("startstop_button");

// State represents snakes movement direction
var state = 1;

//Snake X position
var x = 0;

//Snake Y position
var y = 100;

//Start Snake at (x, y)
canvasContext.moveTo(x, y);

var currentTime = 0;
var t;
var timer_is_on = 0;
var stopGame = false;

/*
the timedCount function is a loop that sets the game time to the current time and runs the game
*/
function timedCount() {
  if (stopGame == false) {
    //Set timer to current time
    document.getElementById("txt").value = currentTime;
    //Iterate current time
    currentTime++;
    runGame();
    //Loop
    t = setTimeout("timedCount()", 50);
  }
}

/*
The doTimer function turns the timer on
*/
function doTimer() {
  if (!timer_is_on) {
    console.log("Timer started");
    timer_is_on = 1;
    timedCount();
  }
}

/*
The stopCount function stops the game from running and turns the timer off
*/
function stopCount() {
  console.log("Timer stopped");
  clearTimeout(t);
  timer_is_on = 0;
}

/*
The first press of the start button will start game and change the button text to 'stop'
If the 'stop' button is pressed, the game is stopped and the button text is changed to 'start'
*/
function startStopGame() {
  if (startStopBtn.innerHTML.trim() == "Start" && stopGame == false) {
    console.log(startStopBtn.innerHTML.trim() + " Pressed!");
    doTimer();
    startStopBtn.innerHTML = "Stop";
    console.log("Button text changed to " + startStopBtn.innerHTML);
  } else if (startStopBtn.innerHTML.trim() == "Stop") {
    console.log(startStopBtn.innerHTML.trim() + " Pressed!");
    stopCount();
    startStopBtn.innerHTML = "Start";
    console.log("Button text changed to " + startStopBtn.innerHTML);
  }
}

/*
The runGame function controls snake state and direction, this function runs every time the timer counts up one. 
*/
function runGame() {
  //console.log("Game is running");
  console.log("Snake position: (" + x + ", " + y + ")");

  //Right and left buttons change snake state
  leftBtn.onclick = function () {
    console.log("Left Pressed!");
    state++;
    //If the game is stopped, snake can start moving again using right or left buttons
    if (startStopBtn.innerHTML.trim() == "Start") {
      doTimer();
      startStopBtn.innerHTML = "Stop";
      console.log("Button text changed to " + startStopBtn.innerHTML);
    }
  };

  rightBtn.onclick = function () {
    console.log("Right Pressed!");
    state--;
    //If the game is stopped, snake can start moving again using right or left buttons
    if (startStopBtn.innerHTML.trim() == "Start") {
      doTimer();
      startStopBtn.innerHTML = "Stop";
      console.log("Button text changed to " + startStopBtn.innerHTML);
    }
  };

  //move right (default)
  if (state == 1 || state == 5) {
    // state value back to 1, snake can only go up right, left, down
    state = 1;
    x++;
    canvasContext.lineTo(x, y);
    canvasContext.stroke();
  }
  //move down
  else if (state == 2) {
    y--;
    canvasContext.lineTo(x, y);
    canvasContext.stroke();
  }
  //move left
  else if (state == 3) {
    x--;
    canvasContext.lineTo(x, y);
    canvasContext.stroke();
  }
  //move up
  else if (state == 4 || state == 0) {
    //state value back to 4, snake can only go up right, left and down
    state = 4;
    y++;
    canvasContext.lineTo(x, y);
    canvasContext.stroke();
  }
  if (x > 400 || y > 400 || x < -1 || x < -1) {
    console.log("BORDER");
    stopGame = true;
    timedCount();
  }
}
