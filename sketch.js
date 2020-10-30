var alien1,alien2,monster,monsteranimation, enemygroup;
var fruit1,fruit2,fruit3,fruit4,fruit, fruitgroup;
var sword,swordimage;
var gameover,gameoverimage;
var score;
var PLAY = 1;
var END = 0;
var gameState = 1;
var knifesound;
var gameoversound;
var Position;

function preload(){
   swordimage = loadImage("sword.png");
   gameoverimage = loadImage("gameover.png");
monsteranimation=loadAnimation("alien2.png","alien1.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  knifesound = loadSound("knifeSwooshSound.mp3");
  gameoversound = loadSound("gameover.mp3");
}
function setup() {
  //creating canvas;
  createCanvas(600, 600);
  
  //creating sword
   sword=createSprite(40,200,20,20);
   sword.addImage(swordimage);
   sword.scale=0.7
  
  //creating groups;
   fruitgroup = createGroup();
   enemygroup = createGroup();
   
  //giving score value = 0;
   score = 0
}
function draw(){ 
  //giving background;
  background("cyan");
  
  // displaying score;
  text("Score : "+ score,40,30);
  
  if(gameState === PLAY){
    fruits();
    enemy();
    
    sword.x = World.mouseX;
    sword.y = World.mouseY;
    
  }
//destroying the fruitgroup when it is touching the sword
  if(fruitgroup.isTouching(sword)){
     fruitgroup.destroyEach();
     //increasing the score by 3;
     score = score+3;
     knifesound.play();
  }
   else{
     if(enemygroup.isTouching(sword)){
       gameState = END;
//destroying fruitgroup when it's touching the sword; 
       fruitgroup.destroyEach();
       fruitgroup.setVelocityXEach(0);
//destroying enemygroup when it's touching the sword;     
       enemygroup.destroyEach();
       enemygroup.setVelocityEach(0);
//changing the image of sword when gameState === END;
       sword.addImage(gameoverimage);
       sword.x = 280;
       sword.y = 250;
       
       gameoversound.play();
     }
   }
    
  
// displaying all the sprites;
  drawSprites();
}

function fruits(){
//creating fruits when framecount % 40 === 0;
  if(frameCount%40 === 0){
  fruit = createSprite(400,200,20,20)
    fruit.scale = 0.18;
    
    Position = Math.round(random(1,2))
    
    if(Position  === 1){
      fruit.x = 0;
      fruit.velocityX = (5 + score / 4 );
    }else{
      fruit.x = 600;
      fruit.velocityX = -(5 + score / 4 );
    }
    
    r = Math.round(random(1,4));
    
    if( r == 1){
      fruit.addImage(fruit1);
    }else if (r == 2){
      fruit.addImage(fruit2);
    }else if (r == 3){
      fruit.addImage(fruit3)
    }else {
      fruit.addImage(fruit4);
    }
//giving y co-ordinate value to the fruits;
    fruit.y = Math.round(random(50,350));
//giving velocity and lifetime
    fruit.lifetime = 120;
//adding fruit to fruit group(fruitgroup.add(fruit));
    fruitgroup.add(fruit);
  }
}
function enemy(){
//creating alien animation when frameCount % 150 === 0;
  if(frameCount%150 === 0){
    monster = createSprite(600,200,20,20);
  monster.addAnimation("movingmonster",monsteranimation);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -(8 + score / 10);
    monster.lifetime = 75;
//adding enemy to monstergroup(monstergroup.add(enemy));    
    enemygroup.add(monster);
  }
}
