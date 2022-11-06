function hide_showElm(){
    document.getElementById("btnStart").style.display = "none";
    document.getElementById("hideCanvas").style.display = "inline-block";
}

const canvas = document.getElementById("canvasMap");
const ctx = canvas.getContext("2d");

const buffer = document.createElement("canvas").getContext("2d");
const context = document.querySelector("canvas").getContext("2d");

const map = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
];

const size = 60;

buffer.canvas.width = 20 * size;
buffer.canvas.height = 14 * size;

function drawMap() {

    for (let index = 0; index < map.length; index ++) {

        buffer.fillStyle = (map[index] === 1)?"#0000ff":"#ffffff";
        buffer.fillRect((index % 20) * size, Math.floor(index/20) * size, size, size);

    }
    context.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, context.canvas.width, context.canvas.height);
}
drawMap();



let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let pacmanX = 200;
let pacmanY = 100;
let pacmanRadius = 20;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = true;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = false;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = false;
    }
}

function drawPacmanRight() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    ctx.beginPath();
    ctx.arc(pacmanX, pacmanY, pacmanRadius, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(pacmanX-5, pacmanY);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}
function drawPacmanLeft() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    ctx.beginPath();
    ctx.arc(pacmanX, pacmanY, pacmanRadius, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(pacmanX-5, pacmanY);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}
function drawPacmanUp() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    ctx.beginPath();
    ctx.arc(pacmanX, pacmanY, pacmanRadius, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(pacmanX-5, pacmanY);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}
function drawPacmanDown() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    ctx.beginPath();
    ctx.arc(pacmanX, pacmanY, pacmanRadius, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(pacmanX-5, pacmanY);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    drawPacmanRight();
    if(rightPressed) {
        drawPacmanRight();
        pacmanX += 5;
        if (pacmanX + pacmanRadius > canvas.width){
            pacmanX = canvas.width - pacmanRadius;
        }
    }
    else if(leftPressed){
        drawPacmanLeft();
        pacmanX -= 5;
        if (pacmanX < pacmanRadius){
            pacmanX = pacmanRadius;
        }
    }
    else if(upPressed){
        drawPacmanUp();
        pacmanY -= 5;
        if (pacmanY < pacmanRadius){
            pacmanY = pacmanRadius;
        }
    }
    else if(downPressed) {
        drawPacmanDown();
        pacmanY += 5;
        if (pacmanY + pacmanRadius > canvas.height) {
            pacmanY = canvas.height - pacmanRadius;
        }
    }
}
setInterval(draw, 10);