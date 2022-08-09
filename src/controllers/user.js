const User = require('../models/user');
const CryptoJS = require('crypto-js');
const co = require('co');

module.exports = {
  getUser: async (req, res) => {
    const { _id } = req.body;
    try {
      const user = await User.findOne({_id});
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllUser: (req, res) => {
    co(function*() {
      const passwords = yield User.find().select('password');
      const users = yield User.find();
      passwords.map((pass, i) => {
        const decryptedPass = CryptoJS.AES.decrypt(
          pass.password,
          process.env.PASSWORD_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);
        users[i].password = decryptedPass;
      })

      return users;
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  },

  deleteUser: async (req, res) => {
    const { AID, UID } = req.body;    
    co(function*() {
      const authAdmin = yield User.findOne({_id: AID}).select('permission');
      if (authAdmin.permission !== 'Admin') {
        const error = new Error("You don't have permission to delete")
        error.status(500);
        return error;
      }
      const deletedUser = yield User.deleteMany({ _id: { $in: UID } })
      return deletedUser;
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  },

  updateUser: async (req, res) => {
    const { username, fullname, email, phone } = req.body;
    const passwordOld = await User.findOne({username}).select('password');
    let password = req.body.password;
    if (password !== passwordOld.password) {
      password= CryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET_KEY,
      ).toString();
    }
    try {
      const updatedUser = await User.findOneAndUpdate({ username }, { fullname, email, phone, password });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateUserImage: async (req, res) => {
    const { _id, image } = req.body;
    try {
      const updatedImage = await User.findByIdAndUpdate(_id, { image });
      res.status(200).json(updatedImage);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}