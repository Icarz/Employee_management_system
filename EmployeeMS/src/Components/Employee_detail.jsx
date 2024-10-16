import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Employee_detail = () => {
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/employee/detail/" + id)
      .then((result) => setEmployee(result.data[0]))
      .catch((error) => console.log(error));
  }, [id]);
  const handleLogout = () => {
    axios.get("http://localhost:3000/employee/logout").then((result) => {
      if (result.data.Status) {
        navigate("/");
      }
    });
  };
  return (
    <div>
      <div className="p-2 d-flex justify-content-center shadow">
        <h4>Employee Management System</h4>
      </div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <img
          src={`http://localhost:3000/images/${employee.image}`}
          className="emp_det_image"
          alt="Employee"
        />
      </div>
      <div className="d-flex align-items-center flex-column mt-5">
        <h3>Name : {employee.name}</h3>
        <h3>Email : {employee.email}</h3>
        <h3>Salary : {employee.salary}</h3>
        <div className="mt-3">
          <button className="btn btn-primary me-2">Edit</button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Employee_detail;
