import express from "express";

import postController from "../controllers/postController";
import { checkUserJWT } from "../middleware/jwtCustom";
const router = express.Router();




router.get('/getPost/:check',postController.handleGetPost); 
router.post('/addPost',postController.handleAddPost); 
router.put('/putPost',postController.handleUpdatePost);
router.delete('/deletePost',postController.handleDeletePost);
router.put('/likedPost',postController.handleLikedPost);
// router.get('/likedPost/:check',postController.handleCheckLike);
router.post('/ownerPost',postController.handleGetOwnerPost);
module.exports = router;
