var canvas = new fabric.Canvas('canvas');
var ctx = canvas.getContext("2d");
var img = new Image();
img.onload = function () {
  ctx.drawImage(img, 0, 0, 700, 350);
}

img.src = "../assets/shapes/1.svg";
canvas.backgroundColor = "#5273ad";
const data = readFile("../assets/countryData.json");
const countries = JSON.parse(data);

const country = countries[1];
fabric.loadSVGFromURL('../assets/shapes/' + country.file + '.svg', function (objects, options) {
  var obj = fabric.util.groupSVGElements(objects, options);
  obj.scale(0.5);
  canvas.add(obj);

});



//const country = countries[3];
// var x = country.x;
// var y = country.y;
// fabric.Image.fromURL('../assets/shapes/' + country.file + '.svg', function (oImg) {
//   canvas.add(oImg);
// });
// for (let index = 0; index < countries.length; index++) {
//   const country = countries[index];
//   var filePath = '../assets/shapes/' + country.file + '.svg';
//   var x = country.x;
//   var y = country.y;
//   var svg = new Image();
//   svg.id = country.country;
//   svg.onload = function () {
//     ctx.drawImage(svg, x, y);
//     //elements.push(svg);
//   }
//   svg.src = filePath;
// }
canvas.renderAll();