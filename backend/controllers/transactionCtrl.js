const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");
const mongoose = require("mongoose");

const transactionController = {
  //!add
  create: asyncHandler(async (req, res) => {
    const { type, category, amount, date, description } = req.body;
    if (!amount || !type || !date) {
      throw new Error("Type, amount and date are required");
    }

    // Simulating user ID as an ObjectId (replace this with actual authentication in a real-world scenario)
    const userId = new mongoose.Types.ObjectId(); // This will generate a valid ObjectId

    //! Create a new transaction and link it with the simulated user ID
    const transaction = await Transaction.create({
      user: userId, // Valid ObjectId
      type,
      category,
      amount,
      description,
      date,  // Ensure the date field is included
    });

    res.status(201).json(transaction);  // Send the created transaction as response
  }),

  //!lists
  getFilteredTransactions: asyncHandler(async (req, res) => {
    const { startDate, endDate, type, category } = req.query;
    let filters = {};  // Filter object to apply filters

    // Apply filters based on query parameters
    if (startDate) {
      filters.date = { ...filters.date, $gte: new Date(startDate) };
    }
    if (endDate) {
      filters.date = { ...filters.date, $lte: new Date(endDate) };
    }
    if (type) {
      filters.type = type;
    }
    if (category && category !== "All") {
      if (category === "Uncategorized") {
        filters.category = "Uncategorized";  // Filter for uncategorized transactions
      } else {
        filters.category = category;  // Filter for a specific category
      }
    }

    // Find transactions with the filters and sort by date in descending order
    const transactions = await Transaction.find(filters).sort({ date: -1 });
    res.json(transactions);
  }),

  //!update
  update: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction) {
      // Update transaction fields only if provided
      transaction.type = req.body.type || transaction.type;
      transaction.category = req.body.category || transaction.category;
      transaction.amount = req.body.amount || transaction.amount;
      transaction.date = req.body.date || transaction.date;
      transaction.description = req.body.description || transaction.description;

      // Save updated transaction
      const updatedTransaction = await transaction.save();
      res.json(updatedTransaction);
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  }),

  //!delete
  delete: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction) {
      await Transaction.findByIdAndDelete(req.params.id);
      res.json({ message: "Transaction removed" });
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  }),
};

module.exports = transactionController;
