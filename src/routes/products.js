// ************ Require's ************
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer')

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', upload.single('image') , productsController.store);  //upload.single va a generar un objeto literal req.file (para single) req.files (para any)
/*
req.file = {
    fieldname: string
    ...
    filename = string
    ...
}
*/


/*** GET ONE PRODUCT ***/ 
router.get('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id/', productsController.edit); 
router.put('/:id',upload.single('image'), productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
