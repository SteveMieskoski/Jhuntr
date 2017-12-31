
var postingModel = require('../../../../database').postingSchema;


module.exports = function getStatuses(user_id) {
    console.log(user_id);
    var statusesQuery = postingModel.statuses.findOne({user_id: user_id});
    return statusesQuery.populate(postingModel.statusesPopulation).exec();
};
