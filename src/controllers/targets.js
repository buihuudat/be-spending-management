const co = require('co');
const TargetOfUser = require('../models/targets');

module.exports = {
  get: (req, res) => {
    const { UID, targets } = req.body
    co(function* () {
      const getTargets = yield TargetOfUser.findOne({ user: UID })
      const getTargetsofMonth = yield TargetOfUser.findOne({user: UID, targets: { $elemMatch: {month: targets.month} }});
      if (!getTargets) {
        const newTargets = yield TargetOfUser.create(req.body);  
        return newTargets;
      }
      if (getTargetsofMonth) {
        const newTargetOfMonth = yield TargetOfUser.findOneAndUpdate(
          {user: UID, 'targets.month': targets.month},
          {$set: { 'targets.$.targets': targets.targets }},
          {new: true}
          )
        return newTargetOfMonth;
      }
      const newTargetOfMonth = yield TargetOfUser.findOneAndUpdate(
        {user: UID},
        {$push: {targets: targets}}
      )
      return newTargetOfMonth;
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  },
}
