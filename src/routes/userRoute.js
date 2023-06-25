import express from "express";

import userController from "../controllers/userController";

const router = express.Router();
router.get('/:id',userController.handleGetDataUser); 
router.post("/login", userController.handleLogin);
router.post("/getDataUser", userController.handleGetDataUser);
router.post("/getCreateUser", userController.handleCreateUser);

module.exports = router;
