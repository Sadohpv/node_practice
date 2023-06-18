import UserService from "../services/UserService";

const handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;


  // Check email and password
  if(!email || !password) {
      return res.status(500).json({
        errCode : 1,
        message : 'Missing data',
      });
  };  

  let userData = await UserService.handlelUserLoginService(email, password);

  // compare password

  
  // return userInfor



  return res.status(200).json({
   
    errCode: userData.error,
    message: userData.errMessage,
    userData,
  });
};

export default {
  handleLogin,
};
