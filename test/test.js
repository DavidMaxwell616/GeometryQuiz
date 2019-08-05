var config = {
  type: Phaser.AUTO,
  parent: 'phaser-test',
  width: 1000,
  height: 500,
  backgroundColor: '#001133',
  scene: {
    preload: preload,
    create: create,
  },
};

var game = new Phaser.Game(config);

let country = {
  "file": 10,
  "country": "Alaska",
  "width": 104,
  "height": 72,
  "x": "33",
  "y": "63"
};

function preload() {
  // showLoader(this);
  this.load.path = '../assets/shapes/';
  this.load.image('background', '1.svg');

  this.load.path = '../assets/';
  countries = this.load.json('countryData', 'countryData.json');
  this.load.image('maxxdaddy', 'maxxdaddy.gif');
  this.load.image('start', 'start.png');
  this.load.image('dialog', 'dialog.png');

  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;
  this.scale.refresh();
}

function drawCountry(game) {

  let scene = game.scene;
  let key = country.file;
  let url = '../assets/shapes/' + key + '.svg';

  scene.load.image(key, url);
  scene.load.once('complete', () => {
    //var src = scene.textures.get(key).getSourceImage();

    //var canvas = scene.textures.createCanvas('map_' + key, src.width, src.height).draw(0, 0, src);
    // var data = canvas.imageData;
    // console.log(data);
    // var img = new Image();
    // img.src = data;
    scene.add.image(country.x, country.y, key);
    // canvas.refresh();

    // var pixel = new Phaser.Display.Color();
    // var xOffset = country.x;
    // for (var y = 0; y < src.height; y++) {
    //   for (var x = 0; x < src.width; x++) {
    //     canvas.getPixel(x, y, pixel);
    //     if (pixel.a > 0) {
    //       scene.add.rectangle(x + 33, y + 63, 1, 1, pixel.color);
    //     }
    //   }
    // }
  });

  game.scene.load.start(); // start loading


}




function create() {
  start = this.add
    .image(
      this.game.config.width / 2 + 40,
      this.game.config.height * 0.92,
      'start',
    )
    .setOrigin(0, 0);
  start.name = 'start';
  start.setInteractive();
  this.input.on('gameobjectdown', onObjectClicked);
}

function onObjectClicked(pointer, gameObject) {
  if (gameObject.name == 'start') {
    drawCountry(this);
  }
}

function showLoader(game) {
  var progressBar = game.add.graphics();
  var progressBox = game.add.graphics();
  progressBox.fillStyle(0x222222, 0.8);
  progressBox.fillRect(340, 270, 320, 50);
  game.load.on('progress', function (value) {});

  game.load.on('fileprogress', function (file) {});

  game.load.on('complete', function () {
    progressBar.destroy();
    progressBox.destroy();
    loadingText.destroy();
    percentText.destroy();
  });
  game.load.on('progress', function (value) {
    progressBar.clear();
    progressBar.fillStyle(0xff4500, 1);
    progressBar.fillRect(350, 280, 300 * value, 30);
    percentText.setText(parseInt(value * 100) + '%');
  });

  var width = game.cameras.main.width;
  var height = game.cameras.main.height;
  var loadingText = game.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: 'Loading...',
    style: {
      font: '20px monospace',
      fill: '#ffffff'
    }
  });
  loadingText.setOrigin(0.5, 0.5);

  var percentText = game.make.text({
    x: width / 2,
    y: height / 2 - 5,
    text: '0%',
    style: {
      font: '18px monospace',
      fill: '#ffffff'
    }
  });
  percentText.setOrigin(0.5, 0.5);
}