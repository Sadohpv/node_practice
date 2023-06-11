import db from "../models/index";

const getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("Home/homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

const getAboutPage = (req, res) => {
  return res.render("Home/about.ejs");
};

module.exports = {
  getHomePage,
  getAboutPage,
};
