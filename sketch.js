var player, zombie, bullet;
var playerIMG, zombieImg, backgroundIMG, bulletIMG;

function preload(){
  zombieImg = loadImage("zombie.png");
  backgroundIMG = loadImage("background.jpg")
  playerIMG = loadImage("player.png");
  bulletIMG = loadImage("bullet.png");
}

function setup(){
    createCanvas(displayWidth, windowHeight)
    player = createSprite(100,height/2,25,25);
    player.addImage(playerIMG);
    player.scale = 0.75;

    zombieGroup = createGroup();
    bulletGroup = createGroup();
}

function draw(){
  background(backgroundIMG);
  recurringZombie();
  if (keyDown("up")) {
    player.y -= 15; 
  }
  if (keyDown("down")) {
    player.y  += 15;
  }
  if (keyDown("space")) {
    bullet = createSprite(player.x+55, player.y-25,10,10);
    bullet.addImage(bulletIMG);
    bullet.scale = 0.25;
    bullet.velocityX = 50;
    bulletGroup.add(bullet);
    if (bullet.x > displayWidth) {
    bullet.destroy();
  }
  }
  
  if (player.isTouching(zombieGroup)) {
    zombie.destroy();
    //bulletGroup.destroyEach();
    //zombieGroup.setLifetimeEach(-1);
    //bulletGroup.setLifetimeEach(0);
  }
  drawSprites();
}

function recurringZombie(){
  if(frameCount % 60 == 0){
    zombie = createSprite(displayWidth, Math.round(random(0,500)));
    console.log(zombie.y)
    zombie.addImage(zombieImg);
    zombie.scale = 0.25;
    zombie.velocityX = -2;
    zombieGroup.add(zombie);
    if(zombie.x > displayWidth){
      zombie.destroy();
    }
  }
}