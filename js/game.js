//variables
let ballX = 10;
let ballY = 10;
let ballSpeedX = 10;
let ballSpeedY = 4;

// starts when DOM is loaded
window.onload = () => {
  const canvas = document.getElementById('game');
  const canvasContext = canvas.getContext('2d');
  const framesPerSecond = 30;
  setInterval(() => {
    draw();
    move();
  }, 1000 / framesPerSecond);

  // ball move function
  const move = () => {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    ballX < 0 ? ballSpeedX = -ballSpeedX : ballX > canvas.width - 20 ? ballSpeedX = -ballSpeedX : null;
    ballY < 0 ? ballSpeedY = -ballSpeedY : ballY > canvas.height - 20 ? ballSpeedY = -ballSpeedY : null;
  }
  //drawing function
  const draw = () => {
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    colorRect(0, 210, 10, 100, 'white');
    colorCircle(ballX, ballY, 10, 'white');

  }
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