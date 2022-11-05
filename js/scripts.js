//Utility Logic
function createButton(name, div, type){
  let button = document.createElement("input");
  let label = document.createElement("label");

  button.setAttribute("type","checkbox"); 
  button.setAttribute("class", "btn-check");
  button.setAttribute("name", type);
  button.setAttribute("id", name.split(" ").join("").toLowerCase());
  button.setAttribute("value", name);
  button.setAttribute("autocomplete", "off");

  label.setAttribute("class","btn mx-1 my-1");
  label.setAttribute("for", name.split(" ").join("").toLowerCase());
  label.append(name);

  div.append(button);
  div.append(label);
  return div;  
}

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
  return 0;
}

function getToppingsPrice(toppings) {
  let totalTops = 0;

  toppings.forEach( function (topping){
    if(topping.toLowerCase().includes("gold")) {
      totalTops += 600
    }
    if(topping.toLowerCase().includes("caviar")) {
      totalTops += 400
    }
    if(topping.toLowerCase().includes("pule")) {
      totalTops += 500
    }
  });
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
  let toppings = []; 
  let cheeses = [];

  let cheeseList = document.getElementsByName("cheese");
  cheeseList.forEach(function (cheese) {
      if(cheese.checked){
      cheeses.push(cheese.value);
      }
  });

  console.log(cheeses);

  if (cheeses.includes("No Cheese")){
    toppings.push("No Cheese");
    cheeseList.forEach(function (cheese) {
      if(cheese.checked){
      cheese.checked = false;
      }
  });
  }
  else (
    cheeses.forEach(function (cheese) {
      toppings.push(cheese);
    })
  )
  
  let toppingsList = document.getElementsByName("toppings"); 
  toppingsList.forEach(function (element) {    
    if(element.checked)
    toppings.push(element.value);
  });

  pizza.toppings = toppings;  
  displayTotal();
}


function displayTotal() {

  let toppings = [];
  document.getElementById("total-price").replaceChildren(pizza.getPrice());
  document.getElementById("size").replaceChildren(pizza.size);

  pizza.toppings.forEach(function (element) {
    if(element.toLowerCase().includes("gold")) {
      toppings.push(" 24K Gold Flakes");
    }
    else toppings.push(" "+ element);
  });
  document.getElementById("toppings").replaceChildren(toppings);
}

function displayAllToppings () {
  const meatToppings = ["Anchovies","Bacon", "Canadian Bacon", "Grilled Chicken", "Ground Beef", "Mild Chicken Sausage", "Pepperoni", "Plant-Based Italian Sausage", "Salami", "Spicy Chicken Sausage"];

  const otherToppings = ["Artichokes", "Arugula", "Basil", "Black", "Olives", "Broccoli-Roasted", "Corn-Roasted", "Garlic-Chopped", "Garlic-Roasted", "Jalapenos","Mushrooms", "Oregano", "Pineapple", "Rosemary", "Salt&Pepper", "Spinach", "Tomatoes-Diced", "Tomatoes-Sliced"];

  const cheeses = ["Asiago", "Feta", "Goronzola", "Mozarella", "Parmesan", "Ricotta", "No Cheese"];

  const dips = ["BBQ Sauce","Buffalo Sauce", "Ranch", "Blue Cheese", "Balsamic Glaze", "Pesto Drizzle"];

  const meatDiv = document.createElement("div");
  const cheeseDiv = document.createElement("div");
  const othersDiv = document.createElement("div");
  const dipsDiv = document.createElement("div");

  const meatLabel = document.createElement("h4");
  meatLabel.append("Meats:");
  meatDiv.setAttribute("id", "meats");
  meatDiv.append(meatLabel);

  const cheeseLabel = document.createElement("h4");
  cheeseLabel.append("Cheese:");
  cheeseDiv.setAttribute("id", "cheeses");
  cheeseDiv.append(cheeseLabel);

  const othersLabel = document.createElement("h4");
  othersLabel.append("Veggies and more:");
  othersDiv.setAttribute("id", "others");
  othersDiv.append(othersLabel);

  const dipsLabel = document.createElement("h4");
  dipsLabel.append("Dipping Sauce:");
  dipsDiv.setAttribute("id", "dips");
  dipsDiv.append(dipsLabel);

  const toppingsDiv = document.getElementById("ordinary-toppings");

  cheeses.forEach(function (cheese) {
    toppingsDiv.append(createButton(cheese, cheeseDiv, "cheese"));
  });

  meatToppings.forEach(function (meat) {
    toppingsDiv.append(createButton(meat, meatDiv, "toppings"));
  });

  otherToppings.forEach(function (other) {
    toppingsDiv.append(createButton(other, othersDiv, "toppings"));
  });

  dips.forEach(function (dips) {
    toppingsDiv.append(createButton(dips, dipsDiv, "toppings"));
  });
}

window.addEventListener("load", function () {

  displayAllToppings();
  document.getElementById("size-section").addEventListener("click", handleSize);
  document.getElementById("toppings-section").addEventListener("click", handleToppings);

});

