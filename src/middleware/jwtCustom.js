import  jwt  from "jsonwebtoken";
import 'dotenv/config';

const jwtCustom = (payload) =>{
    let token;
    try{
        token = jwt.sign(payload,process.env.ACCESS_TOKEN);

    }catch(err){
        console.log(err);
    }
    return token;
}

const verifyToken = (token)=>{
    let data = null;
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, decoded) {
        if(err){
            console.log(err);
            return data;
        }
        return decoded;
      });
}

export {

    jwtCustom,
    verifyToken
};