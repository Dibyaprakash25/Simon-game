
var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];

var userClickedPattern=[];

var started=false;
var level=0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("level"+level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function() {
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentlevel){
  if(gamePattern[currentlevel] === userClickedPattern[currentlevel]){
    console.log("Success");
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },800);

    $("#level-title").text("Game over,press any key to restart the game!");

    startOver();
  }
}

function nextSequence(){

  userClickedPattern=[];

  level++;
  $("#level-title").text("level "+level);

  var randomNumber=Math.floor(Math.random()*3);

  var randomChosenColor=buttonColours[randomNumber];

  gamePattern.push(randomChosenColor);


  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  },100);
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
