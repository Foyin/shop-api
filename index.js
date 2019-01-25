// Setup basic express server
var favicon = require('serve-favicon');
var request = require("request");
var url = require('url');

var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var fs = require('fs');
var cart = {};
cart.products = [];

fs.readFile('products.json', 'utf8', function (err, data) {
	if (err) throw err;
	products = JSON.parse(data);
});


function checkAvailability(arr, val) {
  return arr.some(function(arrVal) {
    return val === arrVal;
  });
}

function filterByInventory_count(item) {
	if (item.inventory_count !== 0) {
		return true;
	} 
	return false; 
}

function parseURL(request, response) {
	var parseQuery = true //parseQueryStringIfTrue
	var slashHost = true //slashDenoteHostIfTrue
	var urlObj = url.parse(request.url, parseQuery, slashHost)
	console.log('path:')
	console.log(urlObj.path)
	console.log('query:')
	console.log(urlObj.query)
	//for(x in urlObj.query) console.log(x + ': ' + urlObj.query[x]);
	return urlObj
}
// Make your Express server:
//app.use(express.static(path.join(__dirname, 'public')));

// Add favicon
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.get('/api/ping', (req, res) => {
	res.header("Content-Type",'application/json');
	res.json({"success":"true"});
	res.status(200);
});

app.get('/api/products', (req, res) => {
	res.header("Content-Type",'application/json');
	res.json(products);
	res.status(200);
});

app.get('/api/products/available', (req, res) => {
	res.header("Content-Type",'application/json');
	res.json(products.filter(filterByInventory_count));
	res.status(200);
});

app.get('/api/products/purchase', (req, res) => {
	res.header("Content-Type",'application/json');
	var regex = /%20/gi;
	var urlObj = parseURL(req, res);
	var input = urlObj.search;
	if(input){
		var toPurchase = products.findIndex( product => product.title === input.replace(regex, ' ').substring(1, input.length) );
		if(toPurchase === -1){
			res.json({"error":"Product Not Sold Here"});
			res.status(400);
		}
		else{
			if(products[toPurchase].inventory_count <= 0){
				res.json({"error":"Product Not In Stock"});
				res.status(400);
			}
			else{
				products[toPurchase].inventory_count--;
				res.json(products);
				res.status(200);
			}
		}
	}
	else{
		res.json({"error":"Purchase parameter is required"});
		res.status(400);
	}
});


app.get('/api/products/cart', (req, res) => {
	res.header("Content-Type",'application/json');
	var initialvalue = 0;
	cart.total = cart.products.reduce(function (accumulator, currentValue) {
    					return accumulator + currentValue.price;
				},initialvalue).toFixed(2);
	res.json(cart);
	res.status(200);
});

app.get('/api/products/cart/add', (req, res) => {
	res.header("Content-Type",'application/json');
	var regex = /%20/gi;
	var urlObj = parseURL(req, res);
	var input = urlObj.search;
	if(input){
		var toAdd = products.find( product => product.title === input.replace(regex, ' ').substring(1, input.length) );			
		if(toAdd === undefined){
			res.json({"error":"Product Not Sold Here"});
			res.status(400);
		}
		else{
			if(cart.products.find( product => product === toAdd )){
				res.json({"error":"Product Already Added To Cart"});
				res.status(400);
			}
			else{			
				cart.products.push(toAdd);
				res.json(cart.products);
				res.status(200);
			}
		}
	}
	else{
		res.json({"error":"Purchase parameter is required"});
		res.status(400);
	}
});

app.get('/api/products/cart/complete', (req, res) => {
	for(i = 0; i < products.length; i++){
		if(cart.products.find( product => product.title === products[i].title )){
			products[i].inventory_count--;
		}
	}
	res.json({"Status": "Transaction Complete"});
	res.status(200);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

    app.locals.pretty = true;  // made Jade HTML pretty
  
    app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
	    message: err.message,
	    error: err
	});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

server.listen(port, () => {
	console.log('Server listening at port %d\n', port);
	console.log('Testing:');
	console.log('http://localhost:3000/api/ping');
	console.log('http://localhost:3000/api/products');
	console.log('http://localhost:3000/api/products/available');
	console.log('http://localhost:3000/api/products/purchase');
	console.log('http://localhost:3000/api/products/cart');
	console.log('http://localhost:3000/api/products/cart/add');
});

