import express from "express";
import homeController from "../controllers/homeController";
import userRouter from './userRoute'
import postRouter from './postRoute'
import friendRouter from './friendRoute'
import commentRouter from './commentRoute'
import notifyRouter from "./notifyRoute"
import chatRouter from "./chatRoute"
const router = express.Router();

const initWebRoutes = (app) => {

    // router.get('/', homeController.getHomePage);
    // router.get('/about', homeController.getAboutPage);
    // router.post('/createUser', homeController.createUser);
    // router.get('/getUser', homeController.getUser);
    // router.get('/editUser', homeController.editUser);
    // router.post('/putEditUser', homeController.putEditUser);
    // router.get('/deleteUser', homeController.deleteUser);
    router.get('/roles',homeController.checkRoles);
    app.use('/api',userRouter);
    app.use('/post',postRouter);
    app.use('/friend',friendRouter);
    app.use('/comment',commentRouter);
    app.use('/notify',notifyRouter);
    app.use('/chat',chatRouter);


    return app.use('/', router);
};

export default initWebRoutes;
