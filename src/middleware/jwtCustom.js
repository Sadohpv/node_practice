import jwt, { decode } from "jsonwebtoken";
import "dotenv/config";

const jwtCustom = (payload) => {
  let token;
  try {
    token = jwt.sign(payload, process.env.ACCESS_TOKEN);
  } catch (err) {
    console.log(err);
  }
  return token;
};

const verifyToken = (token) => {
  let data = null;
  try {
    let decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    return decoded;
  } catch (err) {
    console.log(err);
  }
  return data;
};

const noneSecurePaths = ["/login","/getCreateUser"];

const checkUserJWT = (req, res, next) => {
  
  if(noneSecurePaths.includes(req.path)){
    return next();
  }
  
  let cookies = req.cookies;
  // console.log(cookies);
  

  // console.log(cookies);
  if (cookies && cookies.token) {
    let token = cookies.token;
    let decoded = verifyToken(token);
    
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: " Not authenticated the user",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: " Not authenticated the user",
    });
  }
};
const checkUserPermission = (req,res,next)=>{
  if(noneSecurePaths.includes(req.path)){
    return next();
  }
  console.log(req.user);
  return next();
}
export { jwtCustom, verifyToken, checkUserJWT,checkUserPermission };
