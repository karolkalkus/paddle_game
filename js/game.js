//variables
let ballSpeedX = 15;
let ballSpeedY = 0;

let paddle1Y = 250;
let paddle2Y = 250;
const paddle_height = 100;
const paddle_thickness = 10;

let player1 = 0;
let player2 = 0;

let winScreen = 2;
const winScore = 3;


// starts when DOM is loaded
window.onload = () => {
  const canvas = document.getElementById('game');
  const canvasContext = canvas.getContext('2d');
  let ballX = canvas.width / 2;
  let ballY = canvas.height / 2;
  canvasContext.font = "18px Georgia";
  const framesPerSecond = 30;
  setInterval(() => {
    draw();
    move();
  }, 1000 / framesPerSecond);

  // right paddle computer move
  const computerMove = () => {
    let speed = Math.abs(ballSpeedY);
    let indent = (speed > 9) ? -10 : 47;
    paddle2Y = ballY - indent;
  }

  // ball move function
  const move = () => {
    if (winScreen === 1 || winScreen === 2) {
      return
    }
    computerMove();
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    //ball hits the left wall
    if (ballX < 20) {
      if (ballY > paddle1Y - 10 && ballY < paddle1Y + paddle_height + 10) {
        ballSpeedX = -ballSpeedX

        const acc = ballY - (paddle1Y + paddle_height / 2);
        ballSpeedY = acc * 0.35;
      } else {
        player2++;
        resetBall();
      }
    }

    //ball hits the right wall 
    if (ballX > canvas.width - 20) {
      if (ballY > paddle2Y - 10 && ballY < paddle2Y + paddle_height + 10) {
        ballSpeedX = -ballSpeedX
        const acc = ballY - (paddle2Y + paddle_height / 2);
        ballSpeedY = acc * 0.35;
      } else {
        player1++;
        resetBall();
      }

    }
    ballY < 10 ? ballSpeedY = -ballSpeedY : ballY > canvas.height - 10 ? ballSpeedY = -ballSpeedY : null;
  }

  //ball position reset 
  const resetBall = () => {
    if (player1 >= winScore || player2 >= winScore)
      winScreen = 1;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 0;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }

  // function drawing net
  const drawNet = () => {
    for (let i = 10; i <= canvas.height; i += 60) {
      colorRect(canvas.width / 2 - 1, i, 2, 40, 'white');
    }
  }

  //drawing function
  const draw = () => {
    //game background
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    // start screen
    if (winScreen === 2) {
      canvasContext.fillStyle = 'white';
      canvasContext.fillText("Click to start game!", 330, 270)
      canvasContext.fillText("Score 3 points to win!", 323, 310)
    }

    //winning screen
    else if (winScreen === 1) {
      canvasContext.fillStyle = 'white';
      player1 >= winScore ? canvasContext.fillText("You won!", 360, 200) :
        player2 >= winScore ? canvasContext.fillText("Computer won!", 340, 200) :
        null;

      canvasContext.fillText("Click to continue!", 330, 400)

    } else {
      // net
      drawNet();
      // left paddle 
      colorRect(0, paddle1Y, paddle_thickness, paddle_height, 'white');
      //right paddle
      colorRect(canvas.width - paddle_thickness, paddle2Y, paddle_thickness, paddle_height, 'white');
      //ball
      colorCircle(ballX, ballY, 6, 'white');
      // first player score
      canvasContext.fillText("You", 90, 75);
      canvasContext.fillText(player1, 100, 100);
      // second player score
      canvasContext.fillText("Computer", canvas.width - 135, 75);
      canvasContext.fillText(player2, canvas.width - 100, 100);
    }
  }

  // mouse position function
  const mousePosition = e => {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = e.clientX - rect.left - root.scrollLeft;
    let mouseY = e.clientY - rect.top - root.scrollTop;
    return {
      x: mouseX,
      y: mouseY
    }
  }

  // moving paddle
  canvas.addEventListener('mousemove', e => {
    let mousePos = mousePosition(e);
    paddle1Y = mousePos.y - (paddle_height / 2);
  })

  // click to play again
  canvas.addEventListener('click', () => {
    if (winScreen) {
      player1 = 0;
      player2 = 0;
      winScreen = 0;
    }
  })

  // circle pattern
  const colorCircle = (centerX, centerY, radius, drawColor) => {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
  }

  //rectangle pattern
  const colorRect = (leftX, topY, width, height, drawColor) => {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
  }

}