var bat, batImage;
var stalactite, stalactiteImage;
var stalagmite, stalagmiteImage;
var firefly, flreflyImage;
var cave, caveImage;

var batPlayer = [bat];

var score = 0, HS = 0;
var gameState = "play"

function preload(){
  batImage = loadImage("Bat.png");
  stalactiteImage = loadImage("Stalactite.png");
  stalagmiteImage = loadImage("Stalagmite.png");
  fireflyImage = loadImage("Firefly.png");
  caveImage = loadImage("Cave_Background.jpg");
}

function setup() {
 createCanvas(600,500);
  
  cave = createSprite(300,250,600,500);
  cave.addImage(caveImage);

  bat = createSprite(30,250,30,20);
  bat.addImage(batImage);
  bat.scale = 0.25;
  
  bat.setCollider("circle",0,0,60)
  //bat.debug = true;
  
  obstacleGroup = new Group();
  bugsGroup = new Group();
}
  

function draw() {
 background(0);
  
  var index = 0;
  
  var x =0;
  var y;
  
  camera.position.x = displayWidth/5;
  camera.position.y = bat.y;
  
  if(gameState === "play"){
    if(bat.isTouching(bugsGroup)){
      bugsGroup.destroyEach();
      score = score + 1;
      }
    obstacles();
    batControl();
      if(obstacleGroup.isTouching(bat) || score === 15){
        gameState = "end";
      }
  }
  if(gameState === "end"){
    reset();
    if(HS<score){
      HS = score;
    }
  }
  
  drawSprites();
  text("Score: " + score, 500,20);
  text("High Score: " + HS, 40,20);
  if(HS ===0 && score < 3){
    stroke(6);
    textSize(20);
    text("Use the arrow keys to move",200, 20)
    fill("Red");
    text("Avoid rocks", 250,60);
    fill("Green");
    text("Collect the fireflies", 230, 40);
  }
  if(score >= 3 && score < 8 && HS === 0){
    fill("Yellow");
    textSize(30);
    text("Good Luck!",250,40);
  }
  if(gameState === "end"){
    fill("Orange");
    text("Press 'R' to restart",260,280);
    stroke(10);
    textSize(25);
    text("Game Over",250,250);
  }
}

function reset(){
  obstacleGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  
  bugsGroup.setVelocityXEach(0);
  bugsGroup.setLifetimeEach(-1);
  
  if(keyDown("r")){
    gameState = "play";
    score = 0;
    obstacleGroup.destroyEach();
    bugsGroup.destroyEach();
    bat.x = 30;
    bat.y = 250;
  }
}

function batControl(){
  if(bat.x < 200 || bat.x > 20){
    if(keyDown(DOWN_ARROW)){
      bat.y = bat.y + 5;
    }
    if(keyDown(UP_ARROW)){
      bat.y = bat.y - 5;
    }
    if(keyDown(LEFT_ARROW)){
      bat.x = bat.x - 5;
    }
    if(keyDown(RIGHT_ARROW)){
      bat.x = bat.x + 5;
    }
  }
    if(bat.x >= 200){
      bat.x = 199;
  }
    if(bat.x <= 20){
      bat.x =19;
    }
} 

function obstacles(){
  if(frameCount % (200 - score) === 0 ){
    stalactite = createSprite(600,0);
    stalactite.addImage(stalactiteImage);
    stalactite.x = Math.round(random(600,700));
    stalactite.y = Math.round(random(-30,0));
    stalactite.velocityX = -(6 + score / 7);
    stalactite.lifetume = 170;
    
    stalagmite = createSprite(600,600);
    stalagmite.addImage(stalagmiteImage);
    stalagmite.x = Math.round(random(600,700));
    stalagmite.y = Math.round(random(600,630));
    stalagmite.velocityX = -(6 + score / 7);
    stalagmite.lifetume = 170;
    
    obstacleGroup.add(stalactite);
    obstacleGroup.add(stalagmite);
    
    stalactite.setCollider("rectangle",0,60,55,380);
    stalagmite.setCollider("rectangle",0,-60,55,380);
     //stalactite.debug = true;
     //stalagmite.debug = true;
  }
  if(frameCount % (75 - score / 2) === 0){
    firefly = createSprite(600,250,10,10);
    firefly.addImage(fireflyImage);
    firefly.scale = 0.1;
    firefly.y = Math.round(random(150,350));
    firefly.velocityX = -(6 + score/7);
    firefly.lifetime = 170;
    
    bugsGroup.add(firefly);
  }
}