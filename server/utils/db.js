import mysql from "mysql";

//creating an instance of mysql.///
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_ms",
});

// connection function

con.connect(function (err) {
  if (err) {
    console.log("Error connecting");
  } else {
    console.log("connected");
  }
});

export default con 