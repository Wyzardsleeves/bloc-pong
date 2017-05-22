
var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.getElementById('mainCanvas');
var context = canvas.getContext('2d');

window.onload = function(){
    document.body.appendChild(canvas);
    animate(step);
}

var step = function(){
    update();
    render();
    animate(step);
};

var update = function(){
};

//makes a paddle
function Paddle(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
}

Paddle.prototype.render = function(){
  context.fillStyle = "#0000FF";
  context.fillRect(this.x, this.y, this.width, this.height);
};

//makes a Player
function Player(){
    this.paddle = new Paddle(10, 55, 5, 30);
}

//makes a Sprite
function Computer(){
    this.paddle = new Paddle(280, 55, 5, 30);
}

Player.prototype.render = function(){
    this.paddle.render();
};

Computer.prototype.render = function(){
    this.paddle.render();
};

//makes a Ball
function Ball(x, y){
    this.x = x;
    this.y = y;
    this.x_speed = 3;
    this.y_speed = 0;
    this.radius = 2;
}

Ball.prototype.render = function(){
    context.beginPath();
    context.arc(100, 100, 1, 0, 2 * Math.PI, false);
    context.fillStyle = '#990099';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#4d004d';
    context.stroke();
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(200, 300);

var render = function(){
    
    player.render();
    computer.render();
    ball.render();
};


/* The non-tut version
//This is supposed to make a triangle
var canvas = document.getElementById('mainCanvas');

var player = canvas.getContext('2d');
player.beginPath();
player.rect(10, 20, 5, 25);
player.fillStyle = '#00cc99';
player.fill();
player.lineWidth = 1;
player.strokeStyle = 'blue';
player.stroke();
//
player.prototype.render

var computer = canvas.getContext('2d');

computer.beginPath();
computer.rect(285, 20, 5, 25);
computer.fillStyle = 'orange';
computer.fill();
computer.lineWidth = 1;
computer.strokeStyle = 'red';
computer.stroke();
//
computer.prototype.render

var ball = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
//var centerX = canvas.width / 2;
//var centerY = canvas.height / 2;
var radius = 5;

ball.beginPath();
ball.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
ball.fillStyle = '#990099';
ball.fill();
ball.lineWidth = 1;
ball.strokeStyle = '#4d004d';
ball.stroke();

window.onload = function() {
  render();
};
*/