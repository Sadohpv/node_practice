import bcrypt from "bcryptjs";
import db from "../models/index";
import { where } from "sequelize";
const salt = bcrypt.genSaltSync(10);

const createUserService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPass = await hashUserPassword(data.password);
      await db.User.create({
        userName: data.userName,
        email: data.email,
        passWord: hashPass,
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: "",
        gender: data.gender,
        banAcc: "0",
        banLikeCom: "0",
        isAdmin: "0",
      });
      console.log("Successfully");
      resolve("OK Created Successfully");
    } catch (error) {
      reject(error);
    }
  });
};
const updateUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { idUser: data.idUser } });

      if (user) {
        user.userName = data.userName;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        await user.save();

        let allUser = await db.User.findAll();

        resolve(allUser);
      } else {
        resolve(allUser);
      }
    } catch (error) {
      reject(error);
    }
  });
};
const deleteUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { idUser: id } });
      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

const getDataUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        attributes: ["idUser","email", "isAdmin", "avatar","userName","firstName","lastName","address"],
        where: { idUser: id},
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        console.log(user);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hasPassword = await bcrypt.hashSync(password, salt);
      resolve(hasPassword);
    } catch (e) {
      reject(e);
    }
  });
};

const getUserInfo = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { idUser: id }, raw: true });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};

const checkUserEmail = (UserEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: UserEmail,
        },
      });
      if (user) {
        resolve(user);
      } else {
        resolve(user);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const checkPassword = (UserPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (error) {
      reject(error);
    }
  });
};
const handlelUserLoginService = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        // user Exists

        let user = await db.User.findOne({
          attributes: ["email", "isAdmin", "passWord"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          // Compare password
          let check = bcrypt.compareSync(password, user.passWord);

          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK! Not found error";
            delete user.passWord;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `Your email is not a member of us ! Please register first`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your email is not a member of us ! Please register first`;
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  createUserService,
  updateUserService,
  getAllUser,
  getUserInfo,
  deleteUserService,
  handlelUserLoginService,
  getDataUserService,
};
