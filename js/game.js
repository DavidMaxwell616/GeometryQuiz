var config = {
  width: 1000,
  height: 500,
  type: Phaser.AUTO,
  backgroundColor: '#5273AD',
  parent: 'game',
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};

var game = new Phaser.Game(config);

function create() {

  countryData = this.cache.json.get('countryData');
  country_keys = Object.keys(countryData);
  maxxdaddy = this.add.image(this.game.config.width * 0.9, this.game.config.height * 0.95, 'maxxdaddy');
  background = this.add.image(0, 0, 'background').setOrigin(0, 0);
  background.name = 'background';
  background.setInteractive();
  dialog = this.add.image(this.game.config.width / 2 - 100, this.game.config.height * .8, 'dialog').setOrigin(0, 0);
  start = this.add.image(this.game.config.width / 2 + 40, this.game.config.height * .92, 'start').setOrigin(0, 0);
  start.name = 'start';
  start.setInteractive();
  this.input.on('gameobjectdown', onObjectClicked);
  dialogText = this.add.text(this.game.config.width / 2 - 60, this.game.config.height * .83, 'GEOGRAPHY QUIZ', {
    fontFamily: 'arial',
    fontSize: '32px',
    fontStyle: 'bold',
    fill: '#ff4500'
  });

  alertText = this.add.text(this.game.config.width / 2 - 40, this.game.config.height / 2 - 100, '', {
    fontFamily: 'arial',
    fontSize: '32px',
    fontStyle: 'bold',
    fill: '#ff0000'
  });
  alertText.visible = false;

  timerBox = this.add.graphics();
  timerBar = this.add.graphics();
  timerBar2 = this.add.graphics();
  timerBox.fillStyle(0x111111, 1);
  timerBox.fillRect(this.game.config.width / 2 - 70, this.game.config.height - 90, 320, 30);
  timerBar.fillStyle(0xff4500, 1);
  timerBar.fillRect(this.game.config.width / 2 - 65, this.game.config.height - 85, 310, 20);
  timerBar.visible = false;
  timerBar2.visible = false;
  timerBox.visible = false;
}

function onObjectClicked(pointer, gameObject) {
  if (gameObject.name == 'start') {
    startGame = true;
    timerBar.visible = true;
    timerBar2.visible = true;
    timerBox.visible = true;
    let config = this.scene.game.config;
    dialogText.y = config.height - 60;
    start.visible = false;
    attemptStarted = false;
  } else if (attemptStarted && gameObject.name == 'background') {
    if (pointer.downX > country.x && pointer.downX < country.x + country.width &&
      pointer.downY > country.y && pointer.downY < country.y + country.y + country.height)
      correctAnswer(this.scene);
    else
      wrongAnswer(this.scene);
  }
}

function correctAnswer(scene) {
  alertText.visible = true;
  alertText.setText('CORRECT!');
  var timer = scene.time.addEvent({
    delay: 2000, // ms
    callback: callback => {
      alertText.visible = false;
      timerCount = 0;
      attemptStarted = false;
      drawCountry();
      wait = false;
      correctAnswers.push(country.country);
    },
    callbackScope: scene,
    loop: false
  });
  wait = true;
}

function wrongAnswer(scene) {
  alertText.visible = true;
  alertText.setText('INCORRECT!');
  var timer = scene.time.addEvent({
    delay: 2000, // ms
    callback: callback => {
      alertText.visible = false;
    },
    callbackScope: scene,
    loop: false
  });
}

function drawCountry() {

}

function update() {
  if (!startGame)
    return;
  if (lives > 0) {
    if (timerCount < 320) {
      if (!attemptStarted) {
        var ran_key = country_keys[Math.floor(Math.random() * country_keys.length)];
        country = countryData[ran_key];
        attemptStarted = true;
        timerCount = 0;
        timerBar2.clear();
        timerBar2.fillStyle(0x111111, 0.8);
      }
      if (!wait) {
        timerBar2.fillRect((this.game.config.width / 2 + 250) - timerCount, this.game.config.height - 85, timerCount, 20);
        timerCount++;
      }
    } else {
      attemptStarted = false;
      lives--;
    }


    dialogText.setText('Find: ' + country.country + '\nAttempts left: ' + lives + '\nCountries left: ' + (country_keys.length - correctAnswers.length));
    dialogText.setFont('16px Arial');
  }
}