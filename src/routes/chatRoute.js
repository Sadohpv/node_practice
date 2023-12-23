import express from "express";

import chatController from "../controllers/chatController";
import { checkUserJWT,checkUserPermission } from "../middleware/jwtCustom";

const router = express.Router();


// router.all("*", checkUserJWT,checkUserPermission)
router.get('/getChat',chatController.handleGetChat);
router.post('/pushChat',chatController.handlePushChat);




module.exports = router;
