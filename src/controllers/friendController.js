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
const handleIsFriend = async (req, res) => {
  let data = req.body;
  // console.log(data);
  try {
    let reg = await FriendService.handleIsFriendService(
      data.userPage,
      data.owner
    );

    if (reg) {
      return res.status(200).json({
        message: "Check Is Friend !!",
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
const handleAddFriendResponse = async (req, res) => {
  let data = req.body;
  if (data && data.idUser) {
    try {
      let reg = await FriendService.handleAddFriendResponseService(data.idUser);

      if (reg) {
        return res.status(200).json({
          message: "Check Friend Response !!",
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
  } else {
    return res.status(400).json({
      errCode: 1,
      message: "Something wrong happen !!",
    });
  }
};
const handleAddFriendAnswer = async (req, res) => {
  let data = req.body;
  // console.log(data);
  if (data) {
    try {
      let reg = await FriendService.handleAddFriendAnswerService(data);

      if (reg) {
        return res.status(200).json({
          message: "Check Friend Answer !!",
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
  } else {
    return res.status(400).json({
      errCode: 1,
      message: "Something wrong happen !!",
    });
  }
};
const handleAddFriendRequest = async (req, res) => {
  let data = req.body;
  if (data && data.idUser) {
    try {
      let reg = await FriendService.handleAddFriendRequestService(data.idUser);

      if (reg) {
        return res.status(200).json({
          message: "Check Friend Answer !!",
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
  } else {
    return res.status(400).json({
      errCode: 1,
      message: "Something wrong happen !!",
    });
  }
};

module.exports = {
  handleGetMutualFriend,
  handleUnfriend,
  handleAddFriend,
  handleCancelRequest,
  handleIsFriend,
  handleAddFriendResponse,
  handleAddFriendAnswer,
  handleAddFriendRequest,
};
