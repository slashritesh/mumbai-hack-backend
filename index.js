import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import connectdb from "./db/connectdb.js";
import errorHandlerMiddleware from "./middleware/errormiddleware.js";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.router.js";
import morgan from "morgan";
import { taskrouter } from "./routes/task.route.js";
import { managerRouter } from "./routes/manager.route.js";
import cors from "cors"
import { employeeRouter } from "./routes/employee.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;  // Default to 3000 if PORT is not defined

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(cors({
  origin: process.env.DOMAIN,//(https://your-client-app.com)
  optionsSuccessStatus: 200,
}))

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskrouter); 
app.use("/api/employee", employeeRouter); 
app.use("/api/manager", managerRouter); 


// Not found middleware
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use(errorHandlerMiddleware);

const startServer = async () => {
  try {
    await connectdb();
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);  // Exit the process with an error code
  }
};

startServer();
