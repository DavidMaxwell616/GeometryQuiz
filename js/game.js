var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#5273ad";
ctx.fillRect(0, 0, c.width, c.height);
ctx.drawSvg("assets/shapes/1.svg", 0, 0);
const data = readFile("../assets/countryData.json");
const countries = JSON.parse(data);

for (let index = 0; index < countries.length; index++) {
  const country = countries[index];
  var filePath = 'assets/shapes/' + country.file + '.svg';
  var x = country.x;
  var y = country.y;
  ctx.drawSvg(filePath, x, y);
}