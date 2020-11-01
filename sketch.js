
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var man, target;
var manImage, bg;
var edges;
var gameState = "levelOne";
var bulletGroup = [];
var target1, target2, target3, target4;
var t1Level3, t2Level3, t3Level3;
var t1Level4, t2Level4, t3Level4;
var target1Image, target2Image;
var targetCount = 0;
var bulletImage; 
var pineapple, bulletCount = 7;
var targetDestroy = 0;

function preload()
{
  target1Image = loadImage("fruits.png");
  target2Image = loadImage("fruits1.png");
  target3Image = loadImage("fruits2.png");

  t1Level3 = loadImage("fruits3.png");
  t2Level3 = loadImage("fruits4.jpg");
  t3Level3 = loadImage("fruits5.jpg");
  t1Level4 = loadImage("fruits6.jpg");
  t2Level4 = loadImage("fruits7.jpg");
  t3Level4 = loadImage("fruits8.png");

  manImage = loadImage("Player.png");
  bulletImage = loadImage("Bullet.png");
  pineapple = loadAnimation("Pineapple1/f1.gif", "Pineapple1/f2.gif", "Pineapple1/f3.gif", "Pineapple1/f4.gif", "Pineapple1/f5.gif");
  BackMusic = loadSound("BackMusic.mp3");
bg = loadImage("Bg5.jpg")
//  getBackground();
}

function setup() {
	createCanvas(displayWidth, displayHeight-150);	
  
  edges = createEdgeSprites();
   man = new Player(700, 648);
   man.body.addImage("player", manImage);
   man.body.scale = 0.2;
   //level1
   target = new Target(699, 236);
   target.body.addAnimation("pineapple", pineapple);
   target.body.scale = 0.4;
   target.body.velocityX = 2;
  // BackMusic.play();
}


function draw() {
  rectMode(CENTER);
  if (bg)
  background(bg);

if(gameState != "End") {
  man.body.x = mouseX;
}

target.body.bounceOff(edges);
// if(gameState === "levelOne") {
//   textSize(30);
//   text("You Are Playing LEVEL 1", displayWidth/2-50, 100);
// }else if(gameState === "levelTwo") {
//   textSize(30);
//   text("You Are Playing LEVEL 1", displayWidth/2-50, 100);
// }
fill("red");
textFont('Georgia');
stroke("blue");
strokeWeight(5);
switch(gameState) {
  case "levelOne" :  textSize(30);
  text("You Are Playing LEVEL 1", displayWidth/2-150, 100);
  break;
  case "levelTwo" :  textSize(30);
  text("You Are Playing LEVEL 2", displayWidth/2-150, 100);
  break;
  case "levelThree" :  textSize(30);
  text("You Are Playing LEVEL 3 ", displayWidth/2-150, 100);
  break;
}

textSize(30);
text("Bullets left : " + bulletCount, 1200, 100);

text("You have total 7 targets", 1200, 150);
text("Targets Destroyed : " + targetDestroy, 1200, 200);

text(mouseX+" "+mouseY, 100, 100);
if(keyDown("space") && bulletGroup.length === 0 && bulletCount>0)  {
  shootBullet();
  bulletCount = bulletCount - 1;
}

if(bulletCount === 0 && targetDestroy<7) {
  textSize(50);
  text("You LOST the Game !!", displayWidth/2 - 50, displayHeight/2);
}

if(targetDestroy===7) {
  textSize(50);
  text("You WON !!", displayWidth/2 - 50, displayHeight/2);
}

//level 1 destroying target and calling level 2
 for(var i = 0; i < bulletGroup.length; i++) {

 
if(bulletGroup[i].isTouching(target.body)) {
  target.body.destroy();
  targetDestroy = targetDestroy + 1;
  gameState = "levelTwo";
  status="create"
 
} 
 }

 //destroying bullets
 for(var i = 0; i < bulletGroup.length; i++) {
  if(bulletGroup[i].y<0 ) {
   // bulletGroup[i].destroy();
    bulletGroup.pop(bulletGroup[i])
   // bulletGroup=[]
  }
}

 
 if(gameState==="levelTwo") {
  
  levelTwo();
target1.body.bounceOff(edges);
  target2.body.bounceOff(edges);
 
 }

 if(gameState==="levelThree") {
   levelThree();
   target1.body.bounceOff(edges);
  target2.body.bounceOff(edges);
  target3.body.bounceOff(edges);
 }

 if(gameState==="levelFour") {
  levelFour();
  target1.body.bounceOff(edges);
 target2.body.bounceOff(edges);
}

  drawSprites();
 
}

function shootBullet() {
 var bullet = createSprite(500, 700, 20, 50);
 bullet.addImage("bullet", bulletImage);
 bullet.scale = 0.02;
  bullet.x = man.body.x;
  bullet.velocityY = -35;
bullet.lifetime = 500;

bulletGroup.push(bullet);
}

