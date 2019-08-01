function preload() {
  showLoader(this);
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