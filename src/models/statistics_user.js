const mongoose = require('mongoose');

const StatisticsModel = new mongoose.Schema({
  date: {
    type: Date,
    default: new Date,
  },
  name: {
    type: String,
    required: true,
  },
  actions: {
    type: String,
    default: 'Spend',
    enum: ['Spend', 'Collect']
  },
  amountOfMoney: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: 'Done',
    emun: ['Done', 'Slacking']
  }
}, {timestamps: true})

const UserDataStatisticsModel = new mongoose.Schema({
  statistics: [StatisticsModel],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
})

module.exports = mongoose.model('UserDataStatistics', UserDataStatisticsModel);