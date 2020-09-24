var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
//set the level equal to zero for the first time that we play the game
var level = 0;

$(document).keypress(function(){
  // when the game begins the function nextsequence is called
  //inside the function nextsequence the level increases
  if(level === 0){
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});


//the click happens on the element `.btn`
$(".btn").click(function(){
  //this function is activated depending on the clicked button
  //the var will store the attr of the id clicked at that moment.
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  sound(userChosenColor);
  animatePress(userChosenColor);
  //call the function to check the chosen color
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  //check if the user chose the right color
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    //check if they have finished their sequence
    if (userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
    nextSequence();
    },1000);
  }
  }
  else {
    //play sound when the player plays wrong
    sound("wrong");
    //add a class when the player plays wrong
    $("body").addClass("game-over");
    $("#level-title").text("Game over, Press Any Key to restart");
    //remove the class after 200 miliseconds 
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)
    startOver();
  }
}

function nextSequence(){
  //create a random number to select a random color
  var randomNumber = Math.round(Math.random()*3);
  var randomChosenColor = buttonColor[randomNumber];
  //add the selected colors into an array
  gamePattern.push(randomChosenColor);
  //add animation to the selected colors
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  sound(randomChosenColor);
  //Here the game beggins, with level 1
  level ++;
  $("#level-title").text("Level " + level);
  //the array should be empty each time that we restart the game
  userClickedPattern = [];
}


function startOver(){
  level = 0;
  gamePattern = [];
}

function animatePress(currentColor){
   // This function will be called with the id formed by the concatenation of
   //# and userChosencolor selected by the click
    $("#" + currentColor).addClass("pressed");
    // The setTimeout defines the time interval to remove the class
    setTimeout(function (){
    $("#" + currentColor).removeClass("pressed");
  },100);
}

function sound(name){
  //general function that plays sound in function of the name
  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();
}
