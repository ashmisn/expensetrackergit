const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");




const app = express();

// MongoDB connection URI
const uri = "mongodb+srv://ashmisn2004:Plittb10sL3obEYq@cluster0.iylmv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB connection setup with Mongoose
mongoose.set('bufferCommands', false); // Disable buffering
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the application if DB connection fails
  });
const corsOptions = {
  origin: "http://localhost:5174",
}
app.use(cors(corsOptions));
// Middleware
app.use(express.json()); // Parse incoming JSON data
app.use(cors()); // Add CORS support if needed
app.use(transactionRouter);
app.use(categoryRouter);
app.use(userRouter);

// Routes
app.use("/api/v1/users", userRouter); // Handle user-related routes
app.use("/api/v1/categories", categoryRouter); // Handle category-related routes
app.use("/api/v1/transactions", transactionRouter); // Handle transaction-related routes

// Error Handling Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Basic health check route
app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.POST} ${req.url}`);
  next();
});
