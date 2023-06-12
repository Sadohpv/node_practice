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

  console.log("Create services");
  console.log(data);
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
  console.log("Update services");
  console.log(data);
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
export default {
  createUserService,
  updateUserService,
  getAllUser,
  getUserInfo,
  deleteUserService,
};
