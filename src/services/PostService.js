import db from "../models/index";
import { where, Op } from "sequelize";
import { cloudinary } from "../utils/cloudinary";

const handleGetPostService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let post = await db.Post.findAll({
        include: [{
          model: db.User,
          attributes: ['idUser', 'userName', 'avatar']  
        }],
        raw: true,
        nest : true
      });
      
      // const result = post.map(row => {
      //   row.imgPost = "File IMG";
      //   // console.log(row["imgPost"]); 
        
      // })
      
      resolve(post);
    } catch (error) {
      reject(error);
    }
  });
};
const handleAddPostService = (idWhoPost,data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idWhoPost|| !data.content) {
        resolve({
          errCode: 2,
          message: "Missing data required",
        });
      } else {
        // let storageImg =
        //   `D:/Subject/LearnSomething/ReactJS/Test_React/Test4/node_practice/src/data/post/user${idWhoPost}/` +
        //   file.name;

        // file.mv(storageImg, (err) => {
        //   if (err) {
        //     console.log(err);
        //   }
        // });
       
        
        const storageImg = await cloudinary.uploader.upload(data.image,{
          folder : 'social_data',
        })
        console.log(storageImg);
        await db.Post.create({
          idWhoPost: idWhoPost,
          content: data.content,
          imgPost: storageImg.url,
          likeCount: 0,
          shareCount: 0,
          shareIdPost: null,
        });
        resolve({
          errCode: 0,
          message: "OK",
        });
      }
    } catch (error) {
      console.log(error);
      reject({
        errCode: 404,
        message: "Something wrong with connection",
      });
    }
  });
};

const handleUpdatePostService = async (data) => {
  try {
    return await new Promise(async (resolve, reject) => {
      try {
        let post = await db.Post.findOne({
          where: { idPost: data.idPost },
          raw: false,
        });
        if (post) {
          post.content = data.content;
          post.imgPost = data.imgPost;
          await post.save();
        } else {
          resolve("Something wrong with your post");
        }

        resolve({
          errCode: 0,
        });
      } catch (error) {
        reject({ error });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
const handleDeletePostService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let post = await db.Post.findOne({
        where: { idPost: data.idPost },
        raw: false,
      });
      if (post) {
        // post db.User.destroy({
        //   where: { idUser: id },
        // }); Second way
        await post.destroy();
      } else {
        resolve({
          errCode: 1,
          errMessage: `The user isn't exist`,
        });
      }
      resolve({
        errCode: 0,
        errMessage: `The user is deleted !`,
      });
    } catch (error) {
      reject(error);
    }
  });
};
export default {
  handleGetPostService,
  handleAddPostService,
  handleUpdatePostService,
  handleDeletePostService,
};
