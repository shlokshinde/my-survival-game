var player, zombie, bullet, apple, bottle;
var playerIMG, zombieImg, backgroundIMG, bulletIMG, appleIMG, bottleIMG;
var score = 0;
var life = 200; 

function preload(){
  zombieImg = loadImage("zombie.png");
  backgroundIMG = loadImage("background.jpg")
  playerIMG = loadImage("player.png");
  bulletIMG = loadImage("bullet.png");
  appleIMG = loadImage("apple.png")
  bottleIMG = loadImage("bottle.png")
}

function setup(){
    createCanvas(displayWidth, windowHeight)
    player = createSprite(100,height/2,25,25);
    player.addImage(playerIMG);
    player.scale = 0.75;

    zombieGroup = createGroup();
    //bulletGroup = createGroup();
    appleGroup = createGroup();
    bottleGroup = createGroup();
}

function draw(){
  background(backgroundIMG);
  recurringZombie();
  createApple();
  createBottle();
  if (keyDown("up")) {
    player.y -= 15; 
  }
  if (keyDown("down")) {
    player.y  += 15;
  }
  if(keyDown("left")){
    player.x -= 15
  }
  if(keyDown("right")){
    player.x += 15
  }
  if (keyDown("space")) {
    bullet = createSprite(player.x+55, player.y-25,10,10);
    bullet.addImage(bulletIMG);
    bullet.scale = 0.25;
    bullet.velocityX = 50;
    //bulletGroup.add(bullet);

    if (bullet.x > displayWidth)
     {
    bullet.destroy();
  }
  
  if (bullet.isTouching(zombieGroup)) {
    zombie.destroy();
    //bulletGroup.destroyEach();
    //zombieGroup.setLifetimeEach(-1);
    //bulletGroup.setLifetimeEach(0);
  }
}
  
  
  if (player.isTouching(bottleGroup)) {
    bottle.destroy();
    fill("red")
    textSize(50)
    text("BOTTLES COLLECTED", 200, height/2)
  }
  if (player.isTouching(appleGroup)) {
    apple.destroy();
    fill("red")
    textSize(50)
    text("APPLES COLLECTED", 300, height/2)
  }
  drawSprites();
}

function recurringZombie(){
  if(frameCount % 120 == 0){
    zombie = createSprite(displayWidth, Math.round(random(0,500)));
    console.log(zombie.y)
    zombie.addImage(zombieImg);
    zombie.scale = 0.25;
    zombie.velocityX = -7;
    zombieGroup.add(zombie);
    if(zombie.x < 0)
    {
      zombie.destroy();
    }
  }
}

function createApple(){
  if (frameCount % 240 == 0) {
    apple = createSprite(random(25, displayWidth-25),random(25, height-25), 10, 10)
    apple.addImage(appleIMG);
    apple.scale = 0.25;
    appleGroup.add(apple);
    appleGroup.setLifetimeEach(200)
  }
}

function createBottle(){
  if (frameCount % 240 == 0) {
    bottle = createSprite(random(25, displayWidth-25),random(25, height-25), 10, 10)
    bottle.addImage(bottleIMG);
    bottle.scale = 0.25;
    bottle.lifetime = 200;
    bottleGroup.add(bottle);
  }
}