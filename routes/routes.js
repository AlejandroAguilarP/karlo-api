const {Router} = require('express');
const userController = require('../controllers/user.controller.js');
const productController = require('../controllers/product.controller.js');

const router = Router();

//Users routes
router.get('/users', userController.getAll);
router.get('/users/:id', userController.getUserByID);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/users', userController.createUser);
router.get('/verifyUser', userController.verifyUser);

//Products Routes


router.get('/products', productController.getAll);
router.get('/products/:id', productController.getAll);
router.put('/products/:id', productController.updateProd);
router.delete('/products/:id', productController.deleteProd);
router.post('/products', productController.createProduct);
//Orders Routes


module.exports = router;