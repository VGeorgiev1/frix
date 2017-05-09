const User = require('mongoose').model('User');
const Problem = require('mongoose').model('Prob');

module.exports={
    createGet: (req,res)=>{
        res.render('problem/create');
    },
    createPost: (req,res) => {
        let problemParts=req.body;

        let errorMsg='';
        if(!req.isAuthenticated()){
            errorMsg='Sorry you must be logged in!';
        }
        else if(!problemParts.content){
            errorMsg='Content is required';
        }
        else if(!problemParts.files.image){
            errorMsg='Picture is required';
        }
        if(errorMsg){
            res.render('problem/create',{
                error: errorMsg
            });
            return;
        }
        problemParts.author=req.user.id;
        let image=req.files.image;

            let imageName=image.name;

            image.mv(`./public/images/${imageName}`, err => {
                if(err){
                    console.log(err.message);
                }
            });
        problemParts.points=0;

        Problem.create(problemParts).then(problem => {
                req.user.problems.push(problem.id);
                req.user.save(err => {
                    if(err){
                        res.render('problem/create', {
                            error: err.message
                        });
                    }
                    else{
                        res.redirect('/');
                    }
           })
        })

    }
};
