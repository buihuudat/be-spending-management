const mongoose = require('mongoose');

const TargetModel = new mongoose.Schema({
  month: {
    type: String,
    default: '1',
    unique: true
  },
  targets: {
    type: Number,
    default: 0,
  }
}, {_id: false})

const TargetOfUser = new mongoose.Schema({
  targets: [TargetModel],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Targets', TargetOfUser);