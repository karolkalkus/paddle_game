//variables
let ballX = 10;
let ballY = 10;
let ballSpeedX = 10;
let ballSpeedY = 4;
let paddle1Y = 250;
let paddle2Y = 250;
let player1 = 0;
let player2 = 0;
const paddle_height = 100;
const paddle_thickness = 10;

// starts when DOM is loaded
window.onload = () => {
  const canvas = document.getElementById('game');
  const canvasContext = canvas.getContext('2d');
  const framesPerSecond = 30;
  setInterval(() => {
    draw();
    move();
  }, 1000 / framesPerSecond);

  // right paddle computer move
  const computerMove = () => {
    const paddleComp = paddle2Y + (paddle_height / 2);
    paddleComp < ballY - 35 ? paddle2Y += 5 : paddleComp > ballY + 35 ? paddle2Y -= 5 : null;
  }

  // ball move function
  const move = () => {
    computerMove();
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    //ball hits the left wall
    if (ballX < 0) {
      if (ballY > paddle1Y && ballY < paddle1Y + paddle_height) {
        ballSpeedX = -ballSpeedX

        const acc = ballY - (paddle1Y + paddle_height / 2);
        ballSpeedY = acc * 0.35;
      } else {
        resetBall();
        player2++;
      }
    }
    //ball hits the right wall 
    if (ballX > canvas.width) {
      if (ballY > paddle2Y && ballY < paddle2Y + paddle_height) {
        ballSpeedX = -ballSpeedX
        const acc = ballY - (paddle2Y + paddle_height / 2);
        ballSpeedY = acc * 0.35;
      } else {
        resetBall();
        player1++;
      }
    }
    ballY < 0 ? ballSpeedY = -ballSpeedY : ballY > canvas.height ? ballSpeedY = -ballSpeedY : null;
  }

  //ball position reset 
  const resetBall = () => {
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }

  //drawing function
  const draw = () => {
    //game background
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    // left paddle 
    colorRect(0, paddle1Y, paddle_thickness, paddle_height, 'white');
    //right paddle
    colorRect(canvas.width - paddle_thickness, paddle2Y, paddle_thickness, paddle_height, 'white');
    //ball
    colorCircle(ballX, ballY, 10, 'white');
    // first player score
    canvasContext.fillText(player1, 100, 100);
    // second player score
    canvasContext.fillText(player2, canvas.width - 100, 100);
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