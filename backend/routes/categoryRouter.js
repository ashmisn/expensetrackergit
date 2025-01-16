const express = require("express");
const usersController = require("../controllers/usersCtrl");
const isAuthenticated = require("../middlewares/isAuth");
const categoryController = require("../controllers/categoryCtrl");
const categoryRouter = express.Router();

// Log middleware for incoming requests
const logRequest = (message) => (req, res, next) => {
  console.log(message);
  next();
};

//!add
categoryRouter.post(
  "/api/v1/categories/create",
  logRequest("Create category route hit"),
  isAuthenticated,
  categoryController.create
);

//! lists
categoryRouter.get(
  "/api/v1/categories/lists",
  logRequest("List category route hit"),
  isAuthenticated,
  categoryController.lists
);

//! update
categoryRouter.put(
  "/api/v1/categories/update/:categoryId",
  logRequest("Update category route hit"),
  isAuthenticated,
  categoryController.update
);

//! delete
categoryRouter.delete(
  "/api/v1/categories/delete/:id",
  logRequest("Delete category route hit"),
  isAuthenticated,
  categoryController.delete
);

module.exports = categoryRouter;

