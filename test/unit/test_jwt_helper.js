

const { expect } = require('chai');

const { signToken, verifyToken } = require('../../app/utility/jwt_helper');

it('check jwt token helper', checkJWTHelper);

async function checkJWTHelper() {
  const username = 'sample-user';

  const user_id = '5fed51e795178988ac7fe895';

  const token = await signToken({ username, user_id });

  const payload = await verifyToken(token);

  console.log('see the token', token, payload);

  expect(payload, `the payload should contain same username as input`).to.have.property('username').to.equal(username);

  expect(payload, `the payload should contain same user_id as input`).to.have.property('user_id').to.equal(user_id);
}