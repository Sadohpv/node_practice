import UserService from "../services/UserService";

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

  // return userInfor
  return res.status(200).json({
    userData,
  });
};

export default {
  handleLogin,
};
