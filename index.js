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
const player1Speed = 50;
const player2Speed = 50;

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
    const p2Up = 73;
    const p2Down = 75;

    switch(keyPress){
        case (p1Up):
            if(player1.y > 0){
                player1.y -= player1Speed;
            }
            break;
        case (p1Down):
            if(player1.y < Height - player1.height){
                player1.y += player1Speed;
            }
            break;

        case(p2Up):
            if(player2.y > 0){
                player2.y -= player2Speed;
            }
            break;
        case(p2Down):
            if(player2.y < Height - player2.height){
                player2.y += player2Speed;
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
        ballSpeed = 1;
        createBall();
    }
    if(ballX >= Width - ballSize){
        player1Score += 1;
        ballSpeed = 1;
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

const p1a1Button = document.querySelector("#P1A1");
const p1a2Button = document.querySelector("#P1A2");
const p1a3Button = document.querySelector("#P1A3");
const p2a1Button = document.querySelector("#P2A1");
const p2a2Button = document.querySelector("#P2A2");
const p2a3Button = document.querySelector("#P2A3");
const P1 = document.querySelectorAll("#P1");
const P2 = document.querySelectorAll("#P2");

p1a1Button.addEventListener("click", selectAbilityP1A1);

p1a2Button.addEventListener("click", selectAbilityP1A2);

p1a3Button.addEventListener("click", selectAbilityP1A3);

p2a1Button.addEventListener("click", selectAbilityP2A1);

p2a2Button.addEventListener("click", selectAbilityP2A2);

p2a3Button.addEventListener("click", selectAbilityP2A3);

window.addEventListener("keydown", ActivateAbility);

P1.forEach(button => {
    button.addEventListener("click", () => {
        P1.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
    });
})

P2.forEach(button => {
    button.addEventListener("click", () => {
        P2.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
    });
})

let player1Ability = p1a1Button;
let player2Ability = p2a1Button;

function selectAbilityP1A1(){
    player1Ability = p1a1Button;
}
function selectAbilityP1A2(){
    player1Ability = p1a2Button;
}
function selectAbilityP1A3(){
    player1Ability = p1a3Button;
}

function selectAbilityP2A1(){
    player2Ability = p2a1Button;
}
function selectAbilityP2A2(){
    player2Ability = p2a2Button;
}
function selectAbilityP2A3(){
    player2Ability = p2a3Button;
}

function ActivateAbility(event){
    let keyPressed = event.keyCode;
    if(keyPressed == 68){
        if(player1Ability == p1a1Button){
            p1a1();
        }
        else if (player1Ability == p1a2Button){
            p1a2();
        }
        else if (player1Ability == p1a3Button){
            p1a3();
        }
    }
    if(keyPressed == 76){  
        if(player2Ability == p2a1Button){
            p2a1();
        }
        else if(player2Ability == p2a2Button){
            p2a2();
        }
        else if(player2Ability == p2a3Button){
            p2a3();
        }
    }
}

let player1InCd = false;
let player2InCd = false;
let defaultSpeed = 50;
function p1a1(){
    if(!player1InCd){
        player1InCd = true;
        player2Speed = 0;
        setTimeout(() => {
            player2Speed = defaultSpeed;
        }, 5000);
        
        setTimeout(()=> {
            player1InCd = false;
        }, 60000);
    }
}

function p1a2(){

}

function p1a3(){}

function p2a1(){}

function p2a2(){}

function p2a3(){}
