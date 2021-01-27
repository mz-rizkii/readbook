const { getTimestamp } = require('./utility')

const initUserHelper = (db) => {
  const user = db.collection('user');

  const dropUser = async (lookup) => {
    return user.deleteOne(lookup);
  };

  const findUserByCredential = async ({ username, email, password }) => {
    const projection = { password: 0 };

    return user.findOne({ '$or': [{ username, password }, { email, password }] }, { projection });
  };

  const getUser = async () => {
    const { ops: [result] } = await user.insertOne(input);

    return result;
  };

  const storeUser = async (input) => {
    const registered_at = getTimestamp();

    const { ops: [result] } = await user.insertOne({ ...input, registered_at });

    return result;
  };

  return { dropUser, findUserByCredential, getUser, storeUser };
}

module.exports = { initUserHelper };