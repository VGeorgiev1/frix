const Tags = require ('mongoose').model('Tags');

module.exports = {
    tagsInfoGet: (req, res) =>{
        Tags.find({}).then(tags => {
            res.render('problem/allproblems', {tags});
        })
    },
   
};