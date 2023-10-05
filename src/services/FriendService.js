import db from "../models/index";
const { Op } = require("sequelize");
const handleGetMutualFriendService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let mutual1 = await db.Friend.findAll({
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
            as: "friendAsked",
          },
        ],
        attributes: ["friend_1", "friend_2"],
        where: {
          friend_2: data.owner,

          status: 1,
        },
        raw: true,
        nest: true,
      });
      let mutual2 = await db.Friend.findAll({
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
            as: "friendAsking",
          },
        ],
        attributes: ["friend_1", "friend_2"],
        where: {
          friend_1: data.owner,

          status: 1,
        },
        raw: true,
        nest: true,
      });

      let result1 = await handleGetFriend(data.owner);
      let result2 = await handleGetFriend(data.friend);
      let result3 = [];
      result2.map((item) => {
        result3.push(item.idUser);
      });
      // console.log("3333333333",result3)
      let result = [];
      // console.log(result1);
      // if (mutual1) {
      //   // console.log(mutual1);
      //   mutual1.map((item) => {
      //     result.push(item.friendAsked);
      //   });
      // }
      // if (mutual2) {
      //   // console.log(mutual2)
      //   mutual2.map((item) => {

      //     result.push(item.friendAsking);
      //   });
      // }

      result1.map((item) => {
        if (result3.includes(item.idUser) && item.idUser !== data.owner) {
          // console.log("Here");

          result.push(item);
        }
      });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
const handleGetFriend = async (id) => {
  try {
    let mutual1 = await db.Friend.findAll({
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
          as: "friendAsked",
        },
      ],
      attributes: [],
      where: {
        friend_2: id,

        status: 1,
      },
      raw: true,
      nest: true,
    });
    let mutual2 = await db.Friend.findAll({
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
          as: "friendAsking",
        },
      ],
      attributes: [],
      where: {
        friend_1: id,

        status: 1,
      },
      raw: true,
      nest: true,
    });
    // console.log(mutual1);
    let result = [];
    if (mutual1) {
      // console.log("Herre")
      mutual1.map((item) => {
        result.push(item.friendAsked);
      });
    }
    if (mutual2) {
      // console.log(mutual2)
      mutual2.map((item) => {
        result.push(item.friendAsking);
      });
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

const handleUnfriendService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let relationship = await db.Friend.findOne({
        attributes: ["id","friend_1", "friend_2", "status"],
        where: {
          [Op.or]: [
            { friend_1: data.owner, friend_2: data.friend },
            { friend_1: data.friend, friend_2: data.owner },
          ],
          status: 1,
        },
       raw : false,
      });
      if(relationship){
        await relationship.destroy();
        // await relationship.save();

        resolve({
          EC : 0,
          EM : "UNFRIEND SUCCESSFULLY !",
        });
      }else{
        resolve({
          EC : 1,
          EM : "NOT FOUND RELATIONSHIP !",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const handleAddFriendService = async(data)=>{
  return new Promise(async (resolve, reject) => {
    try {
      let relationship = await db.Friend.findOne({
        attributes: ["id","friend_1", "friend_2", "status"],
        where: {
          [Op.or]: [
            { friend_1: data.asked, friend_2: data.asking },
            { friend_1: data.asking, friend_2: data.asked },
          ],
        },
       raw : false,
      });
      if(relationship){


        resolve({
          EC : 1,
          EM : "WRONG ADD FRIEND REQUEST !",
        });
      }else{
        await db.Friend.create({
        friend_1: data.asked,
          friend_2: data.asking,
          
          status: 2
        });
        resolve({
          EC : 0,
          EM : "SEND ADD FRIEND REQUEST !",
        })
      }
    } catch (error) {
      reject(error);
    }
  });
}

const handleCancelRequestService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let relationship = await db.Friend.findOne({
        attributes: ["id","friend_1", "friend_2", "status"],
        where: {
          friend_1: data.asked,
          friend_2: data.asking,
          status: 2,
        },
       raw : false,
      });
      if(relationship){
        await relationship.destroy();
        // await relationship.save();

        resolve({
          EC : 0,
          EM : "CANCEL REQUEST SUCCESSFULLY !",
        });
      }else{
        resolve({
          EC : 1,
          EM : "NOT FOUND RELATIONSHIP !",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};


export default {
  handleGetMutualFriendService,
  handleUnfriendService,
  handleAddFriendService,
  handleCancelRequestService
};