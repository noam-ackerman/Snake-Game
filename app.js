//SELECTORS
let squares = document.querySelectorAll(`.grid div`);
let scoreDisplay = document.querySelector(`.scoreNumber`);
let startBtn = document.querySelector(".start");
let gameOverNotice = document.querySelector(`h2`);
let gameScreen = document.querySelector(`.grid`);
let left = document.querySelector(".left");
let up = document.querySelector(".up");
let down = document.querySelector(".down");
let right = document.querySelector(".right");

// event listeners
document.addEventListener(`keyup`, control);
startBtn.addEventListener(`click`, startGame);
left.addEventListener(`click`, turnLeft);
up.addEventListener(`click`, turnUp);
down.addEventListener(`click`, turnDown);
right.addEventListener(`click`, turnRight);

//strings
let width = 20;
let currentIndex = 0;
let heartIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.97;
let intervalTime = 0;
let interval = 0;
let sfx = {
  eats: new Howl({ src: [`sounds/snake-eats-heart.mp3`] }),
  die: new Howl({ src: [`sounds/snake-die.mp3`] }),
};
let backgroundMusic = {
  backgroundMusic: new Howl({
    src: [`sounds/background-music.mp3`],
    loop: true,
  }),
};

//to start and restart
function startGame(event) {
  currentSnake.forEach((index) => squares[index].classList.remove(`snake`));
  squares[heartIndex].classList.remove(`heart`);
  randomHeart();
  backgroundMusic.backgroundMusic.stop();
  clearInterval(interval);
  score = 0;
  direction = 1;
  backgroundMusic.backgroundMusic.play();
  gameScreen.style.background = "transparent";
  scoreDisplay.innerHTML = score;
  gameOverNotice.innerHTML = "";
  intervalTime = 260;
  currentSnake = [2, 1, 0];
  currentIndex = 0;
  currentSnake.forEach((index) => squares[index].classList.add(`snake`));
  interval = setInterval(moveOutcome, intervalTime);
}

//movement outcomes  of the snake function
function moveOutcome() {
  //if snake hitting itself or a border
  if (
    (currentSnake[0] + width >= width * width && direction === width) || //bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || //right wall
    (currentSnake[0] % width === 0 && direction === -1) || //left wall
    (currentSnake[0] - width < 0 && direction === -width) || // top
    squares[currentSnake[0] + direction].classList.contains(`snake`)
  ) {
    backgroundMusic.backgroundMusic.stop();
    sfx.die.play();
    gameOverNotice.innerHTML = "GAME OVER!";
    return clearInterval(interval);
  }

  const tail = currentSnake.pop();
  squares[tail].classList.remove(`snake`);
  currentSnake.unshift(currentSnake[0] + direction);

  //snake getting heart
  if (squares[currentSnake[0]].classList.contains(`heart`)) {
    squares[currentSnake[0]].classList.remove(`heart`);
    squares[tail].classList.add(`snake`);
    currentSnake.push(tail);
    sfx.eats.play();
    randomHeart();
    score++;
    scoreDisplay.innerHTML = score;
    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(moveOutcome, intervalTime);
  }
  squares[currentSnake[0]].classList.add(`snake`);
}

//generate random heart
function randomHeart() {
  do {
    heartIndex = Math.floor(Math.random() * squares.length);
  } while (squares[heartIndex].classList.contains(`snake`));
  squares[heartIndex].classList.add(`heart`);
}

//functions to turn with keys
function control(e) {
  if (e.keyCode === 39 && direction !== -1) {
    direction = 1; //press the right arrow , the snake will go right
  } else if (e.keyCode === 38 && direction !== +width) {
    direction = -width; //press the up arrow, the snake will go up
  } else if (e.keyCode === 37 && direction !== 1) {
    direction = -1; //press left, the snake will go left
  } else if (e.keyCode === 40 && direction !== -width) {
    direction = +width; // press down, the snake will go down
  }
}
// functions to turn with arrow buttons
function turnLeft(e) {
  if (direction !== 1) {
    direction = -1; //press the left arrow btn , the snake will go right
  }
}

function turnUp(e) {
  if (direction !== +width) {
    direction = -width; //press the up arrow btn , the snake will go right
  }
}

function turnDown(e) {
  if (direction !== -width) {
    direction = +width; //press the down arrow btn , the snake will go right
  }
}

function turnRight(e) {
  if (direction !== -1) {
    direction = 1; //press the right arrow btn , the snake will go right
  }
}
