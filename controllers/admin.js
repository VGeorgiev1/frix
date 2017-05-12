const Unapproved = require('mongoose').model('Unapproved');
const User = require('mongoose').model('User');
const Role = require('mongoose').model('Role');
module.exports = {
    approveGet: (req, res) => {


        Role.find({ name: 'Unapproved' }).populate('users.').then(users => {
            let found = [];

            if(users[0].users.length==0){
                res.render('admin/approve');
                return;
            }
            users[0].users.forEach((user, idx) => {
                User.findById(user).then(user => {

                    found.push(user);
                    if (idx === users.length - 1) {
                        res.render('admin/approve', { users: found });
                    }
                })
            });
        });

    },
    approvePost: (req, res) => {
        Role.findOne({ name: 'Organisation' }).then(role => {

            role.users.push(req.params.id);
            role.save();
            User.update({ _id: req.params.id }, {
                $set: {
                    role: role.id
                }
            }).exec();
            Role.findOne({ name: 'Unapproved' }).then(role => {
                console.log(role);
                let index = role.users.indexOf(req.params.id);
                console.log(index);
                role.users.splice(index, 1);
                role.save();
            })
        });
        res.render("admin/approve");
    }

};
