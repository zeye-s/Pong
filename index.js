const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scores = document.querySelector("#scoreText");
const reset = document.querySelector("#reset");
const width = gameBoard.width;
const height = gameBoard.height;
const gameBackground = "black";
const player1Color = "red";
const player2Color = "lightblue";
const ballColor = "white";
const ballSize = 10;
const paddleSpeed = 50;

let intervalID;
let ballSpeed = 1;
let ballX = width/2;
let ballY = height/2;
let directionX = 0;
let directionY = 0;

let player1 = {
    width: 25,
    height:100,
    x:0,
    y:0,
}

let player2 = {
    width: 25,
    height: 100,
    x: width - 25,
    y: 0,
}

window.addEventListener("keydown", changeDirection);
reset.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    Tick();

    if(checkCollision()){
        changeDirection();
    }
};

function Tick(){
    intervalID = setTimeout (() => {
        clearBoard();
        drawPaddle();
        drawBall(ballX, ballY);
        moveBall();
        checkCollision();
        Tick();
    }, 10)
};

function clearBoard(){
    ctx.fillStyle = gameBackground;
    ctx.fillRect(0,0,width,height);
};

function resetGame(){};

function drawPaddle(){
    ctx.strokeStyle = paddleBorder;

    ctx.fillStyle = player1Color;
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
    ctx.strokeRect(player1.x, player1.y, player1.width, player1.height);

    ctx.fillStyle = player2Color;
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
    ctx.strokeRect(player2.x, player2.y, player2.width, player2.height);
};

function createBall(){
    ballSpeed = 1;
    if(Math.round(Math.random())== 1){
        directionX = 1;
    }
    else{
        directionX = -1;
    }

    if(Math.round(Math.random())== 1){
        directionY = 1;
    }
    else{
        directionY = -1;
    }
    ballX = width/2;
    ballY = height/2;

    drawBall(ballX, ballY);
};

function drawBall(ballX, ballY){
    ctx.fillStyle = ballColor;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, 2 * Math.PI);
};

function moveBall(){};


function changeDirection(event){
    const keyPress = event.keyCode;
    const p1Up = 87;
    const p1Down = 83;
    const p2Up = 38;
    const p2Down = 40;

    switch(keyPress){
        case (p1Up):
            if(player1.y > 0){
                player1.y -= paddleSpeed;
            }
            break;
        case (p1Down):
            if(player1.y < height - player1.height){
                player1.y += paddleSpeed;
            }
            break;

        case(p2Up):
            if(player2.y > 0){
                player2.y -= paddleSpeed;
            }
            break;
        case(p2Down):
            if(player2.y < height - player2.height){
                player2.y += paddleSpeed;
            }
            break;
    }
};

function checkCollision(){};

function updateScore(){};
