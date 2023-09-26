// import db from "../models/index";
// import UserService from "../services/UserService";
import FriendService from "../services/FriendService";
const handleGetMutualFriend = async (req, res) => {
  
  let data = req.body;

    
  
  
    try {
     let reg = await FriendService.handleGetMutualFriendService(data);
    
    if (reg) {
        return res.status(200).json({
          message: "Post Get",
          reg,
        });
      } else {
        return res.status(400).json({
          errCode: 1,
          message: "Something wrong happen !!",
        });
      }
  } catch (e) {
    console.log(e);
  }

};

module.exports = {
    handleGetMutualFriend,

};
