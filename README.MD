# Pizza Parlor

#### By Yodel Guanzon <yodelguanzon@gmail.com>

#### This is an independent project to test out our skills on objects and prototypes.

## Technologies Used

* Git
* HTML
* CSS
* Javascript
* Bootstrap

## Description

A website for a pizza company where a user can choose one or more individual toppings (cheese, pepperoni, artichoke, anchovy, etc.), a size to order a pizza, and see the final cost.

* Allow the user to choose toppings and size for the pizza they'd like to order.
* Create a pizza object constructor with properties for toppings and size.
* Create a prototype method for the cost of a pizza depending on the selections chosen.

[View on Github Pages](https://delguanzon.github.io/pizza-parlor/)

## Setup/Installation Requirements

* Clone this repository on your desktop
* Navigate to the top level of the directory
* Look for index.html and open it in your web browser

## Known Bugs

* GitHub Pages will sometimes not display background image and FontFace from CSS file, if this happens clear your cache or open in a new private window

## Tests
```

Describe: Pizza()

Test: "It should return a Pizza object with two properties for toppings and size"
Code: const myPizza = new Pizza(["anchovies", "caviar"], "parva");
Expected Output: Pizza { toppings: ["anchovies", "caviar"], size: "parva" }

Describe: Pizza.prototype.getPrice()

Test: It should return 150 for "Parva" size pizza.
Code: 
  const myPizza = new Pizza(["anchovies", "caviar"], "parva");
  myPizza.getPrice();
Expceted Output: 150;

Test: It should return 300 for "Duo" size pizza.
Code: 
  const myPizza = new Pizza(["anchovies", "caviar"], "duo");
  myPizza.getPrice();
Expceted Output: 300;

Test: It should return 470 for "Magna" size pizza.
Code: 
  const myPizza = new Pizza(["anchovies", "caviar"], "magna");
  myPizza.getPrice();
Expceted Output: 470;

Test: It should add 600 to the total for pizzas with special topping: "12k Gold Shavings".
Code: 
  const myPizza = new Pizza(["anchovies", "gold"], "parva");
  myPizza.getPrice();
Expceted Output: 750;

Test: It should add 400 to the total for pizzas with special topping: "Caviar".
Code: 
  const myPizza = new Pizza(["anchovies", "caviar"], "parva");
  myPizza.getPrice();
Expceted Output: 550;

Test: It should add 500 to the total for pizzas with special topping: "Pule".
Code: 
  const myPizza = new Pizza(["anchovies", "pule"], "parva");
  myPizza.getPrice();
Expceted Output: 650;

Describe: Contact()
Test: It should return a contact object with name, address, and phone number.
Code: let contact = new Contact('John Doe','123 Street','+1234567889');
Expected Output: Contact { fullname: 'John Doe', address: '123 Street', phoneNum: '+1234567889' }

Describe: Item()
Test: It should return an item object with properties of name, price and qty.
Code: let item = new Item("soda",6.12,2);
Expected Output:  Item {name:'',price: , qty: }

Describe: Item.prototype.getPrice()
Test: It should return the item's total price
Code: item.getPrice();
Expected Output: 12.24;

Test: It should return the items total price rounded up with only 2 decimals.
Code: let item = new Item("soda",6.123,2);
      item.getPrice()
Expected Output: 12.25;

Describe: Order()
Test: It should return an Order object with Order Items and contact details.
Code: let order = new Order();
Expected Output: Order { orderItems: {}, contact: '', currentId: 0 }

Describe: Order.prototype.assignId();
Test: It should return a number based on current id incrementing it by 1.
Code: order.assignId();
Expected Output: 1;

Describe: Order.prototype.addItem();
Test: Add an item to orderItems of the Order object
Code: let myOrder = new Order();
      order.addItem(myPizza)
Expected Output: Order {orderItems: myPizza, currentId:1}

Describe: Order.prototype.updateItem();
Test: Update price and quantity of an item in an order;
Code:
  Order { orderItems: { item: "Rootbeer" price: 5.01 qty: 1 }
  order.updateItem("Rootbeer", 2.00, 3);
Expected Output: Order { orderItems: { item: "Rootbeer" price: 2.00 qty: 3 }

Describe: Order.prototype.removeItem()
Test: Remove an item from the order
Code: 
  Order {orderItems: myPizza, currentId:1}
  order.removeItem(myPizza);
Expected Output: Order {orderItems: , currentId:1}

Describe: Order.prototype.getTotalPrice()
Test: It should return the total price for all the items in order.
Code: order.getPrice();
Expected Output: 550;

Test: It should return two decimal places
Code: order.getPrice();
Expected Output: 550.00

Test: It should return 0 if there are no items in  the order.
Code: order.getPrice();
Expected Output: 0;

Describe: getSizePrice(size)

Test: It should return 150 for "Parva" size pizza.
Code: getSizePrize("Parva")
Expceted Output: 150;

Test: It should return 300 for "Duo" size pizza.
Code: getSizePrize("Duo")
Expceted Output: 300;

Test: It should return 470 for "Magna" size pizza.
Code: getSizePrize("Magna")
Expceted Output: 470;

Describe: getToppingsPrice(toppings)
Test: It should add 600 to the total for pizzas with special topping: "12k Gold Shavings".
Code: 
  let total = 0;
  const toppings = ["gold", "caviar", "pule"];
  getToppingsPrice(toppings);
Expceted Output: 600;

Test: It should add 400 to the total for pizzas with special topping: "Caviar".
Code: 
  let total = 0;
  const toppings = ["gold", "caviar", "pule"];
  getToppingsPrice(toppings);
Expceted Output: 1000;

Test: It should add 500 to the total for pizzas with special topping: "Pule".
Code: 
  let total = 0;
  const toppings = ["gold", "caviar", "pule"];
  getToppingsPrice(toppings);
Expceted Output: 1500;


```

## License

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Copyright (c) 10/31/2022 Yodel Guanzon

