const mongoose = require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId;


let problemSchema = mongoose.Schema({
        title: {type: String, required: true},
        description: {type: String, required: true},
        picture: {type: String, required: true},
        points: {type: Number},
        author: {type: ObjectId, required: true, ref: 'User'},
        date: {type: Date, default:Date.now()},

    });
const Problem=mongoose.model('Prob', problemSchema);

module.exports=Problem;