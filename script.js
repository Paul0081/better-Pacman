let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
//Zadeklarowanie zmiennych strzałek na klawiaturze

function startGame(){

    document.getElementById("btnStart").style.display = "none";
    document.getElementById("hideCanvas").style.display = "inline-block";
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
}
//Funkcja "Start" która ukrywa button start i odkrywa grę
//Funkcja która przy starcie strony zaczyna rysować mapę oraz obsługuje zmienne do ruchu Pacmana

function reloadGame()
{
    window.location.reload();
}
//Funkcja która odświeża stronę po wciśnięciu przycisku "gameover"

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

//Mapa i szerokość + wysokość mapy

var player = new Character();
//Pacman
function Character()
{
    this.tileFrom	= [1,1];
    this.tileTo		= [1,1];
    this.timeMoved	= 0;
    this.dimensions	= [0,0];
    this.position	= [60,60];
    this.delayMove	= 200;
}
//Dane pacmana - TileFrom TileTo - jego pozycja; DelayMove - szybkość ruchu; Dimensions - "aby zawsze był na środku kratki" operuje z funkcją PlaceAt; Position - jego pozycja na mapie (zmieniana często)
// TimeMoved - zmienna potrzebna do następnych funkcji

Character.prototype.placeAt = function(x, y)
{
    this.tileFrom	= [x,y];
    this.tileTo		= [x,y];
    this.position	= [((tileW*x)+((tileW-this.dimensions[0])/2)),
        ((tileH*y)+((tileH-this.dimensions[1])/2))];
};
//Sprawienie aby środek pacmana zawsze był na środku jego kratki w grze

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
//Kolizja ze ścianami oraz ogólny ruch pacmana

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
        this.delayMove	= 230;
    }
//Dane Duszka - TileFrom TileTo - jego pozycja; DelayMove - szybkość ruchu; Dimensions - "aby zawsze był na środku kratki" operuje z funkcją PlaceAt; Position - jego pozycja na mapie (zmieniana często)
// TimeMoved - zmienna potrzebna do następnych funkcji

    placeAt(x, y)
        {
            this.tileFrom	= [x,y];
            this.tileTo		= [x,y];
            this.position	= [((tileW*x)+((tileW-this.dimensions[0])/2)),
                ((tileH*y)+((tileH-this.dimensions[1])/2))];
        };
//Sprawienie aby środek duszka zawsze był na środku jego kratki w grze

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
//Kolizja ze ścianami oraz ogólny ruch duszków

};
//Classa Duszków w której zapisane są dane tworzonych duszków

let ghost1 = new ghost(14, 10);
let ghost2 = new ghost(14,10);
let ghost3 = new ghost(27,1);
let ghost4 = new ghost(27,13);
let ghost5 = new ghost(1,14);

class punkty
{
    tileFrom   = [];
    tileTo	= [];
    position = [];
    constructor(tileX, tileY) {
        this.tileFrom[0] = tileX;
        this.tileFrom[1] = tileY;
        this.tileTo[0] = tileX;
        this.tileTo[1] = tileY;
        this.position[0] = (tileX*40)-20;
        this.position[1] = (tileY*40)-20;
    }
}
//klasa duszków

let punkt1 = new punkty(2,3)
//stworzenie punktu

function toIndex(x, y)
{
    return((y * mapW) + x);
}
//Funkcja potrzebna w dalszych częściach kodu potrzebna dla wszystkich

function draw()
{
    if(ctx==null) { return; }
    //Potrzeby warunek żeby nic się nie działo jeżeli jeszcze gra nie jest odpalona
    var currentFrameTime = Date.now();
    //Zmienna która kontroluje to czy ktoś już się ruszył w tej "turze" ruchu. (Tak aby każdy ruszył się tylko raz) Jest ważna.

    X = player.tileTo[0];
    Y = player.tileTo[1];
    
    if (X === ghost1.tileTo[0] && Y===ghost1.tileTo[1] || X === ghost2.tileTo[0] && Y===ghost2.tileTo[1] || X === ghost3.tileTo[0] && Y===ghost3.tileTo[1] || X === ghost4.tileTo[0] && Y===ghost4.tileTo[1] || X === ghost5.tileTo[0] && Y===ghost5.tileTo[1])
    {
        document.getElementById("btnGameOver").style.display = "inline-block";
        document.getElementById("hideCanvas").style.display = "none";
    }
    //Kolizja z duszkami i wyświetlenie buttona Gameover gdyby tak się stało

    let ghost1Random = Math.floor((Math.random() * 4) + 1);
    if(!ghost1.processmovement(currentFrameTime))
    {
        if(ghost1Random===1 && ghost1.tileFrom[1]>0 && gameMap[toIndex(ghost1.tileFrom[0], ghost1.tileFrom[1]-1)]==1) { ghost1.tileTo[1]-= 1; }
        else if(ghost1Random===2 && gameMap[toIndex(ghost1.tileFrom[0], ghost1.tileFrom[1]+1)]==1) { ghost1.tileTo[1]+= 1; }
        else if(ghost1Random===3 && ghost1.tileFrom[0]>0 && gameMap[toIndex(ghost1.tileFrom[0]-1, ghost1.tileFrom[1])]==1) { ghost1.tileTo[0]-= 1; }
        else if(ghost1Random===4 && ghost1.tileFrom[0]<(mapW-1) && gameMap[toIndex(ghost1.tileFrom[0]+1, ghost1.tileFrom[1])]==1) { ghost1.tileTo[0]+= 1; }

        if(ghost1.tileFrom[0]!=ghost1.tileTo[0] || ghost1.tileFrom[1]!=ghost1.tileTo[1])
        { ghost1.timeMoved = currentFrameTime; }
    }
    //Ruch Duszków z uwzględnieniem kolizji oraz zmiennej Random

    let ghost2Random = Math.floor((Math.random() * 4) + 1);
    //Wylosowanie liczby od 1 do 4 i zapisanie w zmiennej Random
    if(!ghost2.processmovement(currentFrameTime))
    {
        if(ghost2Random===1 && ghost2.tileFrom[1]>0 && gameMap[toIndex(ghost2.tileFrom[0], ghost2.tileFrom[1]-1)]==1) { ghost2.tileTo[1]-= 1; }
        else if(ghost2Random===2 && gameMap[toIndex(ghost2.tileFrom[0], ghost2.tileFrom[1]+1)]==1) { ghost2.tileTo[1]+= 1; }
        else if(ghost2Random===3 && ghost2.tileFrom[0]>0 && gameMap[toIndex(ghost2.tileFrom[0]-1, ghost2.tileFrom[1])]==1) { ghost2.tileTo[0]-= 1; }
        else if(ghost2Random===4 && ghost2.tileFrom[0]<(mapW-1) && gameMap[toIndex(ghost2.tileFrom[0]+1, ghost2.tileFrom[1])]==1) { ghost2.tileTo[0]+= 1; }

        if(ghost2.tileFrom[0]!=ghost2.tileTo[0] || ghost2.tileFrom[1]!=ghost2.tileTo[1])
        { ghost2.timeMoved = currentFrameTime; }
    }
    //Ruch Duszków z uwzględnieniem kolizji oraz zmiennej Random

    let ghost3Random = Math.floor((Math.random() * 4) + 1);
    if(!ghost3.processmovement(currentFrameTime))
    {
        if(ghost3Random===1 && ghost3.tileFrom[1]>0 && gameMap[toIndex(ghost3.tileFrom[0], ghost3.tileFrom[1]-1)]==1) { ghost3.tileTo[1]-= 1; }
        else if(ghost3Random===2 && gameMap[toIndex(ghost3.tileFrom[0], ghost3.tileFrom[1]+1)]==1) { ghost3.tileTo[1]+= 1; }
        else if(ghost3Random===3 && ghost3.tileFrom[0]>0 && gameMap[toIndex(ghost3.tileFrom[0]-1, ghost3.tileFrom[1])]==1) { ghost3.tileTo[0]-= 1; }
        else if(ghost3Random===4 && ghost3.tileFrom[0]<(mapW-1) && gameMap[toIndex(ghost3.tileFrom[0]+1, ghost3.tileFrom[1])]==1) { ghost3.tileTo[0]+= 1; }

        if(ghost3.tileFrom[0]!=ghost3.tileTo[0] || ghost3.tileFrom[1]!=ghost3.tileTo[1])
        { ghost3.timeMoved = currentFrameTime; }
    }
    //Ruch Duszków z uwzględnieniem kolizji oraz zmiennej random

    let ghost4Random = Math.floor((Math.random() * 4) + 1);
    if(!ghost4.processmovement(currentFrameTime))
    {
        if(ghost4Random===1 && ghost4.tileFrom[1]>0 && gameMap[toIndex(ghost4.tileFrom[0], ghost4.tileFrom[1]-1)]==1) { ghost4.tileTo[1]-= 1; }
        else if(ghost4Random===2 && gameMap[toIndex(ghost4.tileFrom[0], ghost4.tileFrom[1]+1)]==1) { ghost4.tileTo[1]+= 1; }
        else if(ghost4Random===3 && ghost4.tileFrom[0]>0 && gameMap[toIndex(ghost4.tileFrom[0]-1, ghost4.tileFrom[1])]==1) { ghost4.tileTo[0]-= 1; }
        else if(ghost4Random===4 && ghost4.tileFrom[0]<(mapW-1) && gameMap[toIndex(ghost4.tileFrom[0]+1, ghost4.tileFrom[1])]==1) { ghost4.tileTo[0]+= 1; }

        if(ghost4.tileFrom[0]!=ghost4.tileTo[0] || ghost4.tileFrom[1]!=ghost4.tileTo[1])
        { ghost4.timeMoved = currentFrameTime; }
    }
    //Ruch Duszków z uwzględnieniem kolizji oraz zmiennej Random

    let ghost5Random = Math.floor((Math.random() * 4) + 1);
    if(!ghost5.processmovement(currentFrameTime))
    {
        if(ghost5Random===1 && ghost5.tileFrom[1]>0 && gameMap[toIndex(ghost5.tileFrom[0], ghost5.tileFrom[1]-1)]==1) { ghost5.tileTo[1]-= 1; }
        else if(ghost5Random===2 && gameMap[toIndex(ghost5.tileFrom[0], ghost5.tileFrom[1]+1)]==1) { ghost5.tileTo[1]+= 1; }
        else if(ghost5Random===3 && ghost5.tileFrom[0]>0 && gameMap[toIndex(ghost5.tileFrom[0]-1, ghost5.tileFrom[1])]==1) { ghost5.tileTo[0]-= 1; }
        else if(ghost5Random===4 && ghost5.tileFrom[0]<(mapW-1) && gameMap[toIndex(ghost5.tileFrom[0]+1, ghost5.tileFrom[1])]==1) { ghost5.tileTo[0]+= 1; }

        if(ghost5.tileFrom[0]!=ghost5.tileTo[0] || ghost5.tileFrom[1]!=ghost5.tileTo[1])
        { ghost5.timeMoved = currentFrameTime; }
    }
    //Ruch Duszków z uwzględnieniem kolizji oraz zmiennej random

    if(!player.processMovement(currentFrameTime))
    {
        if(upPressed === true && player.tileFrom[1]>0 && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1]-1)]==1) { player.tileTo[1]-= 1; }
        else if(downPressed === true && player.tileFrom[1]<(mapH-1) && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1]+1)]==1) { player.tileTo[1]+= 1; }
        else if(leftPressed === true && player.tileFrom[0]>0 && gameMap[toIndex(player.tileFrom[0]-1, player.tileFrom[1])]==1) { player.tileTo[0]-= 1; }
        else if(rightPressed === true && player.tileFrom[0]<(mapW-1) && gameMap[toIndex(player.tileFrom[0]+1, player.tileFrom[1])]==1) { player.tileTo[0]+= 1; }

        if(player.tileFrom[0]!=player.tileTo[0] || player.tileFrom[1]!=player.tileTo[1])
        { player.timeMoved = currentFrameTime; }
    }
    //Ruch Pacmana z uwzględnieniem przycisnięcia klawiszy na klawiaturze

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
                    break;
            }

            ctx.fillRect( x*tileW, y*tileH, tileW, tileH);
        }
    }
    //Narysowanie Mapy

    if (X+1 === punkt1.tileTo[0] && Y+1 === punkt1.tileTo[1])
    {
        punkt1.position = [1000,1000]
    }
    //likwidacja punktu po najechaniu pacmana

    ctx.beginPath();
    ctx.arc(player.position[0], player.position[1], 16, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(player.position[0]-1, player.position[1]);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
    //Rysowanie Pacmanana

    ctx.beginPath();
    ctx.arc(ghost1.position[0], ghost1.position[1], 16, Math.PI, -Math.PI, false);
    ctx.lineTo(ghost1.position[0]-1, ghost1.position[1]);
    ctx.fillStyle = "purple";
    ctx.fill();
    ctx.closePath();
    //Rysowanie duszka

    ctx.beginPath();
    ctx.arc(ghost2.position[0], ghost2.position[1], 16, Math.PI, -Math.PI, false);
    ctx.lineTo(ghost2.position[0], ghost2.position[1]);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    //Rysowanie duszka

    ctx.beginPath();
    ctx.arc(ghost3.position[0], ghost3.position[1], 16, Math.PI, -Math.PI, false);
    ctx.lineTo(ghost3.position[0]-1, ghost3.position[1]);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
    //Rysowanie duszka

    ctx.beginPath();
    ctx.arc(ghost4.position[0], ghost4.position[1], 16, Math.PI, -Math.PI, false);
    ctx.lineTo(ghost4.position[0]-1, ghost4.position[1]);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    //Rysowanie duszka

    ctx.beginPath();
    ctx.arc(ghost5.position[0], ghost5.position[1], 16, Math.PI, -Math.PI, false);
    ctx.lineTo(ghost5.position[0]-1, ghost5.position[1]);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    //Rysowanie duszka

    ctx.beginPath();
    ctx.arc(punkt1.position[0], punkt1.position[1], 6, Math.PI, -Math.PI, false);
    ctx.lineTo(punkt1.position[0] - 1, punkt1.position[1]);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
    //Rysowanie duszka
}

