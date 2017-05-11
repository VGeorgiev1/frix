const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let unapprovedSchema=mongoose.Schema({

    usersnot: {type: ObjectId, ref:'User'}

});

const Unapproved=mongoose.model('Unapproved',unapprovedSchema);


module.exports=Unapproved;
