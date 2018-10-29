let ballX = 50;
let ballY = 50;
let ballSpeed = 10;

window.onload = () => {
  const canvas = document.getElementById('game');
  const canvasContext = canvas.getContext('2d');
  const framesPerSecond = 30;
  setInterval(() => {
    draw();
    move();
  }, 1000 / framesPerSecond);


  const move = () => {
    ballX += ballSpeed;
    ballX < 0 ? ballSpeed = -ballSpeed : ballX > canvas.width - 20 ? ballSpeed = -ballSpeed : null;
  }

  const draw = () => {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0, 210, 10, 100);
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(canvas.width - 10, 210, 10, 100);
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(ballX, 100, 20, 20);
  }
}