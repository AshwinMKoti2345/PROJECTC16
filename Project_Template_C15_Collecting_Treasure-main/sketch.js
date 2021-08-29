//naming the variables
var path;
var boy;
var cash;
var diamonds; 
var sword;
var jwell;
var pathImg;
var boyImg;
var cashImg;
var diamondsImg;
var Img;
var swordImg;
var treasureCollection = 0;
var cashG;
var diamondsG;
var G; 
var swordGroup;
var score=0;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  Img = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;

cashG=new Group();
diamondsG=new Group();
G=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    create();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
      score=score+1;
    }

    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+50;
      score=score+1;
    }

    else if(G.isTouching(boy)) {
      G.destroyEach();
      treasureCollection=treasureCollection+50;  
      score=score+1;    
    }

    else{
      if(swordGroup.isTouching(boy)) {
        treasureCollection=treasureCollection-50;
        score=score-1;
       gameState=END;
      }
  }
  
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  }

  if(gameState===END){
    boy.addAnimation("SahilRunning",endImg);
    boy.x=200;
    boy.y=300;

    cashG.destroyEach();
    cashG.setVelocityYEach(0);

    G.destroyEach();
    G.setVelocityYEach(0);

    diamondsG.destroyEach();
    diamondsG.setVelocityYEach(0);

    swordGroup.destroyEach();
    swordGroup.setVelocityYEach(0);

    path.velocityY=0;

    endImg.changeScale=1;
  }

  drawSprites();
 
  textSize(20);
  fill(255);
  text("Score: "+ score,150,150);
}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
 }
}

function create() {
  if (World.frameCount % 410 == 0) {
  var  jwell= createSprite(Math.round(random(50, 350),40, 10, 10));
  jwell.addImage(Img);
  jwell.scale=0.13;
  jwell.velocityY = 3;
  jwell.lifetime = 150;
  G.add(jwell);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}