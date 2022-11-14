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
function Pizza(toppings, size) {
  this.toppings = toppings;
  this.size = size;
  this.item = "Pizza";
}

Pizza.prototype.getPrice = function () {

  let total = 0;
  if(this.size.toLowerCase().includes("parva")) {
    total+=150;
  }
  else if(this.size.toLowerCase().includes("duo"))  {
    total+=300;
  }
  else if(this.size.toLowerCase().includes("magna"))  {
    total+=470;
  }

  this.toppings.forEach( function (topping){
    if(topping.toLowerCase().includes("gold")) {
      total += 600
    }
    if(topping.toLowerCase().includes("caviar")) {
      total += 400
    }
    if(topping.toLowerCase().includes("pule")) {
      total += 500
    }
  });
  return total;
};

//Business Logic for subtotals

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

function handleSize() {
  const size = document.querySelector("input[name='size']:checked");
  if(size === null){
    return;
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

function handlePizzaView(){
  document.getElementById("addBtnGrp").setAttribute("class", "hidden");
  document.getElementById("cyop").setAttribute("class","col-8");
  document.getElementById("pizza-details").removeAttribute("hidden"); 
  displayAllToppings();
}

function handleAddonView(order) {
  Object.values(order.orderItems).forEach(function (item) {
    switch(item.item) {
      case 'Breadstick': {
        document.getElementById("addItems").replaceChildren("Update Cart");
        document.getElementById('bs-qty').value = item.qty;
        document.getElementById('bs-price').value = item.price;
        break;
      }
      case 'Lava Cake': {
        document.getElementById("addItems").replaceChildren("Update Cart");
        document.getElementById('lc-qty').value = item.qty;
        document.getElementById('lc-price').value = item.price;
        break;
      }
      case 'Cheesecake': {
        document.getElementById("addItems").replaceChildren("Update Cart");
        document.getElementById('cc-qty').value = item.qty;
        document.getElementById('cc-price').value = item.price;
        break;
      }
      case 'Rootbeer': {
        document.getElementById("addItems").replaceChildren("Update Cart");
        document.getElementById('rb-qty').value = item.qty;
        document.getElementById('rb-price').value = item.price;
        break;
      }
      case 'Milkshake': {
        document.getElementById("addItems").replaceChildren("Update Cart");
        document.getElementById('ms-qty').value = item.qty;
        document.getElementById('ms-price').value = item.price;
        break;
      }
      case 'Sparkling Wine': {
        document.getElementById("addItems").replaceChildren("Update Cart");
        document.getElementById('sw-qty').value = item.qty;
        document.getElementById('sw-price').value = item.price;
        break;
      }
      case 'Champagne': {
        document.getElementById("addItems").replaceChildren("Update Cart");
        document.getElementById('ch-qty').value = item.qty;
        document.getElementById('ch-price').value = item.price;
        break;
      }
      default: break;
    }
  });
  document.getElementById("addBtnGrp").setAttribute("class", "hidden");
  document.getElementById("add-ons").removeAttribute("hidden");
  document.querySelector(".addbtns").removeAttribute("hidden");
}

function handleAddPizza(order) {
  
  const size = document.getElementById("size").innerText;
  const toppings = document.getElementById("toppings").innerText.split(", "); 
  if(toppings.length === 0 || toppings[0].length === 0){
    toppings.pop();
    toppings.push("Dough Only");
  }
  if(size.length != 0){
    let pizza = new Pizza(toppings,size);
    order.addItem(pizza);
    resetForm();
    displayCart(order);
  }
}

function handleCancel(order) {
  resetForm();
  displayCart(order);
}

function handleAddons(order) {
  const itemCodes = ['bs','lc','cc','rb','ms','sw','ch'];
  itemCodes.forEach( (element) => {
    let qty = document.getElementById(element + '-qty').value;
    let price = document.getElementById(element + '-price').value;
    if(qty != 0){
      console.log(qty);
      console.log(element);
      switch(element) {
        case 'bs': {
          let item = new Item('Breadstick', price, qty);
          order.addItem(item);
          break;
        }
        case 'lc': {
          let item = new Item('Lava Cake', price, qty);
          order.addItem(item);
          break;
        }
        case 'cc': {
          let item = new Item('Cheesecake', price, qty);
          order.addItem(item);
          break;
        }
        case 'rb': {
          let item = new Item('Rootbeer', price, qty);
          order.addItem(item);
          break;
        }
        case 'ms': {
          let item = new Item('Milkshake', price, qty);
          order.addItem(item);
          break;
        }
        case 'sw': {
          let item = new Item('Sparkling Wine', price, qty);
          order.addItem(item);
          break;
        }
        case 'ch': {
          let item = new Item('Champagne', price, qty);
          order.addItem(item);
          break;
        }
        default: break;
      }
    }
    else {
      console.log("No order" + element);
    }
  });
  console.log(order);
  displayCart(order);
  resetForm();
}

function displayCart(order) { 
  
  let div2 = document.createElement("ul");
  let p = document.createElement("p");
  div2.style.display = "block";
  console.log(Object.values(order.orderItems));

  if(Object.values(order.orderItems).length != 0) {
    Object.values(order.orderItems).forEach(function (item) {
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
      if(item.toppings != undefined) {
        card.append(item.toppings.join(", "));
        console.log(item.toppings);
        div.append(card);
      }
      ahref.append("#" + item.id + " " + item.item);
      li.append(ahref);
      ahref.after(" - $" + item.getPrice());
      li.append(div);
      div2.append(li);
    });
    console.log(order.orderItems);
    p.append("Total: " + order.getTotalPrice());
    document.getElementById("order-details").replaceChildren(div2);
    document.getElementById("order-details").append(p);
  }
}

window.addEventListener("load", function () {
  const order = new Order();
  const x = document.getElementsByClassName("quantity");
  document.getElementById("newPizza").addEventListener("click", handlePizzaView);
  document.getElementById("size-section").addEventListener("click", handleSize);
  document.getElementById("toppings-section").addEventListener("click", handleToppings);
  document.getElementById("newItem").addEventListener("click", function(e){handleAddonView(order)});
  document.getElementById("addPizza").addEventListener("click", function(e){handleAddPizza(order)});
  document.getElementById("addItems").addEventListener("click", function(e){handleAddons(order)});
  document.getElementById("cancelPizza").addEventListener("click", function(e){handleCancel(order)});
  document.getElementById("cancelItems").addEventListener("click", function(e){handleCancel(order)});
});


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
  document.getElementById("add-ons").setAttribute("hidden","");  
  document.getElementById("toppings-section").setAttribute("hidden","");
  document.getElementById("size").innerText = "";
  document.getElementById("toppings").innerText = "";
  document.getElementById("subtotal").innerText = "";
  document.querySelector(".addbtns").setAttribute("hidden","");
  document.querySelectorAll("input[type='checkbox']").forEach(function (element) {
    element.checked = false;
  });
  document.querySelectorAll("input[type='radio']").forEach(function (element) {
    element.checked = false;
  });  
}

