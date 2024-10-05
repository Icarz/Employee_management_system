import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

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
// get category route APi //
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

// images upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

// end  images upload //

// add employee //
router.post("/add_employee", upload.single("image"), (req, res) => {
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
      req.file.filename,
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
// get employee //
router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, results) => {
    if (err) {
      return res.json({ Status: false, Error: "query error" });
    } else {
      return res.json({ Status: true, Result: results });
    }
  });
});

// get employee by id
router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  // console.log("Employee ID:", id);

  const sql = "SELECT * FROM employee WHERE id = ?";

  con.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ Status: false, Error: "query error" });
    } else if (result.length === 0) {
      return res
        .status(404)
        .json({ Status: false, Error: "Employee not found" });
    } else {
      return res.json({ Status: true, Employee: result[0] });
    }
  });
});
// edit employee //
router.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, salary, address, category_id } = req.body;
  const sql =
    "UPDATE employee SET name = ?, email = ?, salary = ?, address = ?, category_id = ? WHERE id = ?";
  con.query(
    sql,
    [name, email, salary, address, category_id, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ Status: false, Error: "query error" });
      } else if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ Status: false, Error: "Employee not found" });
      } else {
        return res.json({
          Status: true,
          Message: "Employee updated successfully",
        });
      }
    }
  );
});
// delete employee//
router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ Status: false, Error: "query error" });
    } else if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ Status: false, Error: "Employee not found" });
    } else {
      return res.json({
        Status: true,
        Message: "Employee deleted successfully",
      });
    }
  });
});

// admin_count API //
router.get("/admin_count", (req, res) => {
  const sql = "select count(id) as admin from  admin ";
  con.query(sql, (err, result) => {
    if (err) return res.json({ status: false, Error: "query error" + err });
    return res.json({ status: true, Result: result });
  });
});

// employee_count API //

router.get("/employee_count", (req, res) => {
  const sql = "select count(id) as employee from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ status: false, Error: "query error" + err });
    return res.json({ status: true, Result: result });
  });
});

// Salary_count API //
router.get("/salary_count", (req, res) => {
  const sql = "select sum(salary) as salary from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ status: false, Error: "query error" + err });
    return res.json({ status: true, Result: result });
  });
});

// admin_records API //
router.get("/admin_records", (req, res) => {
  const sql = "SELECT * FROM admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ status: false, Error: "query error" + err });
    // console.log("Admin records:", result);  // Check if result is what you expect
    return res.json({ status: true, Result: result });
  });
});

// logout endpoint // 
router.get("/logout",(req,res)=>{
  res.clearCookie('token');
  return res.json({Status: true})
})

export { router as adminRouter };
