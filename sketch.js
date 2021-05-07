var dog,sadDog,happyDog;
var foodStock=0;
var foodObj,feed,addfood;
var database ,feedtime
function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
 database=firebase.database();
  createCanvas(1000,400);
  foodObj=new Food();
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  database.ref('food').on("value",function(data){
    foodStock=data.val();
    foodObj.updateFoodStock(foodStock);
  })
  

}

function draw() {
  background(46,139,87);
  foodObj.display();
  database.ref('feedtime').on("value",function(data){
    feedtime=data.val();
    foodObj.updateFoodStock(feeedtime);
  })
  textSize(15);
  fill("white");
  if(feedtime>=12){
    text("Last Feed : "+ feedtime%12 + " PM", 350,30);
  }else if(feedtime===0){
    text("Last Feed : 12 AM",350,30);
  }else{
     text("Last Feed : "+ feedtime + " AM", 350,30);
     }
  drawSprites();
  
}

//function to read food Stock
function feedDog(){
  dog.addImage(happyDog);

  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
   }else{
     foodObj.updateFoodStock(foodObj.getFoodStock()-1);
     }

//function to update food stock and last fed time


  database.ref('/').update({
food:foodObj.getFoodStock(),
feedtime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodStock=foodStock+1;
  database.ref('/').update({
    food:foodStock
  })

}
