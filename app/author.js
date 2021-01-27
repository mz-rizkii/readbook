const {
  getTimestamp
} = require('./utility');

const initAuthorHelper = (db) => {
  const authors = db.collection('author');

  const removeAuthor = (_id) => {
    return authors.deleteOne({ _id });
  }

  const storeAuthor = async (input) => {
    const created_at = getTimestamp();

    const { ops: [result] } = await authors.insertOne({ ...input, created_at });

    return result;
  }

  const viewAuthors = async () => {
    return authors.find().toArray();
  }

  const viewAuthorById = async (_id) => {
    return authors.findOne({ _id });
  }

  const viewAuthorByName = async (full_name) => {
    return authors.findOne({ full_name });
  }

  return {
    removeAuthor,
    storeAuthor,  
    viewAuthors,
    viewAuthorById,
    viewAuthorByName
  };
};

module.exports = initAuthorHelper;