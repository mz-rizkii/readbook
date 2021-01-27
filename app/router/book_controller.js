const express = require('express');

const router = express.Router();

const { book_helper } = require('../db_repository');

const { 
  sendSuccessResponse, 
  sendErrorResponse 
} = require('../utility/response_handler');

const {
  validateAuth,
  getOptionalAuth
} = require('../middleware/auth');

const handleViewDashboard = async (req, res) => {
  try {
    const { locals: { db_collection: { book_helper } } } = res;

    const { viewBooks } = book_helper(db_collection);

    const books = await viewBooks();

    sendSuccessResponse(res, { books })
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
const handleViewBookDetail = async (req, res) => {
  try {
    const { params: { id } } = req;

    const { locals: { db_collection: { book_helper, page_helper }, profile } } = res;

    const { viewBookById } = book_helper;

    const books = await viewBookById(id);

    sendSuccessResponse(res, { books, pages })
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const handleViewCollection = async (req, res) => {
  try {
    const { params: { id } } = req;

    const { locals: { db_collection: { book_helper }, profile } } = res;

    const { viewBookById } = book_helper;

    const books = await viewBookById(id);

    sendSuccessResponse(res, { books })
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

router.get('/', handleViewDashboard);

router.get('/:id', getOptionalAuth, handleViewBookDetail);

router.get('/collection', validateAuth, handleViewCollection);

module.exports = router;