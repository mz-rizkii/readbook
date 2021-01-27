require('dotenv').config();

const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;

const { MongoClient } = require('mongodb');

const author_helper = require('./author');

const book_helper = require('./book');

const page_helper = require('./pages');

const { initPurchaseHelper } = require('./purchase');

const { initUserHelper } = require('./user');

const useUnifiedTopology = true;

const client = new MongoClient(`${db_host}://${db_user}:${db_password}`, { useUnifiedTopology });

const getConnection = async () => {
  await client.connect();

  return client.db(db_name);
};

const db_instance = (db) => {
  const purchase_helper = initPurchaseHelper(db);
  
  const user_helper = initUserHelper(db);

  return {
    author_helper: author_helper(db),
    book_helper: book_helper(db),
    page_helper: page_helper(db),
    purchase_helper,
    user_helper
  }
}

module.exports = {
  getConnection,
  db_instance
};

