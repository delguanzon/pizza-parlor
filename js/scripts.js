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

function createSection (section) {
  const div = document.createElement("div");
  const label = document.createElement("h4");
  label.append(section + ":");
  div.setAttribute("id", section.toLowerCase());
  div.append(label);
  return div;
}

//Business Logic for Order()

function Order() {
  this.orderItems = {};
  this.contact = "";
  this.currentId = 0;
}

Order.prototype.getTotalPrice = function () {
  let total = 0;
  if(this.orderItems != undefined){
    Object.values(this.orderItems).forEach( function (element) {
      total+=element.getPrice();
    });
  }
  return total.toFixed(2);
};

Order.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

Order.prototype.addItem = function (item) {
  item.id = this.assignId();
  this.orderItems[item.id] = item;
};

//Business Logic for Contact() 

function Contact(fullname, address, phoneNumber) {
  this.fullname = fullname;
  this.address = address;
  this.phoneNum = phoneNumber
}

//Business Logic for Item()

function Item(item, price, qty) {
  this.item = item;
  this.price = price;
  this.qty = qty;
}

Item.prototype.getPrice = function () {
  return Math.round(this.price * this.qty * 100 + Number.EPSILON) /100;
};

//Business Logic for Pizza()
function Pizza() {
  this.toppings = [];
  this.size = "";
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

let pizza = new Pizza();

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

  const meatDiv = createSection("Meat");
  const cheeseDiv = createSection("Cheese");
  const othersDiv = createSection("Veggies and more");
  const dipsDiv = createSection("Dipping Sauce");

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

