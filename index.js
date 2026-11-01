const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scores = document.querySelector("#scoreText");
const reset = document.querySelector("#reset");
const start = document.querySelector("#start");
const Width = gameBoard.width;
const Height = gameBoard.height;
const gameBackground = "black";
const player1Color = "red";
const player2Color = "lightblue";
const ballColor = "white";
const ballSize = 10;
const paddleSpeed = 50;

let intervalID;
let ballSpeed = 1;
let ballX = Width/2;
let ballY = Height/2;
let directionX = 0;
let directionY = 0;
let player1Score = 0;
let player2Score = 0;
let player1 = {
    width: 25,
    height:100,
    x:0,
    y:Height/2 - 50,
}

let player2 = {
    width: 25,
    height: 100,
    x: Width - 25,
    y: Height/2 - 50,
}

window.addEventListener("keydown", changeDirection);
reset.addEventListener("click", resetGame);
start.addEventListener("click", startGame);

gameStart();

function gameStart(){
    createBall();
    Tick();
};

function Tick(){
    intervalID = setTimeout (() => {    
        clearBoard();
        drawPaddle();
        updateScore();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        Tick();
    }, 10)
};

function clearBoard(){
    ctx.fillStyle = gameBackground;
    ctx.fillRect(0,0,Width,Height);
};

function startGame(){
    ballSpeed = 1;
}

function resetGame(){
    player1Score = 0;
    player2Score = 0;
    ballSpeed = 0;

    player1 = {
        width: 25,
        height:100,
        x:0,
        y:Height/2 - 50,
    }
    player2 = {
        width: 25,
        height: 100,
        x: Width - 25,
        y: Height/2 - 50,
    }
    ballSpeed = 0;
    ballX = Width/2;
    ballY = Height/2;
    createBall();
    updateScore();
    clearInterval(intervalID);
    gameStart();
};

function drawPaddle(){

    ctx.fillStyle = player1Color;
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
    ctx.strokeRect(player1.x, player1.y, player1.width, player1.height);

    ctx.fillStyle = player2Color;
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
    ctx.strokeRect(player2.x, player2.y, player2.width, player2.height);
};

function createBall(){
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
    ballX = Width/2;
    ballY = Height/2;

    drawBall(ballX, ballY);
};

function drawBall(ballX, ballY){
    ctx.fillStyle = ballColor;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, 2 * Math.PI);
    ctx.fill();
};

function moveBall(){
    ballX +=(ballSpeed * directionX);
    ballY += (ballSpeed * directionY);
};

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
            if(player1.y < Height - player1.height){
                player1.y += paddleSpeed;
            }
            break;

        case(p2Up):
            if(player2.y > 0){
                player2.y -= paddleSpeed;
            }
            break;
        case(p2Down):
            if(player2.y < Height - player2.height){
                player2.y += paddleSpeed;
            }
            break;
    }
};

function checkCollision(){
    if(ballX <= 0 + ballSize || ballX >= Width - ballSize){
        directionX *= -1;
    }
    if(ballY >= Height - ballSize || ballY <= 0 + ballSize){
        directionY *= -1;
    }
    if(ballX <= 0 + ballSize){
        player2Score += 1;
        createBall();
    }
    if(ballX >= Width - ballSize){
        player1Score += 1;
        createBall();
    }

    if(ballX <= player1.x + player1.width + ballSize){
        if(ballY > player1.y && ballY < player1.y + player1.height){
            ballX = player1.x + player1.width + ballSize;
            directionX *= -1;
            ballSpeed += 0.5;
        }
    }
    if(ballX > player2.x - ballSize){
        if(ballY > player2.y && ballY < player2.y + player2.height){
            ballX = player2.x - ballSize;
            directionX *= -1;
            ballSpeed += 0.5;
        }
    }
};

function updateScore(){
    scores.textContent = `${player1Score} : ${player2Score}`;
};
