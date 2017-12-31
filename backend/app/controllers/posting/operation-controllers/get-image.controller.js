
var image = require('../../../../database').postingSchema.image;


module.exports = function getImage(imageId) {
    console.log(imageId);
    var imageQuery = image.findById(imageId);
    return imageQuery.exec();
};

