const mongoose = require("mongoose");

const isAuthenticated = (req, res, next) => {
  console.log("Token authentication bypassed for debugging.");
  
  // Generate a valid ObjectId dynamically
  req.user = new mongoose.Types.ObjectId();
  
  console.log("Mock user ID:", req.user); // Log the generated user ID for debugging
  next(); // Proceed to the next middleware or route handler
};

module.exports = isAuthenticated;
