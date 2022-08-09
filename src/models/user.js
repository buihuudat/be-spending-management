const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  image: {
    type: String,
    default: 'https://scontent.xx.fbcdn.net/v/t1.15752-9/258879432_279355677617066_3563600543492345610_n.png?stp=dst-png_p206x206&_nc_cat=108&ccb=1-7&_nc_sid=aee45a&_nc_ohc=SqZORkAi6e0AX9UjvFs&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVKIwTMP4rUVqC1G-EKxF7A0IsWHhpigjuysLmspNVDUpA&oe=630EB430'
  },
  permission: {
    type: String,
    default: 'User',
  }
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);