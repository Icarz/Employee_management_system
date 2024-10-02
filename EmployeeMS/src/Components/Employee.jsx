import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Employee = () => {
  // const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        console.log(result.data); // Debugging line
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete(`http://localhost:3000/auth/delete_employee/${id}`)
        .then((result) => {
          if (result.data.Status) {
            // Remove the deleted employee from the state
            setEmployee(employee.filter((e) => e.id !== id));
            alert("Employee deleted successfully.");
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employees List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              // eslint-disable-next-line react/jsx-key
              <tr>
                <td>{e.name}</td>
                <td>
                  <img
                    src={`http://localhost:3000/images/` + e.image}
                    alt={employee.name}
                    className="employee_image"
                  />
                </td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>{e.salary}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_employee/` + e.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
