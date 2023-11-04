// import db from "../models/index";
import CommentService from "../services/CommentService";
const handleCheckLikedComment = async (req, res) => {
  const data =req.body;

    try {
    let reg = await CommentService.handleCheckLikedService(data.idUser);
    return res.status(200).json({
        message:"here",
        EC:0,
        reg
    })
  } catch (e) {
    console.log(e);
  }

};
const handleUpdateLikedComment = async (req,res)=>{
  const data =req.body;
  console.log(data);
  if(data){
  try {
  let reg = await CommentService.handleUpdateLikedCommentService(data);
  if(reg.EC === 0){
    return res.status(200).json({
      message:"Update Comment",
      EC:0,
      
  })
  }else{
    return res.status(200).json({
      message:"Not Found That Comment",
      EC:1,
      
  })
  }
 
} catch (e) {
  console.log(e);
}
  }

};

module.exports = {
  handleCheckLikedComment,
  handleUpdateLikedComment
};
