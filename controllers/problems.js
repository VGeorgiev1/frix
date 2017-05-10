const User = require('mongoose').model('User');
const Problem = require('mongoose').model('Prob');

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
    detailsGet: (req, res)=>{
        let id = req.params.id;

        Problem.findById(id).then(problem => {
            res.render('details', problem);
        });
    },
    detailsPost: (req,res)=> {




    }
};
