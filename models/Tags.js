const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let tagsSchema = mongoose.Schema({
        title: {type: String},
        description: {type: String},
        picture: {type: String}
});

const Tags = mongoose.model('Tags', tagsSchema);

module.exports = Tags;