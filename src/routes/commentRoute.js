import express from "express";

import commentController from "../controllers/commentController";
import { checkUserJWT,checkUserPermission } from "../middleware/jwtCustom";

const router = express.Router();


// router.all("*", checkUserJWT,checkUserPermission)
router.post('/checkLiked',commentController.handleCheckLikedComment);

router.put('/putUpdateLikeComment',commentController.handleUpdateLikedComment);
router.get('/tagFriend/:id',commentController.handleTagFriendComment);


module.exports = router;
