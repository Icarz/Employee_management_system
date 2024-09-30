import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Edit_employee = () => {
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    image: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        // console.log(result.data);
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/auth/employee/" + id)
      .then((result) => {
        setEmployee({
          ...employee,
          name: result.data.Employee.name,
          email: result.data.Employee.email,
          address: result.data.Employee.address,
          salary: result.data.Employee.salary,
          category_id: result.data.Employee.category_id,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios
      .put("http://localhost:3000/auth/edit_employee/" + id, employee)
      .then((result) => {
        if (result.data.Status) {  // Check if the response indicates success
          navigate("/dashboard/employee/");
        } else {
          alert(result.data.Error);  // Show the error message if the update fails
        }
      })
      .catch((err) => console.log("Error updating employee:", err));
  };
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            {/* <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            /> */}
            <label className="form-label">Salary</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              value={employee.salary}
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="add address here"
              autoComplete="off"
              value={employee.address}
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label className="form-label">Category</label>
            <select
              name="category"
              id="category"
              className="form-select"
              value={employee.category_id}
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
            >
              {category.map((c) => {
                // eslint-disable-next-line react/jsx-key
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>
          <div className="col-12 mb-3">
            {/* <label className="form-label">Select Image</label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) =>
                setEmployee({ ...employee, image: e.target.files[0] })
              }
            /> */}
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit_employee;
