document.addEventListener("DOMContentLoaded", () => {
  //SELECTORS
  let squares = document.querySelectorAll(`.grid div`);
  let scoreDisplay = document.querySelector(`span`);
  let startBtn = document.querySelector(".start");
  let gameOverNotice = document.querySelector(`h2`);

  // event listeners
  document.addEventListener(`keyup`, control);
  startBtn.addEventListener(`click`, startGame);

  //strings
  let width = 20;
  let currentIndex = 0;
  let appleIndex = 0;
  let currentSnake = [2, 1, 0];
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  //to start and restart
  function startGame() {
    currentSnake.forEach((index) => squares[index].classList.remove(`snake`));
    squares[appleIndex].classList.remove(`apple`);
    randomApple();
    clearInterval(interval);
    score = 0;
    direction = 1;
    scoreDisplay.innerHTML = score;
    gameOverNotice.innerHTML = "";
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add(`snake`));
    interval = setInterval(moveOutcome, intervalTime);
  }

  //Game Over Notice
  function gameOver() {
    gameOverNotice.innerHTML = "Game Over!";
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
      return [clearInterval(interval), gameOver()];
    }

    const tail = currentSnake.pop();
    squares[tail].classList.remove(`snake`);
    currentSnake.unshift(currentSnake[0] + direction);
    console.log(tail);

    //snake getting apple
    if (squares[currentSnake[0]].classList.contains(`apple`)) {
      squares[currentSnake[0]].classList.remove(`apple`);
      squares[tail].classList.add(`snake`);
      currentSnake.push(tail);
      randomApple();
      score++;
      scoreDisplay.innerHTML = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcome, intervalTime);
    }
    squares[currentSnake[0]].classList.add(`snake`);
  }

  //generate random apple
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains(`snake`));
    squares[appleIndex].classList.add(`apple`);
  }

  //functions to keycodes

  function control(event) {
    squares[currentIndex].classList.remove(`snake`);

    if (event.keyCode === 39) {
      direction = 1; //press the right arrow on our keyboard, the snake will go right one
    } else if (event.keyCode === 38) {
      direction = -width; //press the up arrow, the snake will go back ten divs, appearing to go up
    } else if (event.keyCode === 37) {
      direction = -1; //press left, the snake will go left one div
    } else if (event.keyCode === 40) {
      direction = +width; // press down, the snake head will instantly appear in the div ten divs from where you are now
    }
  }
});
