
var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.getElementById('mainCanvas');
var width = 1200;
var height = 650;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

var update = function(){
    player.update();
    ball.update(player.paddle, computer.paddle);
    score.update();
};

window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};

var step = function() {
  update();
  render();
  animate(step);
};

function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

Paddle.prototype.render = function() {
  context.fillStyle = "#0000FF";
  context.fillRect(this.x, this.y, this.width, this.height);
};

//makes a Player
function Player(){
    this.paddle = new Paddle(30, 250, 15, 90);
}
//makes a Sprite
function Computer(){
    this.paddle = new Paddle(1150, 250, 15, 90);
}

Player.prototype.render = function() {
  this.paddle.render();
};

Computer.prototype.render = function() {
  this.paddle.render();
};

function Ball(x, y){
    this.x = x;
    this.y = y;
    this.x_speed = 6;
    this.y_speed = 0;
    this.radius = 7;
}

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "purple";
  context.fill();
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(600, 317);
var score = new Score();

var render = function() {
  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);
  player.render();
  computer.render();
  ball.render();
};

Ball.prototype.update = function() {
  this.x += this.x_speed;
  this.y += this.y_speed;
};

//setting keys up
var keysDown = {};

//moving the player paddle
window.addEventListener("keydown", function(event){
    keysDown[event.keyCode] = true;
});
window.addEventListener("keyup", function(event){
    delete keysDown[event.keyCode];
});

Player.prototype.update = function(){
    for(var key in keysDown){
        var value = Number(key);
        if(value == 38){        //up
            this.paddle.move(0, -8);
        }
        else if (value == 40){  //down
            this.paddle.move(0, 8);
        }
        else {
            this.paddle.move(0, 0);
        }
    }
};

Paddle.prototype.move = function(x, y){
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    //keeps paddle from hitting top and bottom
    if(this.y < 0) {
        this.y = 0;
        this.y_speed = 0;
    }
    else if (this.y + this.height >= 650){
        this.y = 650 - this.height;
        this.y_speed = 0;
    }
}


//animations (top is right, bottom is left)
Ball.prototype.update = function(paddle1, paddle2){
    this.x -= this.x_speed;
    this.y += this.y_speed;
    var right_x = this.x - 15;
    var right_y = this.y - 15;
    var left_x = this.x + 15;
    var left_y = this.y + 15;
    
    if(this.y - 5 < 0){ //hitting bottom wall ("5" the buffer?)
        this.y = 5;
        this.y_speed = -this.y_speed;
    }else if(this.y + 5 > 650){ //hitting top wall ("5" the buffer?)
        this.y = 645;
        this.y_speed = -this.y_speed;
    }
    //a point is being scored
    if(this.x < 0 || this.x > 1200){
        this.x_speed = 6;
        this.y_speed = 0;
        this.x = 600;
        this.y = 325;
    }
    //bouncing off paddles
    if(right_x < 600){  //player's paddle
        if(right_x < (paddle1.x + paddle1.height) && left_y > paddle1.y && right_x < (paddle1.x + paddle1.width) && left_x > paddle1.x){
            this.x_speed = -6;
            this.y_speed += (paddle1.y_speed / 2);
            this.x += this.x_speed;
        }
    }else{  //computer's paddle
        if(right_x > (paddle2.y + paddle2.height) && left_y > paddle2.y && right_x < (paddle2.x + paddle2.width) && left_x > paddle2.x){
            this.x_speed = 6;
            this.y_speed += (paddle2.y_speed / 2);
            this.x += this.x_speed;
        }
    }
};

//Score functions
function Score(){
    this.pScore = 0;
    this.cScore = 0;
}

Score.prototype.update = function(){
    if(ball.x > 1199){
        this.pScore++;
        console.log("The player's score increased to " + this.pScore)
        document.getElementsByClassName('score-keep')[0].getElementsByTagName('h5')[0].innerHTML = this.pScore;
        if(this.pScore <= 10){
            //player victory is going to go here
        }
    }
    if(ball.x < 1){
        this.cScore++;
        console.log("The computer's score increased to " + this.cScore)
        document.getElementsByClassName('score-keep')[0].getElementsByTagName('h5')[1].innerHTML = this.cScore;
        if(this.cScore <= 10){
            //computerWon();
        }
    }
};
