function Pizza(toppings,size) {
  this.toppings = toppings;
  this.size = size;
}

Pizza.prototype.getPrice = function () {
  return 5;
};


  