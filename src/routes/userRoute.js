import express from "express";

import userController from "../controllers/userController";
import { checkUserJWT,checkUserPermission } from "../middleware/jwtCustom";

const router = express.Router();


router.all("*", checkUserJWT,checkUserPermission)
router.get('/:id',userController.handleGetDataUser); 
router.post("/login", userController.handleLogin);
router.post("/getDataUser", userController.handleGetDataUser);
router.post("/getCreateUser", userController.handleCreateUser);
router.delete("/deleteUser",userController.handleDeleteUser);
router.put("/edit/:attribute",userController.handleEditUser);
router.post("/search",userController.handleSearchUser);
module.exports = router;
