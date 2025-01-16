const express = require("express");
const usersController = require("../controllers/usersCtrl");
const isAuthenticated = require("../middlewares/isAuth");
const categoryController = require("../controllers/categoryCtrl");
const transactionController = require("../controllers/transactionCtrl");
const transactionRouter = express.Router();

//!add
transactionRouter.post(
  "/api/v1/transactions/create",
  isAuthenticated,
  transactionController.create
);
//! lists
transactionRouter.get(
  "/api/v1/transactions/lists",
  isAuthenticated,
  transactionController.getFilteredTransactions
);
//! update
transactionRouter.put(
  "/api/v1/transactions/update/:id",
  isAuthenticated,
  transactionController.update
);
//! delete
transactionRouter.delete(
  "/api/v1/transactions/delete/:id",
  isAuthenticated,
  transactionController.delete
);

module.exports = transactionRouter;


transactionRouter.post("/api/v1/transactions/create", (req, res, next) => {
  console.log("Create transaction route hit");
  next();
}, transactionController.create);

transactionRouter.get("/api/v1/transactions/lists", (req, res, next) => {
  console.log("List transaction route hit");
  next();
}, transactionController.getFilteredTransactions);

transactionRouter.put("/api/v1/transactions/update/:id", (req, res, next) => {
  console.log("Update transaction route hit");
  next();
}, transactionController.update);

transactionRouter.delete("/api/v1/transactions/delete/:id", (req, res, next) => {
  console.log("Delete transaction route hit");
  next();
}, transactionController.delete);
