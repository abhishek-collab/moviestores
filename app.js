var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

const dburl = 'mongodb://localhost:27017/';
const dbname = 'movieinfo';
const collname = 'ProductSchema';


app.get('/',function(req,res){
	MongoClient.connect(dburl, function(err, client) {
		if(!err) {
			const db = client.db(dbname);
			const collection = db.collection(collname);

			collection.find({}).toArray(function(err, todo) {
				if(!err) {
					var output = '<html><header><title>Retrieve data from mongodb</title></header><body>';

					output += '<h1>Data Retrieve from movieinfo</h1>';
					output += '<table border="1"><tr><td><b>' + 'Name'  + '</b></td><td><b>' + 'image' + '</b></td><td><b>' + 'summary' + '</b></td></tr>';

					todo.forEach(function(todo){
						output += '<tr><td>' + todo.name + '</td><td>' + todo.img + '</td><td>' + todo.summary + '</td></tr>';

					});
					output += '</table></body></html>'
					res.send(output);

				}
			});


			client.close();
		}
	});
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
MongoClient.Promise = global.Promise;

// Connecting to the database
MongoClient.connect(dburl, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
//app.use('/api',require('./routes/api'));
require('../moviestore/routes/product.routes.js')(app)
app.listen(3000, function(){


console.log('Running on port 3000')
});