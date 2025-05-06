let buttonColor = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

$(document).ready(function () {
  $(document).on("keydown", function (event) {
    if (event.key.toLowerCase() === "a" && !gameStarted) {
      startGame();
    }
  });
});

$(document).ready(function () {
  $(".btn").on("click", function () {
    if (!gameStarted) return;

    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    animatedPress(userChosenColor);
    playSound(userChosenColor);
    
    checkAnswer(userClickedPattern.length - 1);
    
  });
});

function startGame() {
  gameStarted = true;
  level = 0;
  gamePattern = [];
  nextSequence();
}

function nextSequence() {
  userClickedPattern = [];

  level++;

  $("#level-title").text(`Level ${level}`);

  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColor = buttonColor[randomNumber];

  gamePattern.push(randomChosenColor);

  animatedButton(randomChosenColor);

  playSound(randomChosenColor);

  return randomChosenColor;
}

function checkAnswer(currentLevel) {
  //console.log("Checking index:", currentLevel);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
  
    }

  } else {
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 2000);

    $("#level-title").text("Game Over! Press A to Restart");
    gameOver();
  }
}

function animatedPress(color) {
  $(`#${color}`).addClass("pressed");

  setTimeout(() => {
    $(`#${color}`).removeClass("pressed");
  }, 100);
}

function animatedButton(color) {
  $(`#${color}`).fadeOut(100).fadeIn(100);
}

function gameOver() {
  gameStarted = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}

function playSound(color) {
  let audioPath = `./sounds/${color}.mp3`;
  let audio = new Audio(audioPath);

  audio.play();
}

/*
document.querySelectorAll('.btn').forEach((button)=>{

  button.addEventListener('click' , ()=>{

    button.classList.add('pressed')

    setTimeout( ()=>{
      button.classList.remove('pressed')
    } , 100)
  })
})
  */
