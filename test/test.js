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

let country;

function preload() {
  this.load.image('start', '../assets/start.png');

}

function drawCountry(game, key) {

  let scene = game.scene;
  cty = scene.add.image('assets/shapes/' + key + '.svg');
  // console.log(cty);

  //  scene.load.onLoadComplete.add(countryLoaded, this);
  var graphics = scene.add.graphics();
  graphics.lineStyle(5, 0xFF00FF, 1.0);
  graphics.beginPath();
  graphics.moveTo(100, 100);
  graphics.lineTo(200, 200);
  graphics.closePath();
  graphics.strokePath();
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
    drawCountry(this, 1);
  }
}