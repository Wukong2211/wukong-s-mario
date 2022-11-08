var background,backgroundImg;
var ground;
var mario,mario_Running,mario_Stationary;
var lion;
var pillar;
var camera;
var gameState="wait";
var startImg;
var enemyGroup,enemy1,enemy2;
var pillarGroup;
var coin;
var redPotion;
var red;
var gameOver;
var start;
var score;
var restart;


function preload (){

    mario_Running=loadAnimation("mario1.png","mario2.png");
    backgroundImg= loadImage("background2.png");
    startImg=loadImage("start.png");
      
    gameOverImg=loadImage("game_over.png");
    mario_stationary=loadImage("mario3.png");
    startImg= loadImage("start.png");
    coinImg=loadImage("coin.png");
    potion=loadImage("redPotion.png");
    restartImg=loadImage("reset.png");

    enemy1=loadImage("lion.png");
    enemy2=loadImage("tortoise.png");

    pillarImg=loadImage("pillar.png")
    
}

function setup(){
   
    createCanvas(1500,700);
   
    ground = createSprite(100,561,15000,20);
    ground.x=ground.width/2;
    ground.visible=false;

    mario=createSprite(100,561,20,30);
    mario.addAnimation(" mario_Running",mario_Running)
    mario.scale=0.3;
    mario.setCollider("rectangle",0,0,mario.width,mario.height);
    mario.debug = false;
    mario.velocityX=0;

    gameOver=createSprite(700,350,40,80)
    gameOver.addImage(gameOverImg)
    gameOver.scale=1.5
    gameOver.visible=false;

    start=createSprite(700,150,40,80)
    start.addImage(startImg);
    start.scale=1
    start.visible=false;

    restart=createSprite(700,600,40,80);
    restart.addImage(restartImg);
    restart.scale=0.2;
    restart.visible=false;

    score=0
  
     enemyGroup=createGroup();
     potionsGroup=createGroup();
     pillarGroup=createGroup();
     coinGroup=createGroup();

}

function draw(){

  console.log(enemyGroup.velocityX)

 if (gameState==="wait"){
  
  start.visible=true;
  enemyGroup.visible=true;
  mario.visible=true;
  gameOver.visible=false;
  backgroundImg.visible=true;
  restart.visible=false;
  
 }

    background(backgroundImg);
         
    console.log(gameState)      
          
  if(gameState==="wait" && keyDown("SPACE")) {
     
      gameState="play";
  }

  if(gameState==="play"){

    if(score>5){
      enemyGroup.velocityX = -14;
      pillarGroup.velocityX=-14;
      coinGroupvelocityX=-14;
      potionsGroup.velocityX=-14
    }

    enemyGroup.velocityX = -(4 + 3* score/10)
    pillarGroup.velocityX = -(4 + 3* score/10)
    potionsGroup.velocityX = -(4 + 3* score/10)
    coinGroup.velocityX = -(4 + 3* score/10)

    if(mario.collide(ground) || mario.collide(pillarGroup)) {
      if(keyDown("space")) {
        mario.velocityY = -20;
                        
     }
    } 

    
    
// adding camera
    mario.x=camera.position.x-270;

    textFont("algerian");
    fill("red");
    textSize(190)
    text("score:"+ score ,350,200)

      start.visible=false;
      ground.velocityX=-4;
    if (ground.x < 1500){
        ground.x = ground.width/2;
      } 
      
       mario.velocityY = mario.velocityY + 0.8
    
    if(keyDown("RIGHT_ARROW")) {
        mario.velocityX = +8;
      
    }

    if(keyDown("LEFT_ARROW")){
        mario.velocityX=-8;
        
    }

    
    mario.collide(pillarGroup);

    if(coinGroup.isTouching(mario)){
      for (var i=0;i<coinGroup.length; i++){
        if(coinGroup[i].isTouching(mario)){
          coinGroup[i].destroy()
        }
      }
      score=score+5;
  }

  if(potionsGroup.isTouching(mario)){
      for (var i=0;i<potionsGroup.length; i++){
        if(potionsGroup[i].isTouching(mario)){
          potionsGroup[i].destroy();
        }
      }
      mario.scale=mario.scale+0.3;
  }

  if(enemyGroup.isTouching(mario)&& mario.scale>0.3){
    for (var i=0;i<enemyGroup.length; i++){
      if(enemyGroup[i].isTouching(mario)){
        enemyGroup[i].destroy();
      }
    }
 mario.scale=mario.scale-0.3;   
}

  
   
    if(enemyGroup.isTouching(mario)){
      gameState="end"
    }
    
    //mario.collide(enemyGroup);
    //mario.collide(pillarGroup)
    //mario.collide(coinGroup);
    //mario.collide(potionsGroup);
    
    spawnEnemy();
    spawnPillar();
    spawnCoin();
    spawnPotion();
}

if(gameState==="end"){
  enemyGroup.setLifetimeEach(-1);
  potionsGroup.setLifetimeEach(-1);
  pillarGroup.setLifetimeEach(-1);
  coinGroup.setLifetimeEach(-1);
   
   enemyGroup.setVelocityXEach(0);
   pillarGroup.setVelocityXEach(0); 
   potionsGroup.setVelocityXEach(0);   
   coinGroup.setVelocityXEach(0);  

   ground.velocityX = 0;
   mario.velocityY = 0
  mario.velocityX=0;

  gameOver.visible=true;
  restart.visible=true;

 

       if(mousePressedOver(restart)){
        reset()
       }

   
}
    
  
  mario.collide(ground);

  /*if (gameState==="play" && score=0+5){
    if(keyDown("LEFT_ARROW")){
      mario.velocityX=-12;
    }
    if(keyDown("RIGHT_ARROW")) {
      mario.velocityX = +12;

  }
}*/
   
       
  drawSprites()  
}

