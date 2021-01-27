
const makeUserData = (username, email, phone, password, first_name, last_name) => ({
  username, email, phone, password, first_name, last_name
});

const demo_users = [
  makeUserData('user001', 'user001@pemakai.net', '+6281390002111', 'bgmnsich', 'nama', 'depan'),
  makeUserData('user002', 'user002@pemakai.net', '+6281391002110', 'usersich', 'gino', 'depan'),
  makeUserData('user003', 'user003@pemakai.net', '+6281392002131', 'cforcomeback', 'alvez', 'depan')
];

module.exports = {
  demo_users
};