function levelTwo() {
  if(status==="create"){
    target1 = new Target(370, 167, 15, 50);
    target1.body.addImage("target1", target1Image);

    target1.body.velocityX = -3;
     target2 = new Target(1028, 167, 15, 50);
     target2.body.addImage("target2", target2Image);
    target2.body.velocityX = 3;
    status=" ";
  }
   

   //level 2 destroying target and calling level 3
 for(var i = 0; i < bulletGroup.length; i++) {

 console.log(target1.body)
 //console.log(bulletGroup[0].isTouching(target1.body))
  if(bulletGroup[i].isTouching(target1.body)) {
    target1.body.destroy();
       targetCount = targetCount + 1;
       targetDestroy = targetDestroy + 1;
  } 
  if(bulletGroup[i].isTouching(target2.body)) {
    target2.body.destroy();
   
       targetCount = targetCount + 1;
       targetDestroy = targetDestroy + 1;
  } 
  if(targetCount>= 2) {
    levelThree();
    targetCount = 0;
    gameState = "levelThree";
    status="create";
targetCount=0
  }
   }

}

function levelThree() {
 if(status==="create"){
   
 
    target1 = new Target(270, 167, 15, 50);
    target1.body.addImage("t1", t1Level3);
    target1.body.velocityX = -6;
    target1.body.shapeColor="red";
     target2 = new Target(950, 167, 15, 50);
     target2.body.addImage("t2", t2Level3);
    target2.body.velocityX = 6;
    target2.body.shapeColor="red";
    target3 = new Target(330, 167, 15, 50);
    target3.body.velocityX = -8;
    target3.body.addImage("t3", t3Level3);
    target3.body.shapeColor="red";
    console.log(target3.body);
    status=false;
  }

   for(var i = 0; i < bulletGroup.length; i++) {

    // console.log(bulletGroup)
     //console.log(bulletGroup[0].isTouching(target1.body))
     if(bulletGroup[i].isTouching(target1.body)) {
       target1.body.destroy();
         targetCount = targetCount + 1;
         targetDestroy = targetDestroy + 1;
     } else 
     if(bulletGroup[i].isTouching(target2.body)) {
       target2.body.destroy();
      
          targetCount = targetCount + 1;
          targetDestroy = targetDestroy + 1;
      }
      // else if(bulletGroup[i].isTouching(target3.body)) {
    //   target3.body.destroy();
     
    //      targetCount = targetCount + 1;
    //      targetDestroy = targetDestroy + 1;
    // } 
     
     if(targetCount>= 3) {
       gameState="levelFour"
       targetCount = 0;
       
       status="create";
       
     }
     }

}

function levelFour(){
  if(status==="create"){
   
 
    target1 = new Target(170, 167, 15, 50);
  target1.body.addImage("T1", t1Level4);
   target1.body.velocityX = -3;
    target1.body.shapeColor="blue"
     target2 = new Target(1200, 167, 15, 50);
     target2.body.addImage("T2", t2Level4);
    target2.body.velocityX = 3;
    target2.body.shapeColor="blue";
    target4 = new Target(20, 379, 50, 20);
    target4.body.addImage("T4", t3Level4);
    target4.body.velocityX = -6;
    status=false;
    
  }

  for(var i = 0; i < bulletGroup.length; i++) {

    console.log(bulletGroup)
    console.log(bulletGroup[0].isTouching(target1.body))
    if(bulletGroup[i].isTouching(target1.body)) {
      target1.body.destroy();
        targetCount = targetCount + 1;
        targetDestroy = targetDestroy + 1;
    } 
    if(bulletGroup[i].isTouching(target2.body)) {
      target2.body.destroy();
     
         targetCount = targetCount + 1;
         targetDestroy = targetDestroy + 1;
    } 
   //  if(bulletGroup[i].isTouching(target3.body)) {
   //   target3.body.destroy();
    
   //      targetCount = targetCount + 1;
   // } 
    if(targetCount>= 2) {
      gameState="End";
      targetCount = 0;
      
      //status="create"
      
    }
    }


}

async function getBackground() {
  var response = await fetch ("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var JsonResponse = await response.json();
  var dateTime = JsonResponse.datetime;
  var hour = dateTime.slice(11, 13);
  console.log(hour);
  if(hour>=00 && hour <=6) {
    bg = loadImage("Bg5.jpg")
  }else if(hour>6 && hour<=12) {
    bg = loadImage("bg2.jpg");
  }else if(hour>12 && hour <= 18){
    bg = loadImage("bg1.jpg");
  }else if(hour>18 && hour<=23) {
    bg = loadImage("bg3.jpg")
  }
}




