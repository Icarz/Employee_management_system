import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/AdminRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import jwt from "jsonwebtoken";

// creating and instance from express server
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/auth", adminRouter);
app.use("/employee", EmployeeRouter);
app.use(express.static("public"));

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, "jwt_secret_key");
  } else {
    res.json({ Status: false, Error: "Note authenticated!!" });
  }
};

app.use("/verify", verifyUser, (req, res) => {});
// checking the server configuration
app.listen(3000, () => {
  console.log("server is running");
});
