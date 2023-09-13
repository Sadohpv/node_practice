import db from "../models/index";
import UserService from "../services/UserService";
const getHomePage = async (req, res) => {
  try {
    let data = await db.Post.findAll();
    return res.render("Home/homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

const getAboutPage = (req, res) => {
  return res.render("Home/about.ejs");
};
const getUser = async (req, res) => {
  let data = await UserService.getAllUser();

  return res.render("Home/getUser.ejs", { dataUsers: data });
};
const createUser = async (req, res) => {
  await UserService.createUserService(req.body);
  return res.send("Check your console to know your data");
};
const editUser = async (req, res) => {
  let userID = req.query.id;
  if (userID) {
    let userData = await UserService.getUserInfo(userID);

    return res.render("Home/editUser.ejs", { userEditData: userData });
  } else {
    return res.send("Error: No user");
  }
};
const putEditUser = async (req, res) => {
  let data = req.body;
  let allUser = await UserService.updateUserService(data);
  return res.render("Home/getUser.ejs", { dataUsers: allUser });
};

const deleteUser = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await UserService.deleteUserService(id);
    return res.send("Delete Success");
  }else {
    return res.send("User Not Found");

  }

};
const checkRoles = async (req, res) => {
  let data = req.body.id;
    let reg = await UserService.checkRoleService(data);
    return res.status(200).json({
      reg: reg,
    });
 

};
module.exports = {
  getHomePage,
  getAboutPage,
  createUser,
  getUser,
  editUser,
  putEditUser,
  deleteUser,
  checkRoles
};
