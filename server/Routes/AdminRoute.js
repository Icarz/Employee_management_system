import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// creating a router //
const router = express.Router();

// now we use << router>> instance to create the API methods

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.json({ loginStatus: false, Error: "query error" });
    }
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});

// add_category route APi //
router.post("/add_category", (req, res) => {
  const sql = "INSERT INTO category (name) VALUES (?)";
  con.query(sql, [req.body.category], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "query error" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
});

router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, results) => {
    if (err) {
      return res.json({ Status: false, Error: "query error" });
    } else {
      return res.json({ Status: true, Result: results });
    }
  });
});

// add employee //
// add employee
router.post("/add_employee", (req, res) => {
  const sql =
    "INSERT INTO employee (name, email, password, salary, address, category_id, image) VALUES (?)";

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res
        .status(500)
        .json({ Status: false, Error: "Password hashing error" });
    }

    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.salary,
      req.body.address,
      req.body.category_id,
      req.body.image,
    ];

    con.query(sql, [values], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ Status: false, Error: "Database query error" });
      } else {
        return res.json({ Status: true, Result: result });
      }
    });
  });
});

export { router as adminRouter };
