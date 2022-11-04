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
  return total;
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
  toppings.forEach (function (topping) {
    if (topping.toLowerCase().includes("gold")) {
      totalTops += 650;
    }

  })
}