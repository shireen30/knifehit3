var wheel_img,knife_img,fruit1_img,monster_img,fruit2_img,fruit3_img;
var wheel,knife,fruit1,monster,fruit2,fruit3;

var startx=300,starty=300,angle=0,radius=150,increment=10;

var startx3=300,starty3=300,angle3=30,increment3=8;

var startx4=300,starty4=300,angle4=90,radius4=150,increment4=16;

var startx2=300,starty2=300,angle2=120,radius2=150,increment2=5;

var gameState="play";
var score=0;
var fruit_destroy1=0;
var gamesound;

var wheel_hit=0;
//var fruit_destroy2=0;
function preload() {

 
  wheel_img=loadImage("images/wheel.png");
  knife_img=loadImage("images/sword.png");
  fruit1_img=loadImage("images/apple.png");
  monster_img=loadImage("images/monster.png");
  fruit2_img=loadImage("images/fruit1.png");
  fruit3_img=loadImage("images/fruit3.png");
  gamesound=loadSound("sounds/wagon_wheel.mp3")
}

function setup() {

  createCanvas(700,700);
gamesound.play();

wheel=createSprite(300,300);
wheel.scale=1.3;
wheel.addImage(wheel_img);
wheel.rotation=270;
wheel.debug=false;
wheel.setCollider("circle",0,0,105);
  
knife=createSprite(300,650);
knife.addImage(knife_img);
knife.rotation=-45;
knife.debug=false;
knife.setCollider("rectangle",20,-30,50,70);

fruit1=createSprite(startx,starty);
fruit1.addImage(fruit1_img);
fruit1.scale=0.3;
fruit1.debug=false;

fruit2=createSprite(startx3,starty3);
fruit2.addImage(fruit2_img);
fruit2.scale=0.3;
fruit2.debug=false;

fruit3=createSprite(startx4,starty4);
fruit3.addImage(fruit3_img);
fruit3.scale=0.3;
fruit3.debug=false;

monster=createSprite(startx2,starty2);
monster.addImage(monster_img);
monster.scale=0.3;

 }

function draw() {
 background(rgb(38,0,73));

 textSize(20);
 text("SCORE: "+score,50,70);
 
   if(gameState==="play"){
   
    wheel.rotation=wheel.rotation+10;

    angle=angle+increment;
    fruit1.x=startx+radius*Math.cos(angle*Math.PI/180);
    fruit1.y=starty+radius*Math.sin(angle*Math.PI/180);
    fruit1.rotation=60-angle;

    angle3=angle3+increment3;
    fruit2.x=startx3+radius*Math.cos(angle3*Math.PI/180);
    fruit2.y=starty3+radius*Math.sin(angle3*Math.PI/180);
    fruit2.rotation=60-angle3;

    angle4=angle4+increment3;
    fruit3.x=startx4+radius*Math.cos(angle4*Math.PI/180);
    fruit3.y=starty4+radius*Math.sin(angle4*Math.PI/180);
    fruit3.rotation=60-angle4;

    angle2=angle2+increment2;
    monster.x=startx2+radius2*Math.cos(angle2*Math.PI/180);
    monster.y=starty2+radius2*Math.sin(angle2*Math.PI/180);
    monster.rotation=60-angle2;

    if(keyDown("up")){
      knife.velocityY=-10;
    }

     if(knife.isTouching(wheel)){
       knife.velocityY=0;
       wheel.rotation=0;
       fruit1.x=140;
       fruit1.y=300;
       fruit1.rotation=0;
       fruit2.x=300;
       fruit2.y=150;
       fruit2.rotation=0;
       fruit3.x=200;
       fruit3.y=200;
       fruit3.rotation=0;
       monster.x=startx2+150;
       monster.y=starty2;
       monster.rotation=0;
     knife.y=600;
     wheel_hit=wheel_hit+1;
     }
if(wheel_hit<3){
gameState="play";
}
else{
  gameState="end";
}

    if(knife.isTouching(fruit1) ){
       
       fruit1.destroy();
       score=score+10;
       fruit_destroy1=1;
    }

    if(knife.isTouching(fruit2) ){
      fruit2.destroy();
      score=score+10;
      fruit_destroy1=2;
   }

   if(knife.isTouching(fruit3)){
    fruit3.destroy();
    score=score+10;
    fruit_destroy1=3;
 }

   if(fruit_destroy1==1 || fruit_destroy1==2 || fruit_destroy1==3){
    knife.x=300;
    knife.y=650;
    knife.velocityY=0;
    text("Press r to release the knife",450,400);
  
   }
if(keyDown('r')){
  fruit_destroy1=0;
}
  

    if(keyDown("space") && knife.y<0){
       knife.y=650;
       knife.x=300;
       knife.velocityY=0;
    }

    if(knife.isTouching(monster)){
      gameState="end";
    }

  }  

  if(gameState==="end"){
    textSize(40);
    text("GAMEOVER!!!",200,100);
    knife.velocityY=0;
  }

 drawSprites();
}