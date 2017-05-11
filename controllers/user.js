const User = require('mongoose').model('User');
const Role=require('mongoose').model('Role');
const Unapproved=require('mongoose').model('Unapproved');



const encryption = require('./../utilities/encryption');

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },

    registerPost: (req, res) => {
        let registerArgs = req.body;
        if(req.body.regtype=="Organisation"){
            console.log("zdr");
           // Unapproved.create(user.id);
        }
        let filename="";
        let image=req.files.image;
        if(image){
            filename=req.body.email+'_'+image.name;
            image.mv(`./public/images/${filename}`, err => {
                if(err){
                    console.log(err.message);
                }
            });
        }
        else {
            filename="facebook-default-no-profile-pic.jpg";
        }
        User.findOne({ email: registerArgs.email }).then(user => {
            let errorMsg = '';
            if (user) {
                errorMsg = 'User with the same username exists!';
            } else if (registerArgs.password !== registerArgs.repeatedPassword) {
                errorMsg = 'Passwords do not match!'
            }

            if (errorMsg) {
                registerArgs.error = errorMsg;
                res.render('user/register', registerArgs)
            } else {

                let salt = encryption.generateSalt();
                let passwordHash = encryption.hashPassword(registerArgs.password, salt);
                Role.findOne({name: 'User'}).then(role => {

                    let userObject = {
                        email: registerArgs.email,
                        passwordHash: passwordHash,
                        fullName: registerArgs.fullName,
                        salt: salt,
                        role: role.id,
                        profpicture: `/images/${filename}`
                    };

                User.create(userObject).then(user => {

                    req.logIn(user, (err) => {
                        role.users.push(user.id);
                        role.save();
                        if(req.body.regtype=="Organisation"){
                            console.log(user.id);

                            let obj={
                                usersnot: user.id
                            };
                            Unapproved.create(obj);
                        }
                        if (err) {
                            registerArgs.error = err.message;
                            res.render('user/register', registerArgs);
                            return;
                        }
                        res.redirect('/')
                    })
                })
            })
            }
        })
    },
    detailsGet: (req, res) => {
        res.render('user/details');

    },

    loginGet: (req, res) => {
        res.render('user/login');
    },

    loginPost: (req, res) => {
        let loginArgs = req.body;
        User.findOne({ email: loginArgs.email }).then(user => {
            if (!user || !user.authenticate(loginArgs.password)) {
                let errorMsg = 'Either username or password is invalid!';
                loginArgs.error = errorMsg;
                res.render('user/login', loginArgs);
                return;
            }

            req.logIn(user, (err) => {
                if (err) {
                    console.log(err);
                    res.redirect('/user/login', { error: err.message });
                    return;
                }

                res.redirect('/');
            })
        })
    },

    logout: (req, res) => {
        req.logOut();
        res.redirect('/');
    },
    settingsGet: (req, res) => {
        if (req.user === undefined) {
            res.render('user/login');
            return;
        }
        User.findById(req.user.id).then(user => {
            res.render('user/settings', { lat: user.lat, lng: user.lng });
        });

    },

    settingsPost: (req, res) => {
        if (req.user === undefined) {
            res.render('user/login');
            return;
        }
        User.findOneAndUpdate({ _id: req.user.id }, { $set: { lat: req.body.lat, lng: req.body.lng } }, { new: true }, function (err, user) {
            res.render('user/settings', { lat: user.lat, lng: user.lng });
        });
    }

};
