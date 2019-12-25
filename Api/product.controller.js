const Product = require('../models/product.model.js');


// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    var MongoClient = require('mongodb').MongoClient;

const dburl = 'mongodb://localhost:27017/';
const dbname = 'movieinfo';
const collname = 'ProductSchema';

	MongoClient.connect(dburl, function(err, client) {
		if(!err) {
			const db = client.db(dbname);
			const collection = db.collection(collname);

			collection.find({}).toArray(function(err, todo) {
				if(!err) {
					 res.send(todo);
				}
			});


			client.close();
		}
	});

       
    
};