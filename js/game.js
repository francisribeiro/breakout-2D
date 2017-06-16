'use strict';

// Definições do Canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');

// Configurações da Bolinha
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

// Configurações da raquete
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

// Configurações dos tijolos
var brickRowCount = 5;
var brickColumnCount = 10;
var brickWidth = 35;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 50;
var brickOffsetLeft = 30;
var bricks = [];

// Iniciando os tijolos
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            status: 1
        };
    }
}

// Configurações das teclas
var rightPressed = false;
var leftPressed = false;

// Score
var score = 0;

// Vidas
var lives = 3;

// Desenha as vidas
var drawLives = function () {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#C70039";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

// Desenha o score
var drawScore = function () {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#2ECC71";
    ctx.fillText("Score: " + score, 8, 20);
}

// Alterações em eventos de usuário
var keyDownHandler = function (e) {
    if (e.keyCode == 39)
        rightPressed = true;
    else if (e.keyCode == 37)
        leftPressed = true;
}

var keyUpHandler = function (e) {
    if (e.keyCode == 39)
        rightPressed = false;
    else if (e.keyCode == 37)
        leftPressed = false;
}

var mouseMoveHandler = function (e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

// Evento das teclas e mouse
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

//Detecção de colisão
var collisionDetection = function () {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}
// Desenha a bolinha
var drawBall = function () {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FF5733";
    ctx.fill();
    ctx.closePath();
}

// Desenha a raquete
var drawPaddle = function () {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#581845";
    ctx.fill();
    ctx.closePath();
}

// Desenha os tijolos 
var drawBricks = function () {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                randomColor();
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

var randomColor = function () {
    var r = Math.floor((Math.random() * 255) + 1);
    var g = Math.floor((Math.random() * 255) + 1);
    var b = Math.floor((Math.random() * 255) + 1);

    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
}

// Monta o jogo
var draw = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBricks();
    drawPaddle();
    drawScore();
    collisionDetection();
    drawLives();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius)
        dx = -dx;

    if (y + dy < ballRadius)
        dy = -dy;
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth)
            dy = -dy;
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }


    if (rightPressed && paddleX < canvas.width - paddleWidth)
        paddleX += 7;
    else if (leftPressed && paddleX > 0)
        paddleX -= 7;

    x += dx;
    y += dy;
}


setInterval(draw, 4);