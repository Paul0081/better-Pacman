function hide_showElm(){
    document.getElementById("btnStart").style.display = "none";
    document.getElementById("hideCanvas").style.display = "inline-block";
}
const canvas = document.getElementById("canvasMap");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.arc(200, 100, 22, Math.PI / 7, -Math.PI / 7, false);
ctx.lineTo(195, 100);
ctx.fillStyle = "yellow";
ctx.fill();
ctx.closePath();

