import PostService from "../services/PostService";
import path from "path";
var jwt = require("jsonwebtoken");
import "dotenv";
const handleGetPost = async (req, res) => {
  let data = req.params;
  let reg = await PostService.handleGetPostService(data.check,data.page);
 
  
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
const handleGetOnePost = async (req,res)=>{
  let data = req.body;
  // console.log(data);
  if(data){
    let reg = await PostService.handleGetOnePostService(data.idPost,data.owner);
    return res.status(200).json({
      errCode: 0,
      message: "Post One",
      reg,
    });
  }

  return res.status(200).json({
    errCode: 5,
    message: "Something Wrong !",
    
  });
}
const handleGetComment = async (req,res)=>{
  let data=req.params;
  // console.log(data);
  if(data){
    let reg = await PostService.handleGetCommentService(data.idPost,+data.page);
    return res.status(200).json({
      errCode: 0,
      message: "Get Comment !",
      reg,
    });
  }
  return res.status(200).json({
    errCode: 5,
    message: "Get Comment !",
    
  });
};
const handlePushComment = async (req,res)=>{
  let data=req.body;
  if(data){
   
    if(data.idWhoComment !== undefined & data.idPostComment !== undefined & data.content !== undefined){
      let reg = await PostService.handlePushCommentService(data);

      if(reg === true){
        return res.status(200).json({
          errCode: 0,
          message: "Push Comment !",
         
        });
      }else{
        return res.status(400).json({
          errCode: 2,
          message: "Push Comment Fail !",
        
        });
      }

      
    }else{
      return res.status(400).json({
        errCode: 1,
        message: "Missing Data !",
     
      });
    }
  }else{
    return res.status(400).json({
      errCode: 5,
      message: "Something Wrong !",
      
    });
  }
};
const handleSavePost = async (req,res)=>{
  let data=req.body;
  // console.log(data);
  if(data){
   
    if(data.idUser !== undefined & data.idPostSave !== undefined){
      let reg = await PostService.handleSavePostService(data.idUser,data.idPostSave);

      if(reg === true){
        return res.status(200).json({
          errCode: 0,
          message: "Save Post !",
         
        });
      }else if(reg===null){
        return res.status(200).json({
          errCode: 3,
          message: "Post has been save !",
         
        });
      }
      else{
        return res.status(400).json({
          errCode: 2,
          message: "Save Post Fail !",
        
        });
      }

      
    }else{
      return res.status(400).json({
        errCode: 1,
        message: "Missing Data !",
     
      });
    }
  }else{
    return res.status(400).json({
      errCode: 5,
      message: "Something Wrong !",
      
    });
  }
};
export default {
  handleGetPost,
  handleAddPost,
  handleUpdatePost,
  handleDeletePost,
  handleLikedPost,
  handleCheckLike,
  handleGetOwnerPost,
  handleGetOnePost,
  handleGetComment,
  handlePushComment,
  handleSavePost
};
