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

  if(size.toLowerCase().includes("parva")) {
    total += 150;
  }
  else if(size.toLowerCase().includes("duo"))  {
    total += 300;
  }
  else if(size.toLowerCase().includes("magna"))  {
    total += 470;
  }

  return total;
}