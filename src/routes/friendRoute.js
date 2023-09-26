import express from "express";

import friendController from "../controllers/friendController";
import { checkUserJWT,checkUserPermission } from "../middleware/jwtCustom";

const router = express.Router();


// router.all("*", checkUserJWT,checkUserPermission)
router.post('/mutual',friendController.handleGetMutualFriend);

module.exports = router;
