const {
  getTimestamp,
  order_ascending,
  order_descending
} = require('./utility');

const initPageHelper = (db) => {
  const pages = db.collection('pages');

  const addBookPages = (new_pages) => {
    return pages.insertMany(new_pages);
  }

  const addSinglePage = (new_pages) => {
    return pages.insertOne(new_pages);
  }

  const updateSinglePage = ({ _id, ...changes }) => {
    return pages.findAndModify({ _id }, {}, changes);
  }

  const removeSinglePage = (_id) => {
    return pages.deleteOne({ _id });
  }

  const removeBookPages = async (book_id) => {
    return pages.deleteMany({ book_id });
  };

  const viewPages = async ({ book_id, is_preview = true }) => {
    const query = is_preview ? { book_id, is_preview } : { book_id };

    return pages.find(query).sort('page_number', order_ascending).toArray();
  }

  return {
    addBookPages,
    addSinglePage,
    removeBookPages,
    removeSinglePage,
    updateSinglePage,
    viewPages
  };
};

module.exports = initPageHelper;