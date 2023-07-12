import UserService from "../services/UserService";
var jwt = require("jsonwebtoken");
import "dotenv";
const handleMissingData = (data) => {
  data.errCode = 4;
  data.errMessage = "Missing data! Make sure you fill email and password";
  return data;
};

const handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  // Check email and password
  if (!email || !password) {
    let userData = {};
    handleMissingData(userData);
    return res.status(200).json({
      userData,
    });
  }

  // compare password
  let userData = await UserService.handlelUserLoginService(email, password);

  //Create JWT
  const accessToken = jwt.sign(
    { userData: userData.email },
    process.env.ACCESS_TOKEN
  );

  // return userInfor
  return res.status(200).json({
    userData,
    accessToken,
  });
};

const handleGetDataUser = async (req, res) => {
 
  //let id = req.query.id;
  // let id = req.body.id;
  let id =req.params.id;

  let reg = await UserService.getDataUserService(id);
  
  console.log(reg);
  return res.status(200).json({
      errCode: 0,
      errCodeMessage: "Check read data user",
      reg,
  });
};

const handleCreateUser = async (req, res) =>{

    let reg = await UserService.createUserService(req.body);

    return res.status(200).json({
      errCode: reg.errCode,
      errCodeMessage : reg.message,
      reg,
     
    });
};

const handleDeleteUser = async (req,res)=>{
  if(!req.body.idUser) {
    return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parameters !"
    })
  }
  let message = await UserService.deleteUserService(req.body.idUser);
  return res.status(200).json(message);
};

const handleEditUser = async (req,res)=>{

};

export default {
  handleLogin,
  handleGetDataUser,
  handleCreateUser,
  handleDeleteUser,
  handleEditUser,
};
