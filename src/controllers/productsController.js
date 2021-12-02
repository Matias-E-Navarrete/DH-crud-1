const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))// --> Vuelve a cargar la BBDD dentro del método para forzar un refresh de los datos del JSON
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
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		//return res.json(typeof req.file)
		// Do the magic
		//Modificar el JSON con el nuevo producto
		//req.body accede a los datos del formulario
		//Ouput del formulario tiene este formato -> {"name":"Zapas","price":"100","discount":"10","category":"in-sale","description":"Descripción"}
		let unaOpcionQueNoUsamos = JSON.stringify(req.body) //Esto genera un objeto con TODOS los componentes del body
		//Inicio la variable que almacena el formulario completo
		let newID = products[products.length-1].id + 1 //Accedemos al ID del último elemento del array, y le sumamos 1 al id de ese elemento
		/* let newProduct = {
			//el valor después de req.body debería ser el valor asignado a la propiedad "name" del formulario
			id:newID,
			name: req.body.name,  //<input type="text" id="name" name="name" placeholder="Ej: Zapatillas Reebok" class="form-input">
			price: req.body.price, //<input type="text" id="price" name="price" placeholder="Ej: 5678" class="form-input">
			discount: req.body.discount,
			category: req.body.category,
			description:req.body.description,
			image:"default-image.png" // habrá que validar luego si se subió una imagen y pisar esto
		} */
		let newProduct = {
			id:newID,
			...req.body, //Spread operator -> Si hay un objeto literal, toma cada una de las propiedades y valores y los separa en un objeto literal
			//name:"Loquequiero" --> Esto pisa lo que venga del body en caso de que las claves coincidan. Para pisar lo que viene del req.body hay que ponerlo abajo del mismo, sino el req.body va a pisar a esta declaración
			image: req.file == undefined ? "default-image.png": req.file.filename
		}
		//Agregamos el producto al array en formato Js
		products.push(newProduct)
		let productsJSON = JSON.stringify(products, null, 2) //el null, 2 hace que quede una clave abajo de la otra, y formatea el JSON
		fs.writeFileSync(productsFilePath,productsJSON) // Busca la ubicación del archivo JSON, y le pisa la información con la variable productsJSON
		//res.redirect('/products')

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
		//-----------copio todo el código de la clave store-----------------
		let id = req.params.id
		/*
		Lógica a aplicar:
		Traemos BBDD
		Buscamos en BBDD el index del id que me coincide con el que me viene de params
		Sobreescribo la info en BBDD con los datos que me vienen del formulario
		Mando BBDD nuevamente a JSON para archivar
		Si me lo piden, redirecciono
		*/
		let modifiedProducts = products.map(element => {
			if (element.id == id) {
				return element = {
					id:id,
					...req.body,
					image: req.file == undefined ? element.image : req.file.filename // usa in if ternario
				}
			}
			return element
		})

		// Mando BBDD y Redirecciono
		let productsJSON = JSON.stringify(modifiedProducts, null, 2) 
		fs.writeFileSync(productsFilePath,productsJSON) 
		res.redirect('/products')
		//-----------copio todo el código de la clave store-----------------
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;