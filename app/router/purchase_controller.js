const express = require('express');

const router = express.Router();

const book_controller = require('./book_controller');

const purchase_controller = require('./purchase_controller');

const user_controller = require('./user_controller');

router.use('/book', book_controller);

router.use('/purchase', purchase_controller);

router.use('/user', user_controller);

module.exports = router;