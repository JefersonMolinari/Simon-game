let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let playerPresses = 0;
let isgameStarted = false;

// Start Game
$(document).keypress(function(){
    if(!isgameStarted){
        isgameStarted = true;
        nextSequence();
    }
});

// User Press
$(".btn").click(function(){
    if(isgameStarted){
        let userChoserColour = this.id;
        userClickedPattern.push(userChoserColour);
        checkAnswer(userClickedPattern.length-1);
        animatePress(userChoserColour);
        playSound(userChoserColour);
    }
});

// next level
function nextSequence(){
    userClickedPattern = [];

    $("#level-title").text("Level " + ++level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}


// Check wether is Game Over.
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(nextSequence,1000);
        }
    } else {
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        
        startOver();
    }
};

function startOver(){
    isgameStarted = false;
    level = 0
    gamePattern = [];
}