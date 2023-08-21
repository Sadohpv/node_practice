import express from "express";

import postController from "../controllers/postController";

const router = express.Router();
router.get('/getPost',postController.handleGetPost); 
router.post('/addPost',postController.handleAddPost); 
router.put('/putPost',postController.handleUpdatePost);
router.delete('/deletePost',postController.handleDeletePost);
module.exports = router;
