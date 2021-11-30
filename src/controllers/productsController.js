const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {productos: products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		//Pido el parámetro que viene en la url bajo el nombre id
		let idProducto = req.params.id
		//encuentro el producto particular que me coincide con el id que quiero mostrar
		let productoAMostrar = products.find(element => element.id == idProducto)
		//Paso el producto que encontré al ejs
		res.render('detail',{productos: productoAMostrar});
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		//Pido el parámetro que viene en la url bajo el nombre id
		let idProducto = req.params.id
		//encuentro el producto particular que me coincide con el id que quiero mostrar
		let productoAMostrar = products.find(element => element.id == idProducto)
		//Paso el producto que encontré al ejs
		res.render('product-edit-form',{productToEdit: productoAMostrar});
	},
	// Update - Method to update
	update: (req, res) => {
		res.send('Recibidos los datos del producto actualizado')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;