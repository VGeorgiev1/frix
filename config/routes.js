const userController = require('./../controllers/user');
const homeController = require('./../controllers/home');
const problemController = require('./../controllers/problems');
const tagsController = require('./../controllers/tags')
module.exports = (app) => {

    app.get('/', homeController.index);

    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);

    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);

    app.get('/user/logout', userController.logout);

    app.get('/problem/create/', problemController.createGet);
    app.post('/problem/create', problemController.createPost);

    app.get('/problem/probleminfo', problemController.probleminfoGet);

    app.get('/tags/tagsinfo', tagsController.tagsInfoGet);
    
    app.get('/details/:id', problemController.detailsGet);
    app.post('/details/:id',problemController.detailsPost);


};

