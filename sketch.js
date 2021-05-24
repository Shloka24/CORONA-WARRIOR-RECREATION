var runner, runnerImg;
var ground, groundImage;
var invisibleGround;
var corona, coronaImg;
var cloud, cloudImg;
var score = 0;
var virusGroup, cloudsGroup;
var PLAY = 1, END = 0;
var gameState = PLAY;
var gameOver ,gameOverImg, restart, restartImg;
var jumpSound, dieSound;


function preload(){
  
  groundImage = loadImage("ground2.png");
   runnerImg = loadImage("boy.png");
  coronaImg = loadImage("virus.png");
  cloudImg = loadImage("cloud.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  cityImg = loadImage("city.png");
  
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  bg = createSprite(width/2, height/2, 20, 20);
  bg.scale = 3;
  bg.addImage("city", cityImg);
  
  runner = createSprite(55, height-47, 30, 100);
  runner.scale = 0.05;
  runner.addImage("run", runnerImg);
  
  invisibleGround = createSprite(width/2, height-10,width*2,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(width/2, height/2, 20, 20);
  gameOver.addImage("over", gameOverImg);
  
  restart = createSprite(width/2, height/2 + 80, 20, 20);
  restart.addImage("replay", restartImg);
  restart.scale = 0.05;
   
  virusGroup = new Group();
  cloudsGroup = new Group(); 
  
  runner.setCollider("rectangle", 0, 0, 40, 3000);
}

function draw(){
  background("skyblue");
  
  camera.position.x = windowWidth/2;
  
  if(gameState === PLAY){
    
    gameOver.visible = false;
    restart.visible = false;
   
  
  bg.velocityX = -4;
    
    
  if(bg.x < 0){
    bg.x = bg.width/2;
  }
  
  runner.collide(invisibleGround);
  
  if(touches.length>0 || keyDown("space") && runner.y >=100){
    runner.velocityY = -18;
    jumpSound.play();
    touches = [];
  }
  
  runner.velocityY = runner.velocityY + 0.8;
    
    score = score + Math.round(getFrameRate()/60);
  
  createVirus();
  spawnClouds();
    
    if(virusGroup.isTouching(runner)){
      gameState = END;
      dieSound.play();
      
    }
  
  }
  
  else if(gameState === END){
    
    bg.velocityX = 0;
    runner.velocityY = 0;
    
     virusGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    virusGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
     gameOver.visible = true;
    restart.visible = true;
    
    
    
    
    
    if(touches.length>0 || mousePressedOver(restart)){
      reset();
      touches = [];
    }
    
     }
  
  drawSprites();
  
  fill("red");
  textSize(25);
  text("Score: " + score, width-150, height/2 - 250);
  

function createVirus(){
  
  if(frameCount % 60 === 0){
  corona = createSprite(camera.position.x + 800, Math.round(random(height-100, height-101)), 20, 20);
    corona.shapeColor = "green";
    corona.velocityX = -(6 + score/100);
    corona.lifetime = width/5;
    corona.addImage("virus", coronaImg);
    corona.scale = 0.7;
    virusGroup.add(corona);
    
    
  }
}

function spawnClouds(){
  
  if (frameCount % 100 === 0){
    cloud = createSprite( camera.position.x + 800,Math.round(random(height/6, height/2)), 40, 20);
    cloud.velocityX = -4;
    cloud.lifetime = width/5;
    cloud.addImage("cloud", cloudImg);
    cloud.scale = 0.2;
    cloudsGroup.add(cloud);
    
    cloud.depth = runner.depth;
    runner.depth = runner.depth +1;
    
  }
}
}

function reset(){
   gameOver.visible = false;
  restart.visible = false;
  
  
  gameState = PLAY;
  
  virusGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  score = 0;
}
