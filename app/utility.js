const miliseconds = 1000;

const getTimestamp = () => Math.floor(Date.now() / miliseconds);

const order_ascending = 1;

const order_descending = -1;

module.exports = { 
  getTimestamp,
  order_ascending,
  order_descending 
};