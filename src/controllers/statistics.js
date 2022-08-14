const co = require('co');
const UserDataStatisticsModel = require('../models/statistics_user');

module.exports = {
  create: (req, res) => {
    const { user, statistics } = req.body;
    co(function* (){
      const statisticsCount = yield UserDataStatisticsModel.find({user: user}).count();
      if (statisticsCount){
          const statisticsCreated = UserDataStatisticsModel.findOneAndUpdate(
          {user: user}, { $push: { statistics: statistics } }, { safe: true, upsert: true, new: false }
        );
        return statisticsCreated;
      }
      const statisticsCreated = UserDataStatisticsModel.create(req.body);
      return statisticsCreated;
    })
    .then(statisticsData => res.status(200).json(statisticsData))
    .catch(err => res.status(500).json(err))
  },

  getAll: (req, res) => {
    const { user } = req.body;
    co(function* (){
      const statisticsData = yield UserDataStatisticsModel.findOne({user: user});
      return statisticsData;
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  },

  update: (req, res) => {
    const { user, statistics } = req.body;
    co(function* () {
      const auth = yield UserDataStatisticsModel.findOne({user: user});
      if (!auth) {
        const error = new Error('Updated failure!!!');
        error.status(400);
        return error;
      }
      const statisticsUpdated = yield UserDataStatisticsModel.findOneAndUpdate(
        {user: user, 'statistics._id': statistics._id }, 
        { $set: { 
          'statistics.$.date': statistics.date,  
          'statistics.$.name': statistics.name,  
          'statistics.$.actions': statistics.actions,  
          'statistics.$.amountOfMoney': statistics.amountOfMoney,  
          'statistics.$.status': statistics.status,  
        } }, 
        { new: true }
        );
      return statisticsUpdated;
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  },

  delete: (req, res) => {
    const { user, idStatistics } = req.body;
    co(function* () {
      const auth = yield UserDataStatisticsModel.findOne({user: user});
      if (!auth) {
        const error = new Error('Updated failure!!!');
        error.status(400);
        return error;
      }
      const statisticsDeleted = yield UserDataStatisticsModel.findOneAndUpdate(
        {user: user },
        {$pull: { statistics: { _id: idStatistics }}},
        { new: true }
      )
      return statisticsDeleted;
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  }
}