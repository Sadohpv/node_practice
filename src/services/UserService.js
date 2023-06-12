import bcrypt from "bcryptjs";
import db from "../models/index";
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
  console.log("Update");
  console.log(data);
};

const getAllUser =  () => {
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

export default {
  createUserService,
  updateUserService,
  getAllUser,
};
