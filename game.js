var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start= false;

// starting funcytion for heading
$(document).keydown(function(){
    if(!start){
        // abhi game start nhi h or jaise hi keypress hui or start false mila toh next sequence call hogaa or level bdega
        $("#level-title").text("Level " + level);
       nextSequence();
      start = true;
    }
})


function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
console.log(randomChosenColour);
  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  
   
}
// click event to any button

$(".btn").click(function(){
    // for taking id
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

// music funciton
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// animation function for userclick
function animatePress(currentColor){
$("#" + currentColor).addClass("pressed");
setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
 }, 200);
}



var i =0;
function checkAnswer(currentLevel){
   if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    console.log("succes");

    if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

   }
   else{

    var waudio = new Audio("sounds/wrong.mp3" );
    waudio.play();
    $("h1").text("Game-Over, Press A Key to Start");

    $("body").addClass("game-over");
    
    setTimeout(function(){
        $("body").removeClass("game-over");
    },300);

     startOver();
   }
}
 
function startOver(){
    gamePattern = [];
    level =0;
    start = false;
}
   