var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.getElementById('mainCanvas');
var width = 1200; 
var height = 650;
canvas.width = width;
canvas.height = height;
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
    player.update();
    ball.update(player.paddle, computer.paddle);
    context.clearRect(0, 0, canvas.width, canvas.height)
};

//makes a paddle
function Paddle(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    //this.fillStyle = colorInner;
    //this.fill();    //added
    //this.strokeStyle = colorOuter;
    //this.stroke();  //added
    this.x_speed = 0;
    this.y_speed = 0;
}

Paddle.prototype.render = function(){
  context.fillStyle = "blue";
  context.strokeStyle = "green";
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
    this.radius = 5;
}

Ball.prototype.render = function(){
    context.beginPath();
    context.arc(600, 300, 8, 0, 2 * Math.PI, false);
    context.fillStyle = '#990099';
    context.fill();
};

//animations (top is right, bottom is left)
Ball.prototype.update = function(paddle1, paddle2){
    this.x += this.x_speed;
    this.y += this.y_speed;
    var right_x = this.x - 5;
    var right_y = this.y - 5;
    var left_x = this.x + 5;
    var left_y = this.y + 5;
    
    if(this.y - 5 < 0){ //hitting bottom wall ("5" the buffer?)
        this.y = 5;
        this.y_speed = -this.y_speed;
    }else if(this.y + 5 > 650){ //hitting top wall ("5" the buffer?)
        this.y = 645;
        this.y_speed = -this.y_speed;
    }
    //a point is being scored
    if(this.x < 0 || this.x > 1200){
        this.x_speed = 3;
        this.y_speed = 0;
        this.x = 300;
        this.y = 200;
    }
    //bouncing off paddles
    if(right_x > 600){
        if(right_x < (paddle1.x + paddle1.width) && left_y > paddle1.y && right_x < (paddle1.x + paddle1.width) && left_x > paddle1.x){
            //player's paddle
            this.x_speed = -3;
            this.y_speed += (paddle1.y_speed / 2);
            this.x += this.x_speed;
        }
    }else{
        if(right_x < (paddle2.y + paddle2.width) && left_y > paddle2.y && right_x < (paddle2.x + paddle2.width) && left_x > paddle2.x){
            //computer's paddle
            this.x_speed = 3;
            this.y_speed += (paddle2.y_speed / 2);
            this.x += this.x_speed;
        }
    }
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(200, 300);

var render = function(){
    player.render();
    computer.render();
    ball.render();
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