const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth')

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', isAuth, shopController.getCart);

router.post('/cart', isAuth, shopController.postCart);

router.patch('/cart-add/:productId', isAuth, shopController.addOneToCart)

router.patch('/cart-remove/:productId', isAuth, shopController.removeOneFromCart)

router.delete('/cart-delete-item/:productId', isAuth, shopController.cartDeleteProduct);

router.post('/create-order', isAuth, shopController.postOrder);

router.get('/orders', isAuth, shopController.getOrders);

module.exports = router;
