

var model = require('../../../../database').resSchema;


module.exports.handler = listResumesApiHandler;
module.exports.listResumes = listResumes;

function listResumesApiHandler(req, res) {
    console.log('/list/:id', req.params.id);
    listResumes(req.params.id, req.query)
        .then(function (result) {
            if (!result) {
                res.status(200).json({message: 'res list empty', data: [], totalLength: 0, result: true});
            }
            else {
                res.status(200)
                    .json({
                        message: 'res list retrieved',
                        data: result.data,
                        totalLength: result.totalLength,
                        result: true
                    });
            }
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({error: error, result: false})
        })
}


function listResumes(userId, options) {
    var selection = {ref_label: 1, userId: 1, template_ref: 1, is_core: 1, _kind: 1, createdAt:1, updatedAt:1, id:1};
    if(options){
        for(var prop in options){
            selection[prop] = options[prop];
        }
    }
    return model.core.find({userId: userId})
        .select(selection)
       // .select('ref_label userId template_ref is_core')
        .exec()
        .then(function (result) {
            console.log('resume list result', result);
            //  var returnResult = [];
            //   for( var i=0; i<result.resumes.length; i++){
            //       returnResult.push({ref_label: result.resumes[i].ref_label, _id: result.resumes[i]._id,  template_ref: result.resumes[i].template_ref, is_core: result.resumes[i].is_core})
            //  }
            return {data: result, totalLength: result.length};
        })


};

