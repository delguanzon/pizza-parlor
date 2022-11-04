function Pizza(toppings,size) {
  this.toppings = toppings;
  this.size = size;
}

Pizza.prototype.getPrice = function () {
  return calculatePrice(this);
};


function calculatePrice(pizza) {
  let total = 5;

  return total;
}