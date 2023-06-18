import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
const router = express.Router();

const initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.post('/createUser', homeController.createUser);
    router.get('/getUser', homeController.getUser);
    router.get('/editUser', homeController.editUser);
    router.post('/putEditUser', homeController.putEditUser);
    router.get('/deleteUser', homeController.deleteUser);

    router.get('/api/login', userController.handleLogin)

    return app.use('/', router);
};

export default initWebRoutes;
