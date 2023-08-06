import bcrypt from "bcryptjs";
import db from "../models/index";
import { where, Op } from "sequelize";
const salt = bcrypt.genSaltSync(10);

const createUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          message: " Your email already exists !",
        });
      } else if (
        !data.email ||
        !data.password ||
        !data.userName ||
        !data.firstName ||
        !data.lastName ||
        !data.gender ||
        !data.phoneNumber ||
        !data.address
      ) {
        resolve({
          errCode: 2,
          message: "Missing data required",
        });
      } else {
        let hashPass = await hashUserPassword(data.password);

        await db.User.create({
          userName: data.userName,
          email: data.email,
          passWord: hashPass,
          firstName: data.firstName,
          address: data.address,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          avatar: "",
          gender: data.gender,
          banAcc: "0",
          banLikeCom: "0",
          isAdmin: "0",
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
const updateUserService = (attribute, data, idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { idUser: idUser },
        raw: false,
      });
      let message;
      if (user) {
        // user.firstName = data.firstName;
        // user.lastName = data.lastName;
        // await user.save();
        // let allUser = await db.User.findAll();
        // resolve(allUser);
        if (attribute === "email") {
          user.email = data;
          message = "Your email has been changed success!!!";
        } else if (attribute === "firstName") {
          user.firstName = data;
          message = "You just change your first name!!!";
        } else if (attribute === "lastName") {
          user.lastName = data;
          message = "You just change your last name!!!";
        } else if (attribute === "address") {
          user.address = data;
          message = "Move to another place huh !!!";
        } else if (attribute === "phoneNumber") {
          user.phoneNumber = data;
          message = "Your phone number has been change !!!";
        } else {
          message = "We don't know what you wanna do !!!";
        }
        await user.save();
      } else {
        resolve("None");
      }

      resolve({
        errCode: 0,
        message: message,
      });
    } catch (error) {
      reject({ error });
    }
  });
};
const deleteUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { idUser: id }, raw: false });
      if (user) {
        // await db.User.destroy({
        //   where: { idUser: id },
        // }); Second way
        await user.destroy();
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
        attributes: {
          exclude: ["passWord"],
        },
        where: { idUser: id },
        raw: true,
      });
      if (user) {
        resolve(user);
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
        resolve(true);
      } else {
        resolve(false);
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
          attributes: ["idUser", "email", "isAdmin", "passWord"],
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

const handleSearchService = (keyWord)=>{
  
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findAll({
        attributes: {
          exclude: ["passWord"],
        },
        where: {
          userName: {
              [Op.like] :  `%${keyWord}%`
          }
        
        },
      });
      if (user) {
        resolve(user);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export default {
  createUserService,
  updateUserService,
  getAllUser,
  getUserInfo,
  deleteUserService,
  handlelUserLoginService,
  getDataUserService,
  handleSearchService,
};
