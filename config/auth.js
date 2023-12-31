const jwt = require("jsonwebtoken");

const User = require("../models/userModels");

//guard
const verifyUser = function (req, res, next) {
  try {
    //we have to receive the token first from client..
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "neosphere"); //token ma id, key, time hunxa

    // console.log(data);
    // console.log(data._id);

    User.findOne({ _id: data._id }) //database ma store huda _id vaneyra store vako hunxa
      .then(function (user) {
        //all the data of the logged in user is stored in user
        // console.log(user);
        req.userData = user;
        next();
      })
      .catch(function (e) {
        res.status(401).json({ msg: "You are authorised " });
      });
  } catch (e) {
    res.status(401).json({ msg: "You are not authorised" });
  }
};

module.exports = { verifyUser };