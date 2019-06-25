fabric.Object.prototype.set({
  transparentCorners: false,
  cornerColor: 'rgba(102,153,255,0.5)',
  cornerSize: 12,
  padding: 5,
});
var canvas = (window._canvas = new fabric.Canvas('c'));
var ctx = canvas.getContext('2d');

var file = 'assets/shapes/1.svg';
canvas.setBackgroundImage(file, canvas.renderAll.bind(canvas), {
  backgroundImageOpacity: 0.5,
  backgroundImageStretch: false,
});

// ctx.fillStyle = '#5273ad';
// ctx.fillRect(0, 0, canvas.width, canvas.height);

const data = readFile('../assets/countryData.json');
const countries = JSON.parse(data);

// fabric.Image.fromURL(data, function(img) {
//   // add background image
//   canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
//     scaleX: canvas.width / img.width,
//     scaleY: canvas.height / img.height,
//   });
//   img.src = 'assets/shapes/1.svg';
//   ctx.drawImage(svg, 0, 0);
//   canvas.renderAll();

for (let index = 0; index < countries.length; index++) {
  const country = countries[index];
  var x = country.x;
  var y = country.y;
  var filePath = 'assets/shapes/' + country.file + '.svg';
  fabric.loadSVGFromURL(filePath, function(objects, options) {
    var group = fabric.util.groupSVGElements(objects, options);
    group.set({
      left: parseInt(country.x, 10),
      top: parseInt(country.y, 10),
      id: country.country,
    });
    canvas.add(group);
    canvas.calcOffset();
    canvas.renderAll();
  });
}
// var x = country.x;
// var y = country.y;
// var svg = new Image();
// svg.src = filePath;
// svg.id = country.country;
// ctx.drawImage(svg, x, y);
//ctx.drawSvg(filePath, x, y);
//}
