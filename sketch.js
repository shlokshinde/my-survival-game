var player, zombie, bullet, apple, bottle;
var playerIMG, zombieImg, backgroundIMG, bulletIMG, appleIMG, bottleIMG;
var score = 0;
var life = 200; 
var bloodIMG, sprite1;
var firingMP3, eatingMP3, drinkingMP3, attackMP3;

function preload(){
  zombieImg = loadImage("zombie.png");
  backgroundIMG = loadImage("background.jpg")
  playerIMG = loadImage("player.png");
  bulletIMG = loadImage("bullet.jpg");
  appleIMG = loadImage("apple.png")
  bottleIMG = loadImage("bottle.png")
  bloodIMG = loadImage("blood.jpg");
  firingMP3 = loadSound("firing.mp3");
  eatingMP3 = loadSound("eating.mp3");
  drinkingMP3 = loadSound("drinking.mp3")
  attackMP3 = loadSound("attack.mp3");
}

function setup(){
    createCanvas(displayWidth, windowHeight)
    player = createSprite(100,height/2,25,25);
    player.addImage(playerIMG);
    player.scale = 0.75;

    zombieGroup = createGroup();
    bulletGroup = createGroup();
    appleGroup = createGroup();
    bottleGroup = createGroup();
    bloodGroup = createGroup();
}

function draw(){
  background(backgroundIMG);
  recurringZombie();
  createApple();
  createBottle();
  bloodDrops();
  if (keyDown("up")) {
    player.y -= 25; 
  }
  if (keyDown("down")) {
    player.y  += 25;
  }
  if(keyDown("left")){
    player.x -= 25
  }
  if(keyDown("right")){
    player.x += 25
  }
  if (keyDown("space")) {
    createBullet();
    firingMP3.play();
  }
  
  if (bulletGroup.isTouching(zombieGroup)) {
    for(var i=0; i < zombieGroup.length; i++ ) {
      if(zombieGroup[i] && zombieGroup[i].isTouching(bullet)) {
        zombieGroup[i].destroy();
        bullet.destroy();
      }
    }
  }
  
  
  if (player.isTouching(bottleGroup)) {
    bottle.destroy();
    fill("red")
    textSize(50)
    text("BOTTLES COLLECTED", 200, height/2)
    drinkingMP3.play();
  }
  if (player.isTouching(appleGroup)) {
    apple.destroy();
    fill("red")
    textSize(50)
    text("APPLES COLLECTED", 300, height/2)
    eatingMP3.play()
  }
  if (sprite1 !== undefined) {
  if(player.isTouching(zombieGroup)){
    sprite1.destroy();
  }
  }  

  for(var i=1;i<=9;i++){ 
    if(player.isTouching(appleGroup) || player.isTouching(bottleGroup)){ 
      sprite1=createSprite(i*displayWidth/2-300,displayHeight/2-200,20,20); 
      sprite1.shapeColor="red"; 
      apple.destroy(); 
      bottle.destroy(); 
      //text("CREATED",100,100) 
    } 
  }
  console.log(frameCount);
  drawSprites();
}

function recurringZombie(){
  if(frameCount % 120 == 0){
    zombie = createSprite(displayWidth, Math.round(random(0,500)));
    console.log(zombie.y)
    zombie.addImage(zombieImg);
    zombie.scale = 0.25;
    zombie.velocityX = -15;
    zombieGroup.add(zombie);
    zombieGroup.setLifetimeEach(-1);
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

function createBullet(){
  bullet = createSprite(player.x+55, player.y-25,10,10);
  bullet.addImage(bulletIMG);
  bullet.scale = 0.25;
  bullet.velocityX = 50;
  bulletGroup.add(bullet);
  bulletGroup.setLifetimeEach(500);
}

function bloodDrops(){
  for(var i = 1; i <= 9; i++){
  blood = createSprite(i*50,20,20,20);
  blood.visible = true;
  blood.addImage(bloodIMG);
  blood.scale = 0.05;
  bloodGroup.add(blood);
  }
}
