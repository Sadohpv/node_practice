import db from "../models/index";

const handleGetNotifyService = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const notify = await db.Notify.findAll({
        include: [
          {
            model: db.User,
            attributes: [
              "idUser",
              "userName",
              "avatar",
              "address",
              "firstName",
              "lastName",
            ],
            as: "notifyFrom",
          },
          {
            model: db.User,
            attributes: [
              "idUser",
              "userName",
              "avatar",
              "address",
              "firstName",
              "lastName",
            ],
            as: "notifyTo",
          },
        ],
        where: {
          idUserTo: id,
          // status: 0,
        },
        raw: true,
        order: [
          ["status", "ASC"],
          ["createdAt", "DESC"],
        ],
        nest: true,
      });
      if (notify) {
        resolve(notify);
      }
    } catch (error) {
      reject(error);
    }
  });
};
const handleReadNotifyService = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const notify = await db.Notify.findOne({
        where: {
          id: id,
          status: 0,
        },
        raw: false,
      });
      // console.log(notify);

      if (notify) {
        notify.status = 1;

        await notify.save();
        // console.log("Here");
        resolve({
          EC: 0,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const handleNumberNoReadNotifyService = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const notify = await db.Notify.count({
      
        where: {
          idUserTo: id,
          status: 0,
        },
        raw: true,
       
      });
      // console.log(notify)
      if (notify) {
        resolve(notify);
      }
    } catch (error) {
      reject(error);
    }
  });
};
export default {
  handleGetNotifyService,
  handleReadNotifyService,
  handleNumberNoReadNotifyService
};
