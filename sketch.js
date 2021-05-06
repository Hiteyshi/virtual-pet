var dog,sadDog,happyDog;
var foodStock=0;
var foodObj,feed,addfood;
var database 
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
  })
  

}

function draw() {
  background(46,139,87);
  foodObj.display();
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
