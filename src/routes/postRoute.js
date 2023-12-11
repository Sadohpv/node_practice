import express from "express";

import postController from "../controllers/postController";
import { checkUserJWT } from "../middleware/jwtCustom";
const router = express.Router();




router.get('/getPost/:check/:page',postController.handleGetPost); 
router.post('/addPost',postController.handleAddPost); 
router.put('/putPost',postController.handleUpdatePost);
router.delete('/deletePost',postController.handleDeletePost);
router.put('/likedPost',postController.handleLikedPost);
// router.get('/likedPost/:check',postController.handleCheckLike);
router.post('/ownerPost',postController.handleGetOwnerPost);
router.post('/ownerPhoto',postController.handleGetOwnerPhoto);

router.post('/onePost',postController.handleGetOnePost);
router.get('/comment/:idPost/:page',postController.handleGetComment);
router.post('/pushComment',postController.handlePushComment);
router.post('/savePost',postController.handleSavePost);
router.get('/savedPost/:idUser',postController.handleGetSavedPost);



module.exports = router;
