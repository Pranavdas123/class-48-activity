var bg,bg_img;
var balloon,balloon_img;
var low_ground,top_ground;
var obsbottom,obsbottom1,obsbottom2,obsbottom3;
var obstacleTop,obsTop1,obsTop2;
var gameOver,gameOver_img
var restart,restart_img
var score = 0
var obsTopGroup,obsBottomGroup

var PLAY = 1
var END = 0
var gameState = PLAY

function preload(){
  bg_img = loadImage("assets/bg.png");
  balloon_img = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png");
  obsTop1 = loadImage("assets/obsTop1.png");
  obsTop2 = loadImage("assets/obsTop2.png");
  obsbottom1 = loadImage("assets/obsBottom1.png");
  obsbottom2 = loadImage("assets/obsBottom2.png");
  obsbottom3 = loadImage("assets/obsBottom3.png");
  gameOver_img = loadImage("assets/gameOver.png");
  restart_img = loadImage("assets/restart.png");
}

function setup(){
  bg = createSprite(165,485,1,1);
  bg.addImage(bg_img);
  bg.scale = 1.5;

  low_ground = createSprite(170,600,1190,20);
  low_ground.visible = false;

  top_ground = createSprite(170,5,1190,20);
  top_ground.visible = false;

  balloon = createSprite(100,250,50,50);
  balloon.addAnimation("balloon",balloon_img);
  balloon.scale = 0.30

  gameOver = createSprite(500,200);
  gameOver.addImage(gameOver_img);
  gameOver.scale = 1.5
  gameOver.visible = false

  restart = createSprite(500,300);
  restart.addImage(restart_img);
  restart.scale = 1.5;
  restart.visible = false;

  replay = createSprite(500,300,100,100);
  replay.visible = false;

  obsBottomGroup = new Group();
  obsTopGroup = new Group(); 

}

function draw(){
   createCanvas(1000,600);

   if(gameState === PLAY){
      
      //flying the balloon
      if(keyDown("space")){
        balloon.velocityY = -6
      }

      //adding gravity 
      balloon.velocityY+= 0.5

      
      
      spawnAir()

      spawnGround()

  if(obsTopGroup.isTouching(balloon) || obsBottomGroup.isTouching(balloon) || balloon.isTouching(top_ground) || balloon.isTouching(low_ground)){
      gameState = END;
      text("PRESS ENTER TO PLAY AGAIN",50,50);
    }
   }
 
   if(gameState === END){
      gameOver.visible = true
      gameOver.depth+=1

      restart.visible = true
      restart.depth+=1

      balloon.velocityX = 0
      balloon.velocityY = 0

      obsBottomGroup.setVelocityXEach(0)
      obsTopGroup.setVelocityXEach(0)

      obsBottomGroup.setLifetimeEach(-1)
      obsTopGroup.setLifetimeEach(-1)

      balloon.y = 300

      
      if(keyDown("enter")){
        reset()
      }
       
      
   }
   drawSprites();
   Score();
}
function spawnAir(){
  if(World.frameCount%120 === 0){
    obstacleTop = createSprite(1000,200,50,50);
    obstacleTop.scale = 0.15;
    obstacleTop.velocityX = -2;
    obstacleTop.y = Math.round(random(50,200));

    var rand = Math.round(random(1,2));
    switch(rand){
      case 1 : obstacleTop.addImage(obsTop1)
                break;  
      case 2 : obstacleTop.addImage(obsTop2)  
                break;
      default:break;          
    }
    obstacleTop.lifetime = 1000
    balloon.depth +=1

     obsTopGroup.add(obstacleTop)
  }
}
                         
function spawnGround(){
  if(World.frameCount%150 === 0){
    obsbottom = createSprite(1000,500,50,50);
    obsbottom.scale = 0.10                                                                                                                                                                                                                                                                                                                                                                                                                ;
    obsbottom.velocityX = -2;
    
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1 : obsbottom.addImage(obsbottom1)
                break;  
      case 2 : obsbottom.addImage(obsbottom2)  
                break;
      case 3 : obsbottom.addImage(obsbottom3)
                break;            
      default:break;          
    }
    obsbottom.lifetime = 1000
    balloon.depth +=1

    obsBottomGroup.add(obsbottom)
  }
}

function reset(){
  gameState = PLAY;

  gameOver.visible = false;
  restart.visible = false;

  obsBottomGroup.destroyEach();
  obsTopGroup.destroyEach();

  score = 0;
}

 function Score(){
  if(World.frameCount%300 === 0){
  score = score+5
  }
  fill("blue")
  textSize(20)
  textFont("algerian")
  text("Score:"+ score,50,50);
 }
