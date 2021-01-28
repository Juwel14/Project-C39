var playership, playershipimag
var tower, towerimage;
var stone, stoneimage;

var playershiphealth = 100;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var textVisible1 = 1;

function preload()
{
  towerimage = loadImage("tower.png");
  playershipimage = loadImage("playerShip.png");
  stoneimage = loadImage("stone.png");
}

function setup() 
{
  createCanvas(displayWidth, displayHeight-143);
  
  tower = createSprite(width-684, 0, displayWidth, displayHeight);
  tower.addImage(towerimage);
  tower.scale = 5;
  
  playership = createSprite(width-300, height - 200, 10, 10);
  playership.addImage(playershipimage);
  playership.scale = 1.3;

  stone = createSprite(-100, -100, 100, 100);
  
  playershiphealth = 100;
}

function draw() 
{
  background("spaceblue");
  
  if (gameState === PLAY)
  {
    playership.x = mouseX;
    //playership.y = mouseY;

    camera.position.x = playership.x;
    camera.position.y = displayHeight/2
    
    if(frameCount % 100 === 0)
    {
      stone = createSprite(random(0, 1350), 0, 100, 100);
      stone.addImage(stoneimage);
      stone.scale = 0.2;
      stone.velocityY = 3;
      stone.lifetime = 250;
    }

    if (stone.isTouching(playership))
    {
      playershiphealth = playershiphealth - 5;
    }

    if (playershiphealth === 0)
    {
      gameState = END;
    }
  }
  
  drawSprites();
  
  if (gameState === END)
  {
    playership.destroy();
    stone.destroy();

    stroke("black");
    fill("blue");
    textSize(150);
    text("GAME OVER" , 350, 360);
    
    textVisible1 = false;
  }
  
   if (textVisible1)
   {
     stroke("black");
     fill("green");
     textSize(40);
     text("Playership Health - "+ playershiphealth, 500, 105); 
   }
}