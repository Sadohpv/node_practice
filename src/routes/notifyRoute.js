import express from "express";

import notifyController from "../controllers/notifyController";
import { checkUserJWT,checkUserPermission } from "../middleware/jwtCustom";

const router = express.Router();


// router.all("*", checkUserJWT,checkUserPermission)
router.get('/allNotify/:id',notifyController.handleGetNotify);
router.get('/readNotify/:id',notifyController.handleReadNotify);
router.get('/numberNoRead/:id',notifyController.handleNumberNoReadNotify);


module.exports = router;
