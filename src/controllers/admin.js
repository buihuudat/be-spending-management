const co = require('co');

const UserDataStatisticsModel = require('../models/statistics_user');
const User = require('../models/user');
const TargetOfUser = require('../models/targets');

module.exports = {
  delete: (req, res) => {
    const { UID, AID } = req.body;
    console.log(req.body)
    co(function* () {
      const authAdmin = yield User.findOne({_id: AID}).select('permission');
        if (authAdmin.permission !== 'Admin') {
          yield Promise.reject(new Error("You don't have permission to delete"))
        }
  
        const user =  User.findOneAndDelete({ _id: UID });
        const statistics = UserDataStatisticsModel.findOneAndDelete({ user: UID });
        const targets = TargetOfUser.findOneAndDelete({ user: UID });
        const deleted = yield [user, statistics, targets];
        return deleted;
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  }
}