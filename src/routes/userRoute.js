import express from "express";

import userController from "../controllers/userController";

const router = express.Router();
router.get('/:id',userController.handleGetDataUser); 
router.post("/login", userController.handleLogin);
router.post("/getDataUser", userController.handleGetDataUser);

module.exports = router;
