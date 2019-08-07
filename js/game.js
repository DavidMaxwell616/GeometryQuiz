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
  },
};

var game = new Phaser.Game(config);

function create() {
  countryData = this.cache.json.get('countryData');
  maxxdaddy = this.add.image(
    this.game.config.width * 0.9,
    this.game.config.height * 0.95,
    'maxxdaddy',
  );
  background = this.add.image(0, 0, 'background').setOrigin(0, 0);
  background.name = 'background';
  background.setInteractive();
  dialog = this.add
    .image(
      this.game.config.width / 2 - 100,
      this.game.config.height * 0.8,
      'dialog',
    )
    .setOrigin(0, 0);
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
  dialogText = this.add.text(
    this.game.config.width / 2 - 60,
    this.game.config.height * 0.83,
    'GEOGRAPHY QUIZ', {
      fontFamily: 'arial',
      fontSize: '32px',
      fontStyle: 'bold',
      fill: '#ff4500',
    },
  );

  alertText = this.add.text(
    this.game.config.width / 2 - 40,
    this.game.config.height / 2 - 100,
    '', {
      fontFamily: 'arial',
      fontSize: '32px',
      fontStyle: 'bold',
      fill: '#ff0000',
    },
  );
  alertText.visible = false;

  timerBox = this.add.graphics();
  timerBar = this.add.graphics();
  timerBar2 = this.add.graphics();
  timerBox.fillStyle(0x111111, 1);
  timerBox.fillRect(
    this.game.config.width / 2 - 70,
    this.game.config.height - 90,
    320,
    30,
  );
  timerBar.fillStyle(0xff4500, 1);
  timerBar.fillRect(
    this.game.config.width / 2 - 65,
    this.game.config.height - 85,
    310,
    20,
  );
  timerBar.visible = false;
  timerBar2.visible = false;
  timerBox.visible = false;
  countries = this.add.group();
}

function onObjectClicked(pointer, gameObject) {
  if (gameObject.name == 'start') {
    alertText.setText('');
    startGame = true;
    timerBar.visible = true;
    timerBar2.visible = true;
    timerBox.visible = true;
    let config = this.scene.game.config;
    dialogText.y = config.height - 60;
    start.visible = false;
    attemptStarted = false;
  } else if (attemptStarted && gameObject.name == 'background') {
    if (
      pointer.downX > country.x &&
      pointer.downX < country.x + country.width &&
      pointer.downY > country.y &&
      pointer.downY < country.y + country.height
    )
      correctAnswer(this);
    else wrongAnswer(this);
  }
}

function correctAnswer(game) {
  alertText.visible = true;
  alertText.setText('CORRECT!');
  alertText.setDepth(1);
  tmpCountry = country;
  game.scene.time.addEvent({
    delay: 2000, // ms
    callback: callback => {
      alertText.visible = false;
      timerCount = 0;
      attemptStarted = false;
      drawCountry(game, tmpCountry);
      wait = false;
      correctAnswers.push(country);
    },
    callbackScope: game.scene,
    loop: false,
  });
  wait = true;
}

function wrongAnswer(game) {
  alertText.visible = true;
  alertText.setText('INCORRECT!');
  alertText.setDepth(1);
  game.scene.time.addEvent({
    delay: 2000, // ms
    callback: callback => {
      alertText.visible = false;
    },
    callbackScope: game.scene,
    loop: false,
  });
}

function drawCountry(game, tmpCountry) {
  // console.log(country.x, country.y);
  // console.log(country);
  let scene = game.scene;
  let key = country.file;
  let url = '../assets/shapes/' + key + '.svg';
  scene.load.image(key, url);
  scene.load.once('complete', () => {
    //console.log(tmpCountry.country, tmpCountry.x, tmpCountry.y);
    const img = scene.add.image(tmpCountry.x, tmpCountry.y, key).setOrigin(0.0, 0.0);
    countries.add(img);
    //scene.add.image(country.x, country.y, key).setOrigin(0.5, 0.5);
  });

  game.scene.load.start();

}

function getCountry() {
  let rand = null;

  while (rand === null || correctAnswers.includes(rand)) {
    rand = countryData[Math.floor(Math.random() * countryData.length)];
  }
  return rand;
}

function update() {
  if (!startGame) return;
  if (lives > 0) {
    if (timerCount < 320) {
      if (!attemptStarted) {
        country = getCountry();
        // country = countryData[21];
        // console.log(country);
        attemptStarted = true;
        timerCount = 0;
        timerBar2.clear();
        timerBar2.fillStyle(0x111111, 0.8);
      }
      if (!wait) {
        timerBar2.fillRect(
          this.game.config.width / 2 + 250 - timerCount,
          this.game.config.height - 85,
          timerCount,
          20,
        );
        timerCount++;
      }
    } else {
      attemptStarted = false;
      lives--;
      timerCount = 0;
    }
    let percent = (correctAnswers.length / countryData.length * 100).toFixed(2);;
    dialogText.setText(
      'Find: ' +
      country.country +
      '\nAttempts left: ' +
      lives +
      '\nCorrect Answers: ' +
      correctAnswers.length + ' - ' + percent + '%',
    );
    dialogText.setFont('16px Arial');
  } else {
    alertText.visible = true;
    alertText.setText('GAME OVER!');
    this.time.addEvent({
      delay: 5000, // ms
      callback: callback => {
        alertText.visible = false;
        this.game.config.width / 2 - 100,
          this.game.config.height * 0.8,
          dialogText.setText('GEOGRAPHY QUIZ');
        dialogText.setPosition(this.game.config.width / 2 - 60,
          this.game.config.height * 0.83);
        dialogText.setFont('bold 32px Arial');
        start.visible = true;
        start.setInteractive();
        startGame = false;
        timerBox.visible = false;
        timerBar.visible = false;
        timerBar2.visible = false;
        lives = 5;
        correctAnswers = [];
        countries.clear(true);
      },
      callbackScope: game.scene,
      loop: false,
    });
  }
}