const Unapproved = require('mongoose').model('Unapproved');
const User=require('mongoose').model('User');
const Role=require('mongoose').model('Role');
module.exports = {
    approveGet: (req, res) => {
            
        Unapproved.find({}).populate('usersnot').then(users => {
            res.render("admin/approve", {users});
        })
    },
    approvePost: (req,res) => {
      Role.findOne({name : 'Organisation'}).then(role => {
            Role.findOne({name: 'User'}).then(rolee => {
               let index=rolee.users.indexOf(req.params.id);
               rolee.users.splice(index,1);
               rolee.save();

            });
            role.users.push(req.params.id);
            role.save();
          User.update({_id: req.params.id}, {
              $set: {
                  role:role.id
              }
          }).exec();

      });
       res.render("admin/approve");
    }

};
