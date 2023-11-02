import express from "express";

import friendController from "../controllers/friendController";
import { checkUserJWT,checkUserPermission } from "../middleware/jwtCustom";

const router = express.Router();


// router.all("*", checkUserJWT,checkUserPermission)
router.post('/mutual',friendController.handleGetMutualFriend);

router.post('/unfriend',friendController.handleUnfriend);
router.post('/addFriend',friendController.handleAddFriend);
router.post('/cancelAddFriend',friendController.handleCancelRequest);
router.post('/isFriend',friendController.handleIsFriend);
router.post('/addFriendResponse',friendController.handleAddFriendResponse);
router.post('/addNumberFriendResponse',friendController.handleNumberAddFriendResponse);

router.post('/addFriendAnswer',friendController.handleAddFriendAnswer);
router.post('/addFriendRequest',friendController.handleAddFriendRequest);

module.exports = router;
