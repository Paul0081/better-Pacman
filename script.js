function hide_showElm(){
    document.getElementById("btnStart").style.display = "none";
    document.getElementById("hideCanvas").style.display = "inline-block";
}






var ctx = null;
var gameMap = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0,
    0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0,
    0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0,
    0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0,
    0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0,
    0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
var tileW = 40, tileH = 40;
var mapW = 28, mapH = 15;

//var currentSecond = 0, frameCount = 0, framesLastSecond = 0, lastFrameTime = 0;



let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;


var player = new Character();

function Character()
{
    this.tileFrom	= [1,1];
    this.tileTo		= [1,1];
    this.timeMoved	= 0;
    this.dimensions	= [30,30];
    this.position	= [45,45];
    this.delayMove	= 200;
}
Character.prototype.placeAt = function(x, y)
{
    this.tileFrom	= [x,y];
    this.tileTo		= [x,y];
    this.position	= [((tileW*x)+((tileW-this.dimensions[0])/2)),
        ((tileH*y)+((tileH-this.dimensions[1])/2))];
};
Character.prototype.processMovement = function(t)
{
    if(this.tileFrom[0]==this.tileTo[0] && this.tileFrom[1]==this.tileTo[1]) { return false; }

    if((t-this.timeMoved)>=this.delayMove)
    {
        this.placeAt(this.tileTo[0], this.tileTo[1]);
    }
    else
    {
        this.position[0] = (this.tileFrom[0] * tileW) + ((tileW-this.dimensions[0])/2);
        this.position[1] = (this.tileFrom[1] * tileH) + ((tileH-this.dimensions[1])/2);

        if(this.tileTo[0] != this.tileFrom[0])
        {
            var diff = (tileW / this.delayMove) * (t-this.timeMoved);
            this.position[0]+= (this.tileTo[0]<this.tileFrom[0] ? 0 - diff : diff);
        }
        if(this.tileTo[1] != this.tileFrom[1])
        {
            var diff = (tileH / this.delayMove) * (t-this.timeMoved);
            this.position[1]+= (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);
        }

        this.position[0] = Math.round(this.position[0]);
        this.position[1] = Math.round(this.position[1]);
    }

    return true;
}

function toIndex(x, y)
{
    return((y * mapW) + x);
}

window.onload = function()
{
    ctx = document.getElementById('canvasMap').getContext("2d");

    setInterval(draw, 10);


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


};

function draw()
{
    if(ctx==null) { return; }

    var currentFrameTime = Date.now();


    if(!player.processMovement(currentFrameTime))
    {
        if(upPressed === true && player.tileFrom[1]>0 && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1]-1)]==1) { player.tileTo[1]-= 1; }
        else if(downPressed === true && player.tileFrom[1]<(mapH-1) && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1]+1)]==1) { player.tileTo[1]+= 1; }
        else if(leftPressed === true && player.tileFrom[0]>0 && gameMap[toIndex(player.tileFrom[0]-1, player.tileFrom[1])]==1) { player.tileTo[0]-= 1; }
        else if(rightPressed === true && player.tileFrom[0]<(mapW-1) && gameMap[toIndex(player.tileFrom[0]+1, player.tileFrom[1])]==1) { player.tileTo[0]+= 1; }

        if(player.tileFrom[0]!=player.tileTo[0] || player.tileFrom[1]!=player.tileTo[1])
        { player.timeMoved = currentFrameTime; }
    }

    for(var y = 0; y < mapH; ++y)
    {
        for(var x = 0; x < mapW; ++x)
        {
            switch(gameMap[((y*mapW)+x)])
            {
                case 0:
                    ctx.fillStyle = "#685b48";
                    break;
                default:
                    ctx.fillStyle = "#5aa457";
            }

            ctx.fillRect( x*tileW, y*tileH, tileW, tileH);
        }
    }

    ctx.fillStyle = "#ff00ff";
    ctx.fillRect(player.position[0], player.position[1],
        player.dimensions[0], player.dimensions[1]);

}































/*const canvas = document.getElementById("canvasMap");
const ctx = canvas.getContext("2d");


let pacmanX = 200;
let pacmanY = 100;
let pacmanRadius = 20;


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
*/