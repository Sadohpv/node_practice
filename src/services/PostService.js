import db from "../models/index";
import { where, Op } from "sequelize";

const handleGetPostService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let post = await db.Post.findAll({
        include:[ db.User ],
        raw: false,
      });
      resolve(post);
    } catch (error) {
      reject(error);
    }
  });
};
const handleAddPostService = (data,file) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.idWhoPost || !data.content) {
        resolve({
          errCode: 2,
          message: "Missing data required",
        });
      } else {
        await db.Post.create({
          idWhoPost: data.idWhoPost,
          content: data.content,
          imgPost: data.imgPost,
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
