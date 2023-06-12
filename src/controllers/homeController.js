import db from "../models/index";
import UserService from '../services/UserService'
const getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
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
const createUser = async (req, res) => {
  await UserService.createUserService(req.body);
  return res.send('Check your console to know your data');
};
const getUser = async (req, res)=>{
    let data = await UserService.getAllUser();
  
  return res.render('Home/getUser.ejs',{dataUsers: data});

}
module.exports = {
  getHomePage,
  getAboutPage,
  createUser,
  getUser
};
