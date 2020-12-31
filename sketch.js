const Constraint = Matter.Constraint;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var ball, sling;
var basket1, basket2, basket3, basket4, basket5;

var bg;

var score = 0;
var flag = false;
var level = 1;

function preload(){
  bg = loadImage("images/background.jpg");
}

function setup() {
  createCanvas(displayWidth-20, displayHeight-150);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  ball = new Ball(200, 150, 30); 
  sling = new SlingShot(ball.body,{x : 200, y : 150});
  basket1 = new Basket(displayWidth-700, 20, 30);
  basket2 = new Basket(displayWidth-100, 20, 30);
  basket3 = new Basket(displayWidth-400, 20, 30);
  basket4 = new Basket(displayWidth-200, 20, 30);
  basket5 = new Basket(displayWidth-600, 20, 30);
}

function draw() {
  background(bg);  
  textSize(35);
  fill("white");
  text("Score: " + score, displayWidth-200, 50);
  ball.display();
  sling.display();
  if(score<50){
    level = 1;
  }else if(score>=50 && score<100){
    level = 2;
  }

  if(level === 1){
  basket1.display(2);
  basket2.display(6);
  basket3.display(4);
  basket4.display(7);
  basket5.display(8);

  detectCollision(ball, basket1, 3);
  detectCollision(ball, basket2, 7);
  detectCollision(ball, basket3, 5);
  detectCollision(ball, basket4, 9);
  detectCollision(ball, basket5, 10);
}else if(level === 2){
  
}


  //console.log(ball.body.position.x + " "+ball.body.position.y);

}

function keyPressed(){
  if(keyCode === 32){
    Matter.Body.setPosition(ball.body, {
      x : 200,
      y : 150
    })
    sling.attach(ball.body);
  }

}

function mouseDragged(){
  Matter.Body.setPosition(ball.body, {x: mouseX , y: mouseY});
}




function mouseReleased(){

  flag = true;

  sling.fly();
  
}

function detectCollision(lball, lbasket, points){
  ballPosition = lball.body.position;
  basketPosition = lbasket.body.position;
  var distance = dist(ballPosition.x, ballPosition.y, basketPosition.x, basketPosition.y);
  if(distance <= lbasket.r+ lball.r && flag){
    console.log("collisionDetected");
    score = score+points;
    flag = false;
  }
}