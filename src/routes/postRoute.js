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
router.post('/onePost',postController.handleGetOnePost);
router.get('/comment/:idPost',postController.handleGetComment);
router.post('/pushComment',postController.handlePushComment);

module.exports = router;