function spawnEnemy(){
   if (frameCount % 300 === 0){
       var enemy = createSprite(1600,490 ,10,40);
       enemy.velocityX = -10;
       enemy.scale=0.5;

      var rand=Math.round(random(1,2))
      switch(rand){

      case 1:enemy.addImage(enemy1);
       
      enemy.setCollider("rectangle",0,0,enemy.width,enemy.height+15)
      enemy.debug=false;
        
      break;

      case 2:enemy.addImage(enemy2);
      enemy.setCollider("rectangle",0,0,enemy.width,enemy.height+15)
      enemy.debug=false;
      break;

      default: break;
  }

    enemy.lifeTime=400;
   
    enemyGroup.add(enemy);
  }
}

function spawnPillar(){
  if (frameCount % 400 === 0){
    var pillar = createSprite(2000,440 ,10,40);
    pillar.addImage(pillarImg)
    pillar.velocityX = -8;
    pillar.scale=0.3
    pillar.setCollider("rectangle",0,0,pillar.width-800,pillar.height);
    pillar.debug = false;

    pillar.lifeTime=400

    pillarGroup.add(pillar);
  }
}

function spawnCoin(){
  if(frameCount % 100===0){
   
    var rand=Math.round(random(1,2))
    switch(rand){

    case 1:var coin=createSprite(2000,500,10,30)
    coin.addImage(coinImg);
    coin.velocityX=-8;
    coin.scale=0.2
    coin.setCollider("rectangle",0,0,coin.width-150,coin.height-150)
    coin.debug=false;
    
    break;

    case 2:var coin=createSprite(2000,300,10,30)
    coin.addImage(coinImg);
    coin.velocityX=-8;
    coin.scale=0.2
    coin.setCollider("rectangle",0,0,coin.width-150,coin.height-150)
    coin.debug=false;
    break;

    default :break;
  }

    coin.lifeTime=400
    coinGroup.add(coin)
  }
}

 function spawnPotion(){
 if( frameCount % 600===0){
    

     var rand=Math.round(random(1,2))
     switch(rand){

     case 1:var redPotion=createSprite(2100,500,10,30)
     redPotion.addImage(potion);
     redPotion.scale=0.1;
     redPotion.velocityX=-8;
     redPotion.visible=false
     redPotion.setCollider("rectangle",0,0,redPotion.width-150,redPotion.height-150)
     redPotion.debug=mario;

     break;

     case 2:var redPotion=createSprite(2100,300,10,30)
     redPotion.addImage(potion);
     redPotion.scale=0.1;
     redPotion.velocityX=-8;
     redPotion.visible=true
     redPotion.setCollider("rectangle",0,0,redPotion.width-150,redPotion.height-150)
    redPotion.debug=false;

     break;

     default:break;

    }

    redPotion.lifeTime=400;
    potionsGroup.add(redPotion);
  }
}

function reset(){
  score=0;
  gameState="wait"

  if(enemyGroup.isTouching(mario)){
    for (var i=0;i<enemyGroup.length; i++){
      if(enemyGroup[i].isTouching(mario)){
        enemyGroup[i].destroy();
      }
    }
  }

  
    for (var i=0;i<coinGroup.length; i++){
      if(coinGroup[i]){
        coinGroup[i].destroy()
      }
    }
  }









    









    

    




  

                  
