import PostService from "../services/PostService";
import path from "path";
var jwt = require("jsonwebtoken");
import "dotenv";
const handleGetPost = async (req, res) => {
  let data = req.params;
  let reg = await PostService.handleGetPostService(data.check);
 
  
  // console.log(reg);
 
  if (reg) {
    return res.status(200).json({
      message: "Post Get",
      reg,
    });
  } else {
    return res.status(200).json({
      errCode: 1,
      message: "Something wrong happen !!",
    });
  }
};
const handleAddPost = async (req, res) => {
  // const file = req.files.image;
  const data = req.body;
  
  let userId =req.body.userId;
  // console.log(data,userId);
  if (data && userId) {
    let reg = await PostService.handleAddPostService(userId,data);
    if (reg) {

      return res.status(200).json({
        errCode: 0,
        message: "Add Post Success",
        reg,
      });
    }else{
      return res.status(200).json({
        errCode: 5,
        message: "Somgthing Wrong",
        
      });
    }
  }
  return res.status(200).json({
          errCode: 0,
          message: "Sending",
       
        });
};
const handleUpdatePost = async (req,res)=>{
  let data = req.body;

  if (data) {
    let reg = await PostService.handleUpdatePostService(data);
    if (reg) {
      return res.status(200).json({
        errCode: 0,
        message: "Update Post",
        reg,
      });
    }else{
      return res.status(200).json({
        errCode: 5,
        message: "Somgthing Wrong",
        data,
      });
    }
  }
};
const handleDeletePost =  async (req,res)=>{
  let data = req.body;

  if (data) {
    let reg = await PostService.handleDeletePostService(data);
    if (reg) {
      return res.status(200).json({
        errCode: 0,
        message: "Delete Post",
        reg,
      });
    }else{
      return res.status(200).json({
        errCode: 5,
        message: "Somgthing Wrong",
        data,
      });
    }
  }
};
const handleLikedPost =   async (req, res)=>{
  let data = req.body;
  // console.log(data);
  if(data){
    let reg = await PostService.handleLikedPostService(data);
    return res.status(200).json({
      errCode: 0,
      message: "Change Liked",
      reg,
    });
  }

  return res.status(200).json({
    errCode: 5,
    message: "Something Wrong !",
    
  });
}
const handleCheckLike =  async (req, res)=>{
  let data = req.params;
  // console.log(data);
  if(data){
    // let reg = await PostService.handleCheckLikeService(data);
    return res.status(200).json({
      errCode: 0,
      message: "Check Liked",
      reg,
    });
  }

  return res.status(200).json({
    errCode: 5,
    message: "Something Wrong !",
    
  });
}
const handleGetOwnerPost = async (req,res)=>{
  let data = req.body;
  // console.log(data);
  if(data){
    let reg = await PostService.handleGetOwnerPostService(data);
    return res.status(200).json({
      errCode: 0,
      message: "Post Owner",
      reg,
    });
  }

  return res.status(200).json({
    errCode: 5,
    message: "Something Wrong !",
    
  });
};
export default {
  handleGetPost,
  handleAddPost,
  handleUpdatePost,
  handleDeletePost,
  handleLikedPost,
  handleCheckLike,
  handleGetOwnerPost
};
