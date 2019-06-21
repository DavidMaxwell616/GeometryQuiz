var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var elements = [];
// Add event listener for `click` events.
c.addEventListener('click', function (event) {
  console.log('click');
}, false);

ctx.fillStyle = "#5273ad";
ctx.fillRect(0, 0, c.width, c.height);
var img = new Image();
img.onload = function () {
  ctx.drawImage(img, 0, 0);
}
img.src = "assets/shapes/1.svg";


const data = readFile("../assets/countryData.json");
const countries = JSON.parse(data);
for (let index = 0; index < countries.length; index++) {
  const country = countries[index];
  var filePath = 'assets/shapes/' + country.file + '.svg';
  var x = country.x;
  var y = country.y;
  var svg = new Image();
  svg.id = country.country;
  svg.onload = function () {
    ctx.drawImage(svg, x, y);
    elements.push(svg);
  }
  svg.src = filePath;
}