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
    this.dimensions	= [0,0];
    this.position	= [60,60];
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

class ghost
{
    tileFrom   = [];
    tileTo		= [];
    constructor(tileX, tileY) {
        this.tileFrom[0] = tileX;
        this.tileFrom[1] = tileY;
        this.tileTo[0] = tileX;
        this.tileTo[1] = tileY;
        this.timeMoved	= 0;
        this.dimensions	= [0,0];
        this.position	= [60,60];
        this.delayMove	= 200;
    }
    placeAt(x, y)
        {
            this.tileFrom	= [x,y];
            this.tileTo		= [x,y];
            this.position	= [((tileW*x)+((tileW-this.dimensions[0])/2)),
                ((tileH*y)+((tileH-this.dimensions[1])/2))];
        };


    processmovement(t)
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


};

let improved = new ghost(14, 10);
let AI = new ghost(14,10);
let AIprawo = new ghost(27,1);
let AIdolprawo = new ghost(27,13);
let AIdollewo = new ghost(1,14);


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



    let brush = Math.floor((Math.random() * 4) + 1);
    if(!AI.processmovement(currentFrameTime))
    {
        if(brush===1 && AI.tileFrom[1]>0 && gameMap[toIndex(AI.tileFrom[0], AI.tileFrom[1]-1)]==1) { AI.tileTo[1]-= 1; }
        else if(brush===2 && gameMap[toIndex(AI.tileFrom[0], AI.tileFrom[1]+1)]==1) { AI.tileTo[1]+= 1; }
        else if(brush===3 && AI.tileFrom[0]>0 && gameMap[toIndex(AI.tileFrom[0]-1, AI.tileFrom[1])]==1) { AI.tileTo[0]-= 1; }
        else if(brush===4 && AI.tileFrom[0]<(mapW-1) && gameMap[toIndex(AI.tileFrom[0]+1, AI.tileFrom[1])]==1) { AI.tileTo[0]+= 1; }

        if(AI.tileFrom[0]!=AI.tileTo[0] || AI.tileFrom[1]!=AI.tileTo[1])
        { AI.timeMoved = currentFrameTime; }
    }
    let improvedBruh = Math.floor((Math.random() * 4) + 1);
    if(!improved.processmovement(currentFrameTime))
    {
        if(improvedBruh===1 && improved.tileFrom[1]>0 && gameMap[toIndex(improved.tileFrom[0], improved.tileFrom[1]-1)]==1) { improved.tileTo[1]-= 1; }
        else if(improvedBruh===2 && gameMap[toIndex(improved.tileFrom[0], improved.tileFrom[1]+1)]==1) { improved.tileTo[1]+= 1; }
        else if(improvedBruh===3 && improved.tileFrom[0]>0 && gameMap[toIndex(improved.tileFrom[0]-1, improved.tileFrom[1])]==1) { improved.tileTo[0]-= 1; }
        else if(improvedBruh===4 && improved.tileFrom[0]<(mapW-1) && gameMap[toIndex(improved.tileFrom[0]+1, improved.tileFrom[1])]==1) { improved.tileTo[0]+= 1; }

        if(improved.tileFrom[0]!=improved.tileTo[0] || improved.tileFrom[1]!=improved.tileTo[1])
        { improved.timeMoved = currentFrameTime; }
    }

    let brushdol = Math.floor((Math.random() * 4) + 1);
    if(!AIdolprawo.processmovement(currentFrameTime))
    {
        if(brushdol===1 && AIdolprawo.tileFrom[1]>0 && gameMap[toIndex(AIdolprawo.tileFrom[0], AIdolprawo.tileFrom[1]-1)]==1) { AIdolprawo.tileTo[1]-= 1; }
        else if(brushdol===2 && gameMap[toIndex(AIdolprawo.tileFrom[0], AIdolprawo.tileFrom[1]+1)]==1) { AIdolprawo.tileTo[1]+= 1; }
        else if(brushdol===3 && AIdolprawo.tileFrom[0]>0 && gameMap[toIndex(AIdolprawo.tileFrom[0]-1, AIdolprawo.tileFrom[1])]==1) { AIdolprawo.tileTo[0]-= 1; }
        else if(brushdol===4 && AIdolprawo.tileFrom[0]<(mapW-1) && gameMap[toIndex(AIdolprawo.tileFrom[0]+1, AIdolprawo.tileFrom[1])]==1) { AIdolprawo.tileTo[0]+= 1; }

        if(AIdolprawo.tileFrom[0]!=AIdolprawo.tileTo[0] || AIdolprawo.tileFrom[1]!=AIdolprawo.tileTo[1])
        { AIdolprawo.timeMoved = currentFrameTime; }
    }


    let brushdollewo = Math.floor((Math.random() * 4) + 1);
    if(!AIdollewo.processmovement(currentFrameTime))
    {
        if(brushdollewo===1 && AIdollewo.tileFrom[1]>0 && gameMap[toIndex(AIdollewo.tileFrom[0], AIdollewo.tileFrom[1]-1)]==1) { AIdollewo.tileTo[1]-= 1; }
        else if(brushdollewo===2 && gameMap[toIndex(AIdollewo.tileFrom[0], AIdollewo.tileFrom[1]+1)]==1) { AIdollewo.tileTo[1]+= 1; }
        else if(brushdollewo===3 && AIdollewo.tileFrom[0]>0 && gameMap[toIndex(AIdollewo.tileFrom[0]-1, AIdollewo.tileFrom[1])]==1) { AIdollewo.tileTo[0]-= 1; }
        else if(brushdollewo===4 && AIdollewo.tileFrom[0]<(mapW-1) && gameMap[toIndex(AIdollewo.tileFrom[0]+1, AIdollewo.tileFrom[1])]==1) { AIdollewo.tileTo[0]+= 1; }

        if(AIdollewo.tileFrom[0]!=AIdollewo.tileTo[0] || AIdollewo.tileFrom[1]!=AIdollewo.tileTo[1])
        { AIdollewo.timeMoved = currentFrameTime; }
    }


    let brushprawo = Math.floor((Math.random() * 4) + 1);
    if(!AIprawo.processmovement(currentFrameTime))
    {
        if(brushprawo===1 && AIprawo.tileFrom[1]>0 && gameMap[toIndex(AIprawo.tileFrom[0], AIprawo.tileFrom[1]-1)]==1) { AIprawo.tileTo[1]-= 1; }
        else if(brushprawo===2 && gameMap[toIndex(AIprawo.tileFrom[0], AIprawo.tileFrom[1]+1)]==1) { AIprawo.tileTo[1]+= 1; }
        else if(brushprawo===3 && AIprawo.tileFrom[0]>0 && gameMap[toIndex(AIprawo.tileFrom[0]-1, AIprawo.tileFrom[1])]==1) { AIprawo.tileTo[0]-= 1; }
        else if(brushprawo===4 && AIprawo.tileFrom[0]<(mapW-1) && gameMap[toIndex(AIprawo.tileFrom[0]+1, AIprawo.tileFrom[1])]==1) { AIprawo.tileTo[0]+= 1; }

        if(AIprawo.tileFrom[0]!=AIprawo.tileTo[0] || AIprawo.tileFrom[1]!=AIprawo.tileTo[1])
        { AIprawo.timeMoved = currentFrameTime; }
    }





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
                    ctx.fillStyle = "#0031FF";
                    break;
                default:
                    ctx.fillStyle = "#0D1940";
            }

            ctx.fillRect( x*tileW, y*tileH, tileW, tileH);
        }
    }

    ctx.beginPath();
    ctx.arc(player.position[0], player.position[1], 16, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(player.position[0]-1, player.position[1]);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(AI.position[0], AI.position[1], 16, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(AI.position[0]-1, AI.position[1]);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(AIprawo.position[0], AIprawo.position[1], 16, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(AIprawo.position[0]-1, AIprawo.position[1]);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(AIdolprawo.position[0], AIdolprawo.position[1], 16, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(AIdolprawo.position[0]-1, AIdolprawo.position[1]);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(AIdollewo.position[0], AIdollewo.position[1], 16, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(AIdollewo.position[0]-1, AIdollewo.position[1]);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(improved.position[0], improved.position[1], 16, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(improved.position[0]-1, improved.position[1]);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}


/*
var AI = new Ghost();

function Ghost()
{
    this.tileFrom	= [1,1];
    this.tileTo		= [1,1];
    this.timeMoved	= 0;
    this.dimensions	= [0,0];
    this.position	= [800,350];
    this.delayMove	= 200;
}
Ghost.prototype.placeAt = function(x, y)
{
    this.tileFrom	= [x,y];
    this.tileTo		= [x,y];
    this.position	= [((tileW*x)+((tileW-this.dimensions[0])/2)),
        ((tileH*y)+((tileH-this.dimensions[1])/2))];
};



Ghost.prototype.processMovement = function(t)
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

};

function draw()
{
    if(ctx==null) { return; }
    var currentFrameTime = Date.now();
    let brush = Math.floor((Math.random() * 4) + 1);
    if(!AI.processMovement(currentFrameTime))
    {
        if(brush===1 && AI.tileFrom[1]>0 && gameMap[toIndex(AI.tileFrom[0], AI.tileFrom[1]-1)]==1) { AI.tileTo[1]-= 1; }
        else if(brush===2 && gameMap[toIndex(AI.tileFrom[0], AI.tileFrom[1]+1)]==1) { AI.tileTo[1]+= 1; }
        else if(brush===3 && AI.tileFrom[0]>0 && gameMap[toIndex(AI.tileFrom[0]-1, AI.tileFrom[1])]==1) { AI.tileTo[0]-= 1; }
        else if(brush===4 && AI.tileFrom[0]<(mapW-1) && gameMap[toIndex(AI.tileFrom[0]+1, AI.tileFrom[1])]==1) { AI.tileTo[0]+= 1; }

        if(AI.tileFrom[0]!=AI.tileTo[0] || AI.tileFrom[1]!=AI.tileTo[1])
        { AI.timeMoved = currentFrameTime; }
    }
    for(var y = 0; y < mapH; ++y)
    {
        for(var x = 0; x < mapW; ++x)
        {
            switch(gameMap[((y*mapW)+x)])
            {
                case 0:
                    ctx.fillStyle = "#0031FF";
                    break;
                default:
                    ctx.fillStyle = "#0D1940";
            }

            ctx.fillRect( x*tileW, y*tileH, tileW, tileH);
        }
    }

    ctx.beginPath();
    ctx.arc(AI.position[0], AI.position[1], 16, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(AI.position[0]-1, AI.position[1]);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

}
*/