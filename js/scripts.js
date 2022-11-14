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

function resetForm() {
  document.getElementById("addBtnGrp").setAttribute("class", "btn-group");
  document.getElementById("cyop").setAttribute("class","col-8 hidden");
  document.getElementById("pizza-details").setAttribute("hidden","");
  document.getElementById("toppings-section").setAttribute("hidden","");
  document.querySelectorAll("input[type='checkbox']").forEach(function (element) {
    element.checked = false;
  });
  document.querySelectorAll("input[type='radio']").forEach(function (element) {
    element.checked = false;
  });  
}

//Business Logic for subtotal price

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

Order.prototype.removeItem = function(item) {
  delete this.orderItems[item.id];
  this.currentId -= 1;
  return true;
}

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
  this.item = "Pizza";
}

Pizza.prototype.getPrice = function () {

  const total = 0;
  if(this.size.toLowerCase().includes("parva")) {
    total+=150;
  }
  else if(size.toLowerCase().includes("duo"))  {
    total+=300;
  }
  else if(size.toLowerCase().includes("magna"))  {
    total+=470;
  }

  this.toppings.forEach( function (topping){
    if(topping.toLowerCase().includes("gold")) {
      total += 600
    }
    if(topping.toLowerCase().includes("caviar")) {
      totalTops += 400
    }
  });
  return total;
};

//UI Logic

function handleSize() {
  let size = document.querySelector("input[name='size']:checked");
  if(size === null){
    console.log(size);
  }
  else {
    document.getElementById("toppings-section").removeAttribute("hidden");
  }  
  let toppingsList = document.getElementById("toppings").innerText.split(", "); 
  displayTotal(toppingsList, size.value);
}

function handleToppings() {
  let toppings = []; 
  let cheeses = [];
  let size = document.getElementById("size").innerText;

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

  displayTotal(toppings, size);
}


function displayTotal(toppings, size) {
  
  let toppingsList = [];

  document.getElementById("subtotal").replaceChildren(getSizePrice(size) + getToppingsPrice(toppings));
  document.getElementById("size").replaceChildren(size);

  toppings.forEach(function (element) {
    if(element.toLowerCase().includes("gold")) {
      toppingsList.push(" 24K Gold Flakes");
    }
    else toppingsList.push(" "+ element);
  });
  document.getElementById("toppings").replaceChildren(toppingsList);
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

function handlePizza(){
  document.getElementById("addBtnGrp").setAttribute("class", "hidden");
  document.getElementById("cyop").setAttribute("class","col-8");
  document.getElementById("pizza-details").removeAttribute("hidden"); 
  displayAllToppings();
}

// function handleAddPizza(order) {
//   resetForm();

//   if(order.orderItems[order.currentId].toppings.length === 0){
//     order.orderItems[order.currentId].toppings.push("Dough Only");
//   }

//   let pizza = new Pizza();
//   order.addItem(pizza);
//   displayCart();
// }

// function handleCancel(order) {
//   resetForm();
//   order.removeItem(order.orderItems[order.currentId]);
//   displayCart();  
// }

function displayCart(order) { 
  
  let div2 = document.createElement("ul");
  let p = document.createElement("p");
  div2.style.display = "block";

  if(order.orderItems != undefined){
    Object.values(order.orderItems).forEach( function (item) {
      console.log(item);
      let ahref = document.createElement("a");
      let div = document.createElement("div");
      let card = document.createElement("div");
      let li = document.createElement("li");
      ahref.setAttribute("data-bs-toggle", "collapse");
      ahref.setAttribute("href", "#item" + item.id);
      div.setAttribute("class","collapse");
      div.setAttribute("id","item" + item.id);
      card.setAttribute("class","card card-body");
      card.append(item.toppings.join(", "));
      console.log(item.toppings);
      ahref.append("#" + item.id + " " + item.item);
      div.append(card);
      li.append(ahref);
      ahref.after(" - $" + item.getPrice());
      li.append(div);
      div2.append(li);
    });
  }
  p.append("Total: " + order.getTotalPrice());
  document.getElementById("order-details").replaceChildren(div2);
  document.getElementById("order-details").append(p);
  

}

window.addEventListener("load", function () {
  const order = new Order();  
  document.getElementById("newPizza").addEventListener("click", handlePizza);
  document.getElementById("size-section").addEventListener("click", handleSize);
  document.getElementById("toppings-section").addEventListener("click", handleToppings);
  //document.getElementById("addPizza").addEventListener("click", handleAddPizza(order));
  //document.getElementById("cancelPizza").addEventListener("click", handleCancel(order));
});

