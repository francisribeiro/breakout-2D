'use strict';

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;

ctx.fillStyle = "#0095DD";

var drawBall = function () {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

var randomColor = function () {
    var r = Math.floor((Math.random() * 255) + 1);
    var g = Math.floor((Math.random() * 255) + 1);
    var b = Math.floor((Math.random() * 255) + 1);

    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
}

var draw = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        randomColor();
    }

    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
        randomColor();
    }

    x += dx;
    y += dy;
}

setInterval(draw, 10);