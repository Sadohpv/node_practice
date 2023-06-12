import express from "express";
import homeController from "../controllers/homeController";

const router = express.Router();

const initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.post('/createUser', homeController.createUser);
    router.get('/getUser', homeController.getUser);
    return app.use('/', router);
};

export default initWebRoutes;