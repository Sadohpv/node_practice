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
const handleUnfriend = async (req, res) => {
  let data = req.body;
  // console.log(data);
  try {
    let reg = await FriendService.handleUnfriendService(data);

    if (reg) {
      return res.status(200).json({
        message: "Post Unfriend",
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
const handleAddFriend = async (req, res) => {
  let data = req.body;
  // console.log(data);
  try {
    let reg = await FriendService.handleAddFriendService(data);

    if (reg) {
      return res.status(200).json({
        message: "Post Addfriend",
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
const handleCancelRequest = async (req, res) => {
  let data = req.body;
  try {
    let reg = await FriendService.handleCancelRequestService(data);

    if (reg) {
      return res.status(200).json({
        message: "Cancel Addfriend Request",
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
  handleUnfriend,
  handleAddFriend,
  handleCancelRequest,
};
