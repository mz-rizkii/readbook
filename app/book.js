const {
  getTimestamp
} = require('./utility');

const initBookHelper = (db) => {
  const books = db.collection('books');

  const removeBook = (_id) => {
    return books.deleteOne({ _id });
  }

  const storeBook = async (input) => {
    const created_at = getTimestamp();

    const { ops: [result] } = await books.insertOne({ ...input, created_at });

    return result;
  }

  const viewBooks = async () => {
    const $lookup = {
      from: 'author', localField: 'author_id', foreignField: '_id', as: 'author_profile'
    };

    return books.aggregate([{ $lookup }]).toArray();
  }

  const viewBookById = async (_id) => {
    return books.findOne({ _id });
  }

  return {
    removeBook,
    storeBook,  
    viewBooks,
    viewBookById
  };
};

module.exports = initBookHelper;