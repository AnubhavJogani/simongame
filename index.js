var gamePattern = [];

var userClickedPatter = [];

var buttonColour = ["red", "blue", "green", "yellow"];

var flag = 1;

var level = 0;

$(document).keypress(function() {
  if(flag) {
    nextSequence();
    flag = 0;
      }
});



function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColour[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("#level-title").text("Level " + level);
  level++;

}


$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPatter.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPatter.length-1)
});


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}


function checkAnswer(i) {
    if(userClickedPatter[i] == gamePattern[i]) {
      console.log("true");
    }
    else {
      console.log("false");
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");},200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      flag = 1;
      gamePattern = [];
      userClickedPatter =[];
      level = 0;
    }
  if(gamePattern.length == i+1){
    userClickedPatter = [];
    setTimeout(nextSequence,1000);
  }
}
