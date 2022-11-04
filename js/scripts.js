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

let pizza = new Pizza();

function handleSize() {
  let size = document.querySelector("input[name='size']:checked");
  pizza.size = size.value;
  pizza.toppings = ["anchovies"]
  displayTotal();
}

function displayTotal() {
  document.getElementById("total-price").replaceChildren(pizza.getPrice());
}

window.addEventListener("load", function () {
  document.getElementById("size-section").addEventListener("click", handleSize);

});

