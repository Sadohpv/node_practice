import express from "express";

import userController from "../controllers/userController";
import { checkUserJWT,checkUserPermission } from "../middleware/jwtCustom";

const router = express.Router();


router.all("*", checkUserJWT,checkUserPermission)
router.get('/account',userController.handleGetAccount);
router.post("/login", userController.handleLogin);
router.post("/getDataUser", userController.handleGetDataUser);
router.post("/getCreateUser", userController.handleCreateUser);
router.delete("/deleteUser",userController.handleDeleteUser);
router.put("/edit/:attribute",userController.handleEditUser);
router.post("/search",userController.handleSearchUser);
router.get('/friend/getFriend/:id',userController.handleGetAllFriend);
router.get('/:id',userController.handleGetDataUser); 
module.exports = router;
