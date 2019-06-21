var canvas = new fabric.Canvas('canvas');
var ctx = canvas.getContext("2d");
var img = new Image();
img.onload = function () {
  ctx.drawImage(img, 0, 0, 700, 350);
}
img.src = "../assets/shapes/1.svg";
canvas.backgroundColor = "#5273ad";
canvas.renderAll();