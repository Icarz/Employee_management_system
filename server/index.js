import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { adminRouter } from "./Routes/AdminRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import jwt from "jsonwebtoken";

// creating an instance from the express server
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser()); // Added this middleware
app.use(express.json());

app.use("/auth", adminRouter);
app.use("/employee", EmployeeRouter);

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err)
        return res.status(401).json({ Status: false, Error: "Invalid token" });
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  } else {
    res.status(403).json({ Status: false, Error: "Not authenticated!" });
  }
};

app.use("/verify", verifyUser, (req, res) => {
  res.json({ Status: true, role: req.role, id: req.id });
});

// Serve static files after defining routes
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("server is running");
});
