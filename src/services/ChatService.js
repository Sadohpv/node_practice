import db from "../models/index";

const handleGetChatService = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const chat = await db.Chat.findAll({
        include: [
          // {
          //   model: db.User,
          //   attributes: [
          //     "idUser",
          //     "userName",
          //     "avatar",
          //     "address",
          //     "firstName",
          //     "lastName",
          //   ],
          //   as: "chatUserFrom",
          // },
          // {
          //   model: db.User,
          //   attributes: [
          //     "idUser",
          //     "userName",
          //     "avatar",
          //     "address",
          //     "firstName",
          //     "lastName",
          //   ],
          //   as: "chatUserTo",
          // },
          {
            model: db.Chat,
            as :"Reply",
            // through: {
            //   attributes: ['SelfReply']
            // }
          }
        ],
        // where: {
        //   idUserTo: id,
        //   // status: 0,
        // },
        raw: true,
        // order: [
        //   ["status", "ASC"],
        //   ["createdAt", "DESC"],
        // ],
        nest: true,
      });
      if (chat) {
        resolve(chat);
      }
    } catch (error) {
      reject(error);
    }
  });
};
const handlePushChatService = async (userFrom, userTo, chat) => {
  return new Promise(async (resolve, reject) => {
    try {
      if ((userFrom, userTo)) {
        await db.Post.create({
          chatFrom: userFrom,
          chatTo: userTo,
          chat: chat,
        });
        resolve(true);
      }
    } catch (error) {
      reject(false);
    }
  });
};

export default {
  handleGetChatService,
  handlePushChatService
};
