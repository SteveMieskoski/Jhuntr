var mongoose = require('mongoose');

var CssSchema = new mongoose.Schema({
    "alt_id": {type: String, default: ''},
    "core_template": {type: String, default: ''}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Css', CssSchema, 'Css');