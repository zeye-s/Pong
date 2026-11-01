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

let player1Speed = 50;
let player2Speed = 50;
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
    player1InCd = false;
    player2InCd = false;
    grace = false;
    P1Status.textContent = "Ready";
    P2Status.textContent = "Ready";
    p1Cooldown = 0;
    p2Cooldown = 0;
    player1Bar.classList.add("ready");
    player2Bar.classList.add("ready");

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
    if(ballSpeed >= 1 && ballSpeed <= 3){
        ctx.fillStyle = ballColor;
    }
    else if(ballSpeed < 1){
        ctx.fillStyle = "lightblue";
    }
    else if (ballSpeed >= 3){
        ctx.fillStyle = "orange";
    }
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
        if(!frenzy){
            player2Score += 1;
            ballSpeed = 1;
        }
        else if(frenzy){
            ballSpeed = 5;
        }
        createBall();
    }
    if(ballX >= Width - ballSize){
        if(!grace){
            player1Score += 1;
        }
        ballSpeed = 1;
        createBall();
    }

    if(ballX <= player1.x + player1.width + ballSize){
        if(ballY > player1.y && ballY < player1.y + player1.height){
            if(!explode){
                ballX = player1.x + player1.width + ballSize;
                directionX *= -1;
                ballSpeed += 0.5;
            }
            else if (explode){
                ctx.fillStyle = "red";
                ctx.beginPath();
                player1Score -= 2;
                updateScore();
                explode = false;
            }
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
const P1Status = document.querySelector("#P1Status");
const P2Status = document.querySelector("#P2Status");
const player1Bar = document.querySelector("#player1Bar");
const player2Bar = document.querySelector("#player2Bar");


let player1Ability = p1a1Button;
let player2Ability = p2a1Button;
let player1InCd = false;
let player2InCd = false;
let defaultSpeed = 50;
let p1Cooldown = 0;
let p2Cooldown = 0;
let grace = false;
let frenzy = false;
let explode = false;
let maxCooldown = 60;
let timePassed = 0;
let timePassed2 = 0;
let percentage = 100;

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
    if(event.key == "d"){
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
    if(event.key == "l"){
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


function p1a1(){
    if(!player1InCd){
        player1InCd = true;
        player2Speed = 0;

        p1Cooldown = 60;
        player1Bar.classList.remove("ready");
        player1Bar.style.width = "0%";
        P1Status.textContent = p1Cooldown + "s";
        let countdown = setInterval(() => {
            p1Cooldown --;
            timePassed = maxCooldown - p1Cooldown;
            percentage = (timePassed/ maxCooldown) * 100;
            player1Bar.style.width = percentage + "%";
            P1Status.textContent = p1Cooldown + "s";
            if(p1Cooldown <= 0){
                player1InCd = false;
                P1Status.textContent = "Ready";
                player1Bar.style.width = "100%";
                player1Bar.classList.add("ready");
                clearInterval(countdown);
                countdown = undefined;
            }
        }, 1000);

        p1a1Timeout = setTimeout(() => {
            player2Speed = defaultSpeed;
            p1a1Timeout = undefined;
        }, 5000);
    }
}

function p1a2(){
    if(!player1InCd){
        player1InCd = true;
        ballSpeed = 0.5;

        p1Cooldown = 60;
        player1Bar.classList.remove("ready");
        player1Bar.style.width = "0%";
        P1Status.textContent = p1Cooldown + "s";
        let countdown = setInterval(() => {
            p1Cooldown --;
            timePassed = maxCooldown - p1Cooldown;
            percentage = (timePassed/ maxCooldown) * 100;
            player1Bar.style.width = percentage + "%";
            P1Status.textContent = p1Cooldown + "s";
            if(p1Cooldown <= 0){
                player1InCd = false;
                P1Status.textContent = "Ready";
                player1Bar.style.width = "100%";
                player1Bar.classList.add("ready");
                clearInterval(countdown);
                countdown = undefined;
            }
        }, 1000);

        let p1a2Timeout = setTimeout(()=>{
            ballSpeed += 0.1;
            p1a2Timeout= undefined;
        }, 1000);
    }
}

function p1a3(){
    if(!player1InCd){
        frenzy = true;
        ballSpeed = 5;
        player1InCd = true;

        p1Cooldown = 60;
        player1Bar.classList.remove("ready");
        player1Bar.style.width = "0%";
        P1Status.textContent = p1Cooldown + "s";
        let countdown = setInterval(() => {
            p1Cooldown --;
            timePassed = maxCooldown - p1Cooldown;
            percentage = (timePassed/ maxCooldown) * 100;
            player1Bar.style.width = percentage + "%";
            P1Status.textContent = p1Cooldown + "s";
            if(p1Cooldown <= 0){
                player1InCd = false;
                P1Status.textContent = "Ready";
                player1Bar.style.width = "100%";
                player1Bar.classList.add("ready");
                clearInterval(countdown);
                countdown = undefined;
            }
        }, 1000);

        let p1a3Timeout = setTimeout(()=>{
            frenzy = false;
            p1a3Timeout = undefined;
        }, 1000);
    }
}

function p2a1(){
    if(!player2InCd){
        player2.height = 250;
        player2InCd = true;


        p2Cooldown = 60;
        player2Bar.classList.remove("ready");
        player2Bar.style.width = "0%";
        P2Status.textContent = p2Cooldown + "s";
        let countdown = setInterval(() => {
            p2Cooldown --;
            timePassed2 = maxCooldown - p2Cooldown;
            percentage = (timePassed/ maxCooldown) * 100;
            player2Bar.style.width = percentage + "%";
            P2Status.textContent = p2Cooldown + "s";
            if(p2Cooldown <= 0){
                player2InCd = false;
                P2Status.textContent = "Ready";
                player2Bar.style.width = "100%";
                player2Bar.classList.add("ready");
                clearInterval(countdown);
                countdown = undefined;
            }
        }, 1000);

        let p2a1Timeout = setTimeout(()=>{
            player2.height = 100;
            p2a1Timeout = undefined;
        },10000);
    }
}

function p2a2(){
    if(!player2InCd){
        explode = true;

        p2Cooldown = 60;
        player2Bar.classList.remove("ready");
        player2Bar.style.width = "0%";
        P2Status.textContent = p2Cooldown + "s";
        let countdown = setInterval(() => {
            p2Cooldown --;
            timePassed2 = maxCooldown - p2Cooldown;
            percentage = (timePassed/ maxCooldown) * 100;
            player2Bar.style.width = percentage + "%";
            P2Status.textContent = p2Cooldown + "s";
            if(p2Cooldown <= 0){
                player2InCd = false;
                P2Status.textContent = "Ready";
                player2Bar.style.width = "100%";
                player2Bar.classList.add("ready");
                clearInterval(countdown);
                countdown = undefined;
            }
        }, 1000);

    }
}

function p2a3(){
    if(!player2InCd){
        player2InCd = true;
        grace = true;

        p2Cooldown = 60;
        player2Bar.classList.remove("ready");
        player2Bar.style.width = "0%";
        P2Status.textContent = p2Cooldown + "s";
        let countdown = setInterval(() => {
            p2Cooldown --;
            timePassed2 = maxCooldown - p2Cooldown;
            percentage = (timePassed/ maxCooldown) * 100;
            player2Bar.style.width = percentage + "%";
            P2Status.textContent = p2Cooldown + "s";
            if(p2Cooldown <= 0){
                player2InCd = false;
                P2Status.textContent = "Ready";
                player2Bar.style.width = "100%";
                player2Bar.classList.add("ready");
                clearInterval(countdown);
                countdown = undefined;
            }
        }, 1000);

        p2a3Timeout = setTimeout(() => {
            grace = false;
            p2a3Timeout = undefined;
        }, 5000);
    }
}
