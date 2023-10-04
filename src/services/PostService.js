import db from "../models/index";
import { where, Op } from "sequelize";
import { cloudinary } from "../utils/cloudinary";

const handleGetPostService = (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let post = await db.Post.findAll({
        include: [
          {
            model: db.User,
            attributes: ["idUser", "userName", "avatar"],
          },
        ],
        raw: true,
        nest: true, // group include model into 1 object
      });

      // const result = post.map(row => {
      //   row.imgPost = "File IMG";
      //   // console.log(row["imgPost"]);

      // })
      const liked = await handleCheckLikeService(idUser);
      post.map((p) => {
        if (liked.includes(p.idPost)) {
          p.userLiked = true;
        } else {
          p.userLiked = false;
        }
      });
      // console.log(post);
      resolve(post);
    } catch (error) {
      reject(error);
    }
  });
};
const handleAddPostService = (idWhoPost, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idWhoPost || !data.content) {
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

        const storageImg = await cloudinary.uploader.upload(data.image, {
          folder: "social_data",
        });
        // console.log(storageImg);
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

const handleLikedPostService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let likedPost = await db.LikePost.findOne({
        where: { idPostLiked: data.idPost, idUserLikePost: data.idUser },
        raw: false,
      });
      if (likedPost) {
        if (data.liked === false) {
          likedPost.liked = 0;
          await likedPost.save();
          handleLikeNumber(data.idPost, -1);

          resolve({
            errCode: 0,
            message: "UnLike",
          });
        } else {
          likedPost.liked = 1;
          handleLikeNumber(data.idPost, 1);
          await likedPost.save();
          resolve({
            errCode: 0,
            message: "Like",
          });
        }
      }else if (likedPost === null) {
        if (data.liked === true) {
          await db.LikePost.create({
            idPostLiked: data.idPost,
            idUserLikePost: data.idUser,
            liked: 1,
          });
          handleLikeNumber(data.idPost, 1);

          resolve({
            errCode: 0,
            message: "Like",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const handleCheckLikeService = async (data) => {
  let likedPost = await db.LikePost.findAll({
    where: {
      idUserLikePost: data,
      liked: 1,
    },
    attributes: ["idPostLiked"],

    raw: true,
  });
  let result = [];
  likedPost.map((p) => {
    result.push(p.idPostLiked);
  });
  // const result = Object.values(likedPost);

  return result;
};
const handleLikeNumber = async (id, number) => {
  let post = await db.Post.findOne({
    where: {
      idPost: id,
    },
    raw: false,
  });
  // console.log(post);
  if (post) {
    post.likeCount += number;
    await post.save();
    return true;
  }
  return true;
};
const handleGetOwnerPostService = async (data)=>{
  return new Promise(async (resolve, reject) => {
    try {
      let post = await db.Post.findAll({
        include: [
          {
            model: db.User,
            attributes: ["idUser", "userName", "avatar"],
          },
        ],
        where:{
          idWhoPost : data.userPage,
        },
        raw: true,
        nest: true, // group include model into 1 object
      });

      // const result = post.map(row => {
      //   row.imgPost = "File IMG";
      //   // console.log(row["imgPost"]);

      // })
      const liked = await handleCheckLikeService(data.owner);
      console.log(liked);
      post.map((p) => {
        if (liked.includes(p.idPost)) {
          p.userLiked = true;
        } else {
          p.userLiked = false;
        }
      });
      // console.log(post);
      resolve(post);
    } catch (error) {
      reject(error);
    }
  });
}
export default {
  handleGetPostService,
  handleAddPostService,
  handleUpdatePostService,
  handleDeletePostService,
  handleLikedPostService,
  handleCheckLikeService,
  handleGetOwnerPostService
};
