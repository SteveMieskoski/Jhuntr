var postModel = require('../../../../database').postingSchema;

module.exports.handler = updatePostApiHandler;
module.exports.updatePost = updatePost;

function updatePostApiHandler(req, res) {
    console.log('/update/:id', req.params.id);
    updatePost(req.params.id, req.body)
        .then(function (result) {
            res.status(200).json({message: 'posting updated', data: result, result: true});
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({error: error, result: false})
        })
}


function updatePost(postId, data) {
    if(data.hasOwnProperty('_id')) {
        delete data._id;
    }
    if( data.hasOwnProperty('updated_at') ){
        delete data['updated_at'];
    }
    if(data.hasOwnProperty('created_at') ){
        delete data['created_at'];
    }
    if(data.hasOwnProperty('__v')){
        delete data['__v'];
    }
    console.log('Post Update input| postId: ', postId, 'Data: ', data);
    var update = {$set: data};
    var options = {new: true};
    return postModel.posting
        .findByIdAndUpdate(postId, data, options)
        .exec()
        .then(function (result) {
            console.log('update posting');
            return result;
        })
};