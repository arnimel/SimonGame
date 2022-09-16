var level = 1; //variable to store the level
var arr1 = []; // array to store the sequence of game
var arr2 = []; // array to store the sequence of user

$(document).one("keypress click" , function(){
  $("h1").html("Level 1");
  $("h3").css("visibility", "hidden");
  controller(level);
} );

// Function for the random buttons for the user to follow
function game(level){
  var i = 1;
  var time = 500;
  if(level % 5 == 0){
    time -= 50;
  }
  var inter = setInterval(clear,time);
  function clear(){
    if(i<=level){
      i++;
      var a = Math.floor(Math.random()*4) + 1;
      animated(a);
      arr1.push(a);
    }
    else{
      clearInterval(inter);
    }
  }
}

//Function For animation
function animated(v){

  $(".b" + v).addClass("pressed");

  setTimeout(function (){
    $(".b"+ v).removeClass("pressed");
  },100);

  switch(v){
    case 1:
      var audio = new Audio("sounds/green.mp3");
      audio.play();
      break;
    case 2:
      var audio = new Audio("sounds/red.mp3");
      audio.play();
      break;
    case 3:
      var audio = new Audio("sounds/yellow.mp3");
      audio.play();
      break;
    case 4:
      var audio = new Audio("sounds/blue.mp3");
      audio.play();
      break;
  }
}

//Function to run the Game
function controller(level){
  game(level);
  var dif = 0;
  $("button").unbind("click");
  $("button").on("click" , function(){

    arr2.push(Number(this.id));
    dif = arr2.length - 1;
    if(arr1[dif] !== arr2[dif]){
      wrong();
    }
    else{
      animated(Number(this.id));
    }
    if(equals(arr1,arr2) == true ){
      right();
    }
    });

}

//Function for wrong
function wrong(){
  $("h1").html("Game Over");
  $("h3").css("visibility" , "visible");
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("over");
  setTimeout(function (){
    $("body").removeClass("over");
  },300);
  setTimeout(function(){
    $(document).one("keypress click" , function(){
      location.reload();
    });
  },100);
}

//Function for right
function right(){
  level++;
  var heading = "Level " + level;
  $("h1").html(heading);
  arr1.length = 0;
  arr2.length = 0;
  controller(level);
}

//Arrays Equal
function equals(a,b){
  if(a.length !== b.length) return false;
  for(var i = 0;i<a.length;i++){
    if(a[i] !== b[i]) return false;
  }
  return true;
}
