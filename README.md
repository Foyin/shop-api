# Snack Shop Backend

App runs using node js version 10.15.0

Download JSON formatter for cleaner looking display

Demo [Here](https://shopifycarttest.herokuapp.com/api/products)

To run use
``` node index.js ```

To run 'secure' version that uses a https connection with self-signed certificate use
``` node index-https.js ```

* productsList.json - Original List of products with all informaion
* products.json - parsed json version of productsList.json
* loadJson.py - program used to parse productsList.json
* index.js - main shop api app
* index-https.js - 'secure' version that uses a https connection with self-signed certificate


## Usage
- To test connection: ```http://localhost:3000/api/ping```
- To show all products: ```http://localhost:3000/api/products```
- To show all products in stock (inventory greater than zero): ```http://localhost:3000/api/products/available```
- To purchase product: ```http://localhost:3000/api/products/purchase```

speficy by adding title of product after ? ex: ```http://localhost:3000/api/products/purchase?chips```
- To view cart: ```http://localhost:3000/api/products/cart```
- To add to cart: ```http://localhost:3000/api/products/cart/add```

speficy by adding title of product after ? ex: ```http://localhost:3000/api/products/cart/add?chips```
- To remove items in cart from inventory and end transaction: ```http://localhost:3000/api/products/cart/complete```


