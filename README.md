# Snack Shop Backend

App runs using node js version 10.15.0

To run use
``` node index.js ```

To run 'secure' version that uses a https connction with self-signed certificate use
``` node index-https.js ```

* productsList.json - Original List of products with all informaion
* products.json - parsed json version of productsList.json
* loadJson.py - program used to parse productsList.json
* index.js - main shop api app


To test connection:

```http://localhost:3000/api/ping```


To show all products:

```http://localhost:3000/api/products```


To show all products in stock (inventory greater than zero):

```http://localhost:3000/api/products/available```


To show all products in stock (inventory greater than zero):

```http://localhost:3000/api/products/purchase```

speficy by adding title of product after ? 

ex: ```http://localhost:3000/api/products/purchase?chips```


To view cart:

```http://localhost:3000//api/products/cart```


To add to cart:

```http://localhost:3000//api/products/cart/add```

speficy by adding title of product after ? 

ex: ```http://localhost:3000/api/products/cart?chips```



