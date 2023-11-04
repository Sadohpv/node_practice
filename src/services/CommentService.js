
import db from "../models/index";

const handleCheckLikedService = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let like = await db.LikeComment.findAll({
        attributes: ['idCommentLike'],
        where: {
          idUserLikeComment: id,
          liked: 1,
        },
        raw: true,
        nest: true,
      });
      const result = [];
      if(like){
        like.map((item)=>{
            result.push(item.idCommentLike);
        })
        resolve(result);
      }
      
    } catch (error) {
      reject(error);
    }
  });
};
const handleUpdateLikedCommentService = async(data)=>{
  return new Promise(async (resolve, reject) => {
    try {
      let comment = await db.Comment.findOne({
        // attributes: ['idCommentLike'],
        where: {
          id: data.idCom,
          
        },
        raw: false,
        // nest: true,
      });
    //  console.log(comment);
     if(comment !== null & comment !== undefined){
        // console.log(data.option)
        if(data.option == true){
        
          await db.LikeComment.create({
            idCommentLike : data.idCom,
            idUserLikeComment : data.idUser,
            liked : 1,
          });
          // console.log("Here ")
          comment.likeComment += 1;  
          await comment.save();
          resolve({
            EC : 0
          })
        }else{
          let deleteCom = await db.LikeComment.findOne({
            where: {
              idCommentLike: data.idCom,
              
            },
            raw: false,
          });
          if(deleteCom){
            await deleteCom.destroy();
          }
          comment.likeComment =  comment.likeComment -1 ;
          await comment.save();
          resolve({
            EC : 0
          })
        }
        
     }else{
      resolve({
        EC : 1
      })
     }
      // if(like){
      //   like.
      //   resolve(result);
      // }
      
    } catch (error) {
      reject(error);
    }
  });
}
export default {
  handleCheckLikedService,
  handleUpdateLikedCommentService
};
