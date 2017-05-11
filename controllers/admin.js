const Unapproved = require('mongoose').model('Unapproved');

module.exports = {
    approveGet: (req, res) => {

            Unapproved.find({}).populate('usersnot').then(users => {

                console.log(users);
                res.render("admin/approve", {users});
            })


    }
};
