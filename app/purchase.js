const {
  getTimestamp
} = require('./utility');

const initPurchaseHelper = (db) => {
  const purchases = db.collection('purchases');

  const getPurchase = (user_id) => {
    return purchases.find({ user_id });
  };

  const removeUserPurchase = (user_id) => { 
    return purchases.deleteMany({ user_id });
  };

  const storePurchase = async ({ user_id, book_id, total_price, discount_id }) => {
    const created_at = getTimestamp();

    const updated_at = created_at;

    const total_paid = 0;

    const verified_at = 0;

    const { ops: [result] } = await purchases.insertOne({ 
      user_id, book_id, total_paid, total_price, created_at, updated_at, verified_at, discount_id 
    });

    return result;
  };

  const updatePurchase = async ({ _id, ...changes }) => {
    const updated_at = getTimestamp();

    const returnOriginal = false;

    const { value } = await purchases.findOneAndUpdate({ _id }, { $set : { ...changes, updated_at } }, { returnOriginal });

    return value;
  }

  return { getPurchase, removeUserPurchase, storePurchase, updatePurchase };
};

module.exports = { initPurchaseHelper };