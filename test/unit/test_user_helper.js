const { expect } = require('chai');

const {
  getConnection,
  user_helper
} = require('../../app/db_repository');

const { demo_users } = require('./demo_data');

let instance = '';

describe('check user functions', checkUserFunctions);

function checkUserFunctions() {
  before('setup db connection', initDBConnection);

  it('try user registration', tryRegistration);

  it('try login user', tryUserLogin);

  // it('try view profile', tryViewProfile);

  // it('try update profile', tryUpdateProfile);

  after('clear demo user', clearDemoUsers);
}

const pickId = ({ _id }) => _id;

async function initDBConnection() {
  const db = await getConnection();

  instance = user_helper(db);
}

async function clearDemoUsers() {
  const { dropUser } = instance;

  for (const data of demo_users) {
    const result = await dropUser(data);

    console.log('see the result ', result);
  }
}

async function tryRegistration() {
  const { storeUser } = instance;

  for (const data of demo_users) {
    const result = await storeUser(data);

    console.log('see the result ', result);
  }
}

async function tryUserLogin() {
  const { findUserByCredential } = instance;

  const [first_user, second_user, ...data] = demo_users;

  const { email, password: first_pass } = first_user;

  const result_by_email = await findUserByCredential({ email, password: first_pass });

  console.log('see the email result', result_by_email);

  const { username, password: second_pass } = second_user;

  const result_by_username = await findUserByCredential({ username, password: second_pass });

  console.log('see the username result', result_by_username);
}

async function tryUpdateProfile() {
}
