const express = require('express');

const router = express.Router();

const book_controller = require('./book_controller');

const purchase_controller = require('./purchase_controller');

const user_controller = require('./user_controller');

router.get('/book', book_controller);

router.get('/purchase', purchase_controller);

router.get('/user', user_controller);

module.exports = router;