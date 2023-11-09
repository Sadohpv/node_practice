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
          status: 0,
        },
        raw: true,
        order: [["createdAt", "DESC"]],
        nest : true,
      });
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
};
