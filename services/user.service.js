const md5 = require('md5')
const User = require('../models/user.model');

const userService = {};

userService.createUser = async function ({ name, email, password }) {
  try {
    const user = new User({ name, email, password: md5(password) });
    const newUser = await user.save();
    return newUser;
  } catch (e) {
    console.log(e.message);
    throw new Error('Error while save user');
  }
};

userService.getUsers = async function () {
  try {
    const users = await User.find({});
    return users;
  } catch (e) {
    console.log(e.message);
    throw new Error('Error while Paginating Users');
  }
};

userService.getUser = async function ({ id }) {
  try {
    const user = await User.findById(id);
    const getUser = JSON.parse(JSON.stringify(user));
    delete getUser.password;
    return user;
  } catch (e) {
    console.log(e.message);
    throw new Error('Error while returning user');
  }
};

userService.updateUser = async function ({ id }, { name }) {
  try {
    const user = await User.findById(id);
    const updateUser = await user.set({ name });
    delete updateUser.password;
    await updateUser.save();
    return updateUser;
  } catch (e) {
    console.log(e.message);
    throw new Error('Error while update user');
  }
};
module.exports = userService;

userService.userLogin = async function ({ email, password }) {
  try {
    const userInfo = await User.findOne({ email });
    if (userInfo.password === md5(password)) {
      const info = {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        existe: true,
      };
      return info;
    }
    const info = {
      existe: false,
    };
    return info;
  } catch (e) {
    console.log(e.message);
    throw new Error('Error dont exist User');
  }
};