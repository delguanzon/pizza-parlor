//Business Logic for Pizza()
function Pizza(toppings,size) {
  this.toppings = toppings;
  this.size = size;
}

Pizza.prototype.getPrice = function () {
  return calculatePrice(this);
};

function calculatePrice(pizza) {
  let size = pizza.size;
  let toppings = pizza.toppings;
  let total = 0;
  return total + getSizePrice(size) + getToppingsPrice(toppings);
}

function getSizePrice(size) {
  if(size.toLowerCase().includes("parva")) {
    return 150;
  }
  else if(size.toLowerCase().includes("duo"))  {
    return 300;
  }
  else if(size.toLowerCase().includes("magna"))  {
    return 470;
  }
}

function getToppingsPrice(toppings) {
  let totalTops = 0;
  if(toppings.includes("gold")) {
    totalTops += 600
  }
  if(toppings.includes("caviar")) {
    totalTops += 400
  }
  if(toppings.includes("pule")) {
    totalTops += 500
  }
  return totalTops;
}

//UI Logic

let pizza = new Pizza([],"");

function handleSize() {
  let size = document.querySelector("input[name='size']:checked");
  pizza.size = size.value;
  displayTotal();
}

function handleToppings(e) {
  
  let toppingsList = document.getElementsByName("toppings"); 
  let toppings = []; 
  toppingsList.forEach(function (element) {    
    if(element.checked)
    toppings.push(element.value);
  });
  pizza.toppings = toppings;  
  displayTotal();
}


function displayTotal() {
  document.getElementById("total-price").replaceChildren(pizza.getPrice());
}

function displayAllToppings () {
  let meatToppings = ["Anchovies","Bacon", "Canadian Bacon", "Grilled Chicken", "Ground Beef", "Mild Chicken Sausage", "Pepperoni", "Plant-Based Italian Sausage", "Salami", "Spicy Chicken Sausage"];

  let otherToppings = ["Artichokes", "Arugula", "Basil", "Black", "Olives", "Broccoli-Roasted", "Corn-Roasted", "Garlic-Chopped", "Garlic-Roasted", "Jalapenos","Mushrooms", "Oregano", "Pineapple", "Rosemary", "Salt&Pepper", "Spinach", "Tomatoes-Diced", "Tomatoes-Sliced"];

  let cheeses = ["Asiago", "Feta", "Goronzola", "Mozarella", "Parmesan", "Ricotta", "No Cheese"];

  let finishingSauces = ["BBQ Sauce","Buffalo Sauce", "Ranch", "Blue Cheese", "Balsamic Glaze", "Pesto Drizzle"];

  let meatDiv = document.createElement("div");
  let cheeseDiv = document.createElement("div");
  let othersDiv = document.createElement("div");
  let sauceDiv = document.createElement("div");

  let toppingsDiv = document.getElementById("ordinary-toppings");

  meatToppings.forEach(function (meats) {
    

  });
  

  toppingsDiv.append(meatDiv);


}

function createButton(name, div){
  let button = document.createElement("input");
  let label = document.createElement("label");
  button.setAttribute("type","checkbox");
  button.setAttribute("class", "btn-check");
  button.setAttribute("id", name.split(" ").join.toLowerCase());
  button.setAttribute("value", name);

  label.setAttribute("class","btn");
  label.setAttribute("for", name.split(" ").join.toLowerCase());
  
}

window.addEventListener("load", function () {

  displayAllToppings();
  document.getElementById("size-section").addEventListener("click", handleSize);
  document.getElementById("toppings-section").addEventListener("click", handleToppings);

});

