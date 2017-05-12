const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let problemSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    picture: { type: String, required: true },
    points: { type: Number },
    author: { type: ObjectId, required: true, ref: 'User' },
    date: { type: Date, default: Date.now() },
    formattedDate: { type: String, required: true },
    lat: { type: Number },
    lng: { type: Number },
    comments: [{ type: ObjectId, ref: 'Comment' }],
    tag: { type: String },
    solutions: [{
        title: String,
        description: String,
        picture: String,
        points: Number,
        author: { type: ObjectId, required: true, ref: 'User' },
        date: { type: Date, default: Date.now() },
        formattedDate: { type: String, required: true },
        comments: [{ type: ObjectId, ref: 'Comment' }],
    }]
});
const Problem = mongoose.model('Prob', problemSchema);

module.exports = Problem;