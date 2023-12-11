import db from "../models/index";
import { where, Op } from "sequelize";
import { cloudinary } from "../utils/cloudinary";

const handleGetPostService = (idUser, page) => {
  return new Promise(async (resolve, reject) => {
    const num = page == 1 ? 0 : page * 4 - 4;

    try {
      let post = await db.Post.findAll({
        include: [
          {
            model: db.User,
            attributes: ["idUser", "userName", "avatar"],
          },
        ],
        where: {
          privatePost: 0,
        },
        raw: true,
        order: [["createdAt", "DESC"]],
        nest: true, // group include model into 1 object
        offset: num, // skip num records
        limit: 4, // get 2 records after skip
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
      // console.log("Here",data)
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
        if (data.image !== "") {
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
        } else {
          await db.Post.create({
            idWhoPost: idWhoPost,
            content: data.content,
            imgPost: "",
            likeCount: 0,
            shareCount: 0,
            shareIdPost: null,
          });
        }

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
      } else if (likedPost === null) {
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
const handleGetOwnerPostService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let post = {};
      if (+data.userPage === data.owner) {
        // console.log("Authentic");
        post = await db.Post.findAll({
          include: [
            {
              model: db.User,
              attributes: ["idUser", "userName", "avatar"],
            },
          ],
          where: {
            idWhoPost: data.userPage,
          },
          raw: true,
          nest: true, // group include model into 1 object
        });
      } else {
        // console.log(data.userPage);

        post = await db.Post.findAll({
          include: [
            {
              model: db.User,
              attributes: ["idUser", "userName", "avatar"],
            },
          ],
          where: {
            idWhoPost: data.userPage,
            privatePost: 0,
          },

          raw: true,
          nest: true, // group include model into 1 object
        });
      }
      const liked = await handleCheckLikeService(data.owner);
      // console.log(liked);
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
const handleGetOwnerPhotoService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let post = {};
      if (+data.userPage === data.owner) {
        // console.log("Authentic");
        post = await db.Post.findAll({
          include: [
            {
              model: db.User,
              attributes: ["idUser", "userName", "avatar"],
            },
          ],
          where: {
            idWhoPost: data.userPage,
            imgPost : {[Op.ne] : ''},
          },
          raw: true,
          nest: true, // group include model into 1 object
        });
      } else {
        // console.log(data.userPage);

        post = await db.Post.findAll({
          include: [
            {
              model: db.User,
              attributes: ["idUser", "userName", "avatar"],
            },
          ],
          where: {
            idWhoPost: data.userPage,
            privatePost: 0,
          },

          raw: true,
          nest: true, // group include model into 1 object
        });
      }
      const liked = await handleCheckLikeService(data.owner);
      // console.log(liked);
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
const handleGetOnePostService = (idPost, idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let post = await db.Post.findOne({
        include: [
          {
            model: db.User,
            attributes: ["idUser", "userName", "avatar"],
          },
        ],
        where: {
          privatePost: 0,
          idPost: idPost,
        },
        raw: true,
        nest: true, // group include model into 1 object
      });

      // const result = post.map(row => {
      //   row.imgPost = "File IMG";
      //   // console.log(row["imgPost"]);

      // })
      // console.log(post);
      if (post) {
        const liked = await handleCheckLikeService(idUser);

        if (liked.includes(post.idPost)) {
          post.userLiked = true;
        } else {
          post.userLiked = false;
        }

        resolve(post);
      } else {
        resolve({ EC: 401 });
      }

      // console.log(post);
    } catch (error) {
      reject(error);
    }
  });
};
const handleGetCommentService = (id, page) => {
  const num = page == 1 ? 0 : page * 6 - 6;
  return new Promise(async (resolve, reject) => {
    try {
      let comment = await db.Comment.findAll({
        include: [
          {
            attributes: ["idUser", "avatar", "userName"],
            model: db.User,
          },
        ],
        where: {
          idPostComment: id,
        },
        raw: true,
        nest: true,
        order: [["createdAt", "DESC"]],
        offset: num, // skip num records
        limit: 6, // get 2 records after skip
      });

      if (comment) {
        resolve(comment);
      }
    } catch (error) {
      reject(error);
    }
  });
};
const handlePushCommentService = (data) => {
  // console.log(data);
  return new Promise(async (resolve, reject) => {
    try {
      let post = await db.Post.findOne({
        where: {
          idPost: data.idPostComment,
        },
        attributes: ["idPost", "commentCount"],
        raw: false,
      });
      if (post) {
        post.commentCount += 1;
        await post.save();

        await db.Comment.create({
          idWhoComment: data.idWhoComment,
          idPostComment: data.idPostComment,
          content: data.content,

          likeComment: 0,
        });
        if (data.content.includes("@t@g")) {
          const tag = await handleNotifyTagInComment(
            data.content,
            data.idWhoComment
          );
          if (tag == true) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
const handleNotifyTagInComment = (data, idUser) => {
  let result = data.split("@t@g");
  result = result.filter((e) => e.includes("@"));
  if (result.length > 0) {
    result.map(async (item) => {
      await db.Notify.create({
        idUserFrom: idUser,
        idUserTo: item.slice(1),
        status: 0,
        content: 1,
      });
    });
    return true;
  } else {
    return false;
  }
};
const handleSavePostService = async (user, post) => {
  return new Promise(async (resolve, reject) => {
    if (user && post) {
      // console.log("Here",user,post)

      const check = await db.SavePost.findOne({
        where: {
          idPostSaved: post,
          idUserSaved: user,
        },
      });

      if (check) {
        resolve(null);
      } else {
        try {
          await db.SavePost.create({
            idPostSaved: post,
            idUserSaved: user,
          });
          resolve(true);
        } catch (e) {
          resolve(false);
        }
      }
    } else {
      resolve(false);
    }
  });
};
const handleGetSavedPostService = async (idUser) => {
  return new Promise(async (resolve, reject) => {
    if (idUser) {
      // console.log(idUser);

      const post = await db.SavePost.findAll({
        attributes: ["idPostSaved"],
        where: {
          idUserSaved: idUser,
        },
        raw: true,
        nest: true,
      });
      let array = [];
      // console.log(post);

      if (post) {
        await post.map((item) => {
          array.push(item.idPostSaved);
        });

        const result = await db.Post.findAll({
          include: [
            {
              model: db.User,
              attributes: ["idUser", "userName", "avatar"],
            },
          ],
          where: {
            idPost: { [Op.in]: array },
            privatePost: 0,
          },
          raw: true,
          nest: true,
        });
        const liked = await handleCheckLikeService(idUser);
        await result.map((p) => {
          if (liked.includes(p.idPost)) {
            p.userLiked = true;
          } else {
            p.userLiked = false;
          }
        });
        // console.log(result)
        resolve(result);
      }
    } else {
      resolve(false);
    }
  });
};
export default {
  handleGetPostService,
  handleAddPostService,
  handleUpdatePostService,
  handleDeletePostService,
  handleLikedPostService,
  handleCheckLikeService,
  handleGetOwnerPostService,
  handleGetOnePostService,
  handleGetCommentService,
  handlePushCommentService,
  handleSavePostService,
  handleGetSavedPostService,
  handleGetOwnerPhotoService
};
