const User = require('mongoose').model('User');
const Problem = require('mongoose').model('Prob');
const Comment = require('mongoose').model('Comment');

function vote(req, res, amount) {

    if (req.user === undefined) {
        res.json("not logged!");
        return;
    }

    if(amount==-1){
        User.findById(req.user.id).then(user => {
            if(user.upvotes.indexOf(req.params.id)> -1){

                let index=user.upvotes.indexOf(req.params.id);
                user.upvotes.splice(index,1);
                user.save(err => {
                    if(err){
                        console.log(err.message);
                    }
                });
            }
        });
        User.update({ _id: req.user.id }, {
            $push:
                {
                    downvotes: req.params.id
                }
        }).exec();
    }
    else{
        User.findById(req.user.id).then(user => {
            if(user.downvotes.indexOf(req.params.id)> -1){
                let index=user.downvotes.indexOf(req.params.id);
                user.downvotes.splice(index,1);
                user.save(err => {
                    if(err){
                        console.log(err.message);
                    }
                });
            }
        });
        User.update({ _id: req.user.id }, {
            $push:
                {
                    upvotes: req.params.id
                }
        }).exec();
    }


    Problem.findOneAndUpdate({ _id: req.params.id }, { $inc: { points: amount } }, { new: true }, function (err, prob) {
        res.json(prob.points);
    });
}

module.exports = {
    createGet: (req, res) => {
        res.render('problem/create');
    },
    createPost: (req, res) => {
        let parts = req.body;
        let errorMsg = '';
        if (!req.isAuthenticated()) {
            errorMsg = 'Sorry you must be logged in!';
        }
        else if (!req.body.description) {
            errorMsg = 'Content is required';
        }
        else if (!req.files.image) {
            errorMsg = 'Picture is required';
        }
        if (errorMsg) {
            res.render('problem/create', {
                error: errorMsg
            });
            return;
        }
        parts.author = req.user.id;
        let image = req.files.image;

        let imageName = image.name;

        image.mv(`./public/${imageName}`, err => {
            if (err) {
                console.log(err.message);
            }
        });
        parts.points = 0;
        parts.picture = imageName;
        parts.lng = req.body.lng;
        parts.lat = req.body.lat;
        Problem.create(parts).then(problem => {
            req.user.problems.push(problem.id);
            req.user.save(err => {
                if (err) {
                    res.render('problem/create', {
                        error: err.message
                    });
                }
                else {
                    res.redirect('/');
                }
            })
        })

    },
    probleminfoGet: (req, res) => {
        Problem.find({}).populate('author').then(problems => {
            res.json(problems);
        })
    },
    listproblemsGet: (req, res) => {
        res.render('problem/listproblems');
    },
    detailsGet: (req, res) => {
        let id = req.params.id;

        Problem.findById(id).populate('comments').then(problem => {
            res.render('details', problem);
        });
    },
    detailsPost: (req, res) => {

        let com = {};
        com.author = req.user.id;
        com.points = 0;
        com.text = req.body.comment;
        com.post = req.params.id;
        Comment.create(com).then(com => {
            req.user.comments.push(com);
            Problem.update({ _id: req.params.id }, {
                $push:
                {
                    comments: com.id
                }
            }).then(res.redirect(`../details/${req.params.id}`));

        });


    },


    upvote: (req, res) => {
        if (req.user === undefined) {
            res.json("not logged!");
            return;
        }
        User.findById(req.user.id).then(user => {
            if (user.downvotes.indexOf(req.params.id) > -1) {
                let index = user.downvotes.indexOf(req.params.id);
                user.downvotes.splice(index, 1);
                user.save(err => {
                    if (err) {
                        console.log(err.message);
                    }
                });
                vote(req, res, 2);
            }
            else if (user.downvotes.indexOf(req.params.id) === -1 && user.upvotes.indexOf(req.params.id) === -1) {
                vote(req, res, 1);
            }
            else {
                vote(req, res, 0);
            }
            if (user.upvotes.indexOf(req.params.id) === -1) {
                User.update({ _id: req.user.id }, {
                    $push:
                    {
                        upvotes: req.params.id
                    }
                }).exec();
            }
        });
    },
    downvote: (req, res) => {
        if (req.user === undefined) {
            res.json("not logged!");
            return;
        }
        User.findById(req.user.id).then(user => {
            if (user.upvotes.indexOf(req.params.id) > -1) {
                let index = user.upvotes.indexOf(req.params.id);
                user.upvotes.splice(index, 1);
                user.save(err => {
                    if (err) {
                        console.log(err.message);
                    }
                });
                vote(req, res, -2);
            }
            else if (user.downvotes.indexOf(req.params.id) === -1 && user.upvotes.indexOf(req.params.id) === -1) {
                vote(req, res, -1);
            }
            else {
                vote(req, res, 0);
            }
            if (user.downvotes.indexOf(req.params.id) === -1) {
                User.update({ _id: req.user.id }, {
                    $push:
                    {
                        downvotes: req.params.id
                    }
                }).exec();
            }
        });
    },

    allproblemsGet: (req, res) => {
        Problem.find({}).sort({ points: 'desc' }).then(problems => {

            res.render('problem/allproblems', { problems });

        })
    }
};
