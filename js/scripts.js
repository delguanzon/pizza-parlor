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

  return total;
}