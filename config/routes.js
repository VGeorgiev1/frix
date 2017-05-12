const userController = require('./../controllers/user');
const homeController = require('./../controllers/home');
const problemController = require('./../controllers/problems');
const tagsController = require('./../controllers/tags');
const adminController = require('./../controllers/admin');
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


    app.get('/details/:id', problemController.detailsGet);
    app.post('/details/:id', problemController.detailsPost);

    app.post("/upvote/:id", problemController.upvote);
    app.post("/downvote/:id", problemController.downvote);
    app.post("/resetvote/:id", problemController.resetvote);

    app.get("/allproblems", problemController.allproblemsGet);

    app.get("/user/details", userController.detailsGet);

    app.get("/admin/approve", adminController.approveGet);
    app.post("/admin/approve/:id", adminController.approvePost);

    app.get("/user/settings", userController.settingsGet);
    app.post("/user/settings", userController.settingsPost);
    app.post("/allproblems/sorted", problemController.sortedPost);

    app.get('/problem/solution/:id', problemController.addSolutionGet);
    app.post('/problem/solution/:id', problemController.addSolutionPost);
};