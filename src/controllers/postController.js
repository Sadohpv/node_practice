import PostService from "../services/PostService";
import path from "path";
const handleGetPost = async (req, res) => {
  let reg = await PostService.handleGetPostService();
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
  const file = req.files;
  const data = req.body;
  // let storageImg =  'D:/Subject/LearnSomething/ReactJS/Test_React/Test4/node_practice/src/data/post/user4/' + file.name;

  // file.mv(storageImg,(err)=>{
  //   if(err){
  //     console.log(err);
  //   }
  // })

  console.log(data.content);
  console.log(file.image);
 
  // if (data) {
  //   let reg = await PostService.handleAddPostService(data,file);
  //   if (reg) {
  //     return res.status(200).json({
  //       errCode: 0,
  //       message: "Add Post Success",
  //       reg,
  //     });
  //   }else{
  //     return res.status(200).json({
  //       errCode: 5,
  //       message: "Somgthing Wrong",
  //       data,
  //     });
  //   }
  // }
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
export default {
  handleGetPost,
  handleAddPost,
  handleUpdatePost,
  handleDeletePost
};
