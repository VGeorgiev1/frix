const mongoose = require('mongoose');
const encryption = require('./../utilities/encryption');
const ObjectId = mongoose.Schema.Types.ObjectId;

let userSchema = mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        passwordHash: {type: String, required: true},
        fullName: {type: String, required: true},
        salt: {type: String, required: true},
        problems: [{type: ObjectId, ref: 'Problem'}],
        comments: [{type: ObjectId, ref:'Comment'}],
        upvotes: [{type: ObjectId, ref:'Problem'}],
        downvotes: [{type: ObjectId, ref:'Problem'}],
        description: {type:String},
        lat: {type:Number},
        lng: {type: Number},
        role: {type: ObjectId, ref: 'Role'},
        profpicture: {type: String}
    }
);

userSchema.method ({
   authenticate: function (password) {
       let inputPasswordHash = encryption.hashPassword(password, this.salt);
       let isSamePasswordHash = inputPasswordHash === this.passwordHash;

       return isSamePasswordHash;
   }
});

const User = mongoose.model('User', userSchema);
const Role=require('mongoose').model('Role');

module.exports = User;

module.exports.initialize= () => {

    let email='admin@mysite.com';
    User.findOne({email: email}).then(admin =>{

        Role.findOne({name: 'Admin'}).then(role => {
            if(!role)
            {
                return;
            }
            let salt = encryption.generateSalt();
            let passwordHash = encryption.hashPassword('admin123456', salt);

            let adminUser={
                email: email,
                fullName: 'Admin',
                role: role.id,
                salt: salt,
                passwordHash: passwordHash
            };
            User.create(adminUser).then(user => {
                role.users.push(user.id);
                role.save();
            });
        })
    })

};



