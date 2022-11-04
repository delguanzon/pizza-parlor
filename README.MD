# Pizza Parlor

#### By Yodel Guanzon <yodelguanzon@gmail.com>

#### This is an independent project to test out our skills on objects and prototypes.

## Technologies Used

* Git
* HTML
* CSS
* Javascript

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

Describe: getSizePrice(size)

Test: It should return 150 for "Parva" size pizza.
Code: getSize("Parva")
Expceted Output: 150;

Test: It should return 300 for "Duo" size pizza.
Code: 
  const myPizza = new Pizza(["anchovies", "pineapple"], "Duo");
  myPizza.getPrice();
Expceted Output: 300;

Test: It should return 470 for "Magna" size pizza.
Code: 
  const myPizza = new Pizza(["anchovies", "pineapple"], "Magna");
  myPizza.getPrice();
Expceted Output: 470;

Describe: getToppingPrice(toppings)
Test: It should add 600 to the total for pizzas with special topping: "12k Gold Shavings".
Code: 
  const myPizza = new Pizza(["anchovies", "12k Gold Shavings"], "Parva");
  myPizza.getPrice();
Expceted Output: 750;

Test: It should add 400 to the total for pizzas with special topping: "Caviar".
Code: 
  const myPizza = new Pizza(["anchovies", "Caviar"], "Parva");
  myPizza.getPrice();
Expceted Output: 550;

Test: It should add 500 to the total for pizzas with special topping: "Pule".
Code: 
  const myPizza = new Pizza(["anchovies", "Pule"], "Parva");
  myPizza.getPrice();
Expceted Output: 650;

Describe: Pizza()

Test: "It should return a Pizza object with two properties for toppings and size"
Code: const myPizza = new Pizza(["anchovies", "Caviar"], "Parva");
Expected Output: Pizza { toppings: ["anchovies", "Caviar"], size: "Parva" }

Describe: calculatePrice()

Test: It should return the calculated price of the pizza object.
Code: calculatePrice(myPizza);
Expected Output: 

Describe: Pizza.prototype.getPrice()

Test: It should return the price of the pizza.
Code: myPizza.getPrice();
Expceted Output: 15;

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

