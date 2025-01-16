const express = require("express");
const usersController = require("../controllers/usersCtrl");
const isAuthenticated = require("../middlewares/isAuth");
const userRouter = express.Router();
//!Register
userRouter.post("/api/v1/users/register", usersController.register);
//! Login
userRouter.post("/api/v1/users/login", usersController.login);
//!Profile
userRouter.get(
  "/api/v1/users/profile",
  isAuthenticated,
  usersController.profile
);
//!change password
userRouter.put(
  "/api/v1/users/change-password",
  isAuthenticated,
  usersController.changeUserPassword
);
//!update profile
userRouter.put(
  "/api/v1/users/update-profile",
  isAuthenticated,
  usersController.updateUserProfile
);
//MAIN PART
module.exports = userRouter;
userRouter.post("/register", (req, res, next) => {
  console.log("Register route hit");
  next();
}, usersController.register);
userRouter.post("/login", (req, res, next) => {
  console.log("login route hit");
  next();
}, usersController.login);
