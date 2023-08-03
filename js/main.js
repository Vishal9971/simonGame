let buttonColours = ['red', 'blue', 'yellow', 'green'];

let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

$(document).keypress(function () {
  if (!started) {
    $('#level-title').text('Level  ' + level);
    nextSequence();
    started = true;
  }
});

function playSound(name) {
  let audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass('pressed');
  setTimeout(function () {
    $(`#${currentColour}`).removeClass('pressed');
  }, 100);
}

function wrongPressed() {
  $('.container').addClass('gameOver');
  setTimeout(function () {
    $('.container').removeClass('gameOver');
  }, 200);
}

function nextSequence() {
  userClickedPattern = [];
  $('#level-title').text('Level  ' + level);
  level++;

  var randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(`.same`).on('click', function (e) {
  let userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    let wrong = 'wrong';
    playSound(wrong);
    wrongPressed();
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}
