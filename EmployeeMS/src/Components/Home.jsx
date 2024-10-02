import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState();
  const [employeeTotal, setEmployeeTotal] = useState();
  const [salaryTotal, setSalaryTotal] = useState();

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
  }, []);

  const adminCount = () => {
    axios.get("http://localhost:3000/auth/admin_count").then((result) => {
      if (result.data.status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };

  const employeeCount = () => {
    axios.get("http://localhost:3000/auth/employee_count").then((result) => {
      if (result.data.status) {
        setEmployeeTotal(result.data.Result[0].employee);
      }
    });
  };

  const salaryCount = () => {
    axios.get("http://localhost:3000/auth/salary_count").then((result) => {
      if (result.data.status) {
        setSalaryTotal(result.data.Result[0].salary);
      }
    });
  };
  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className=" d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className=" d-flex justify-content-around">
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h5>Salary</h5>
          </div>
          <hr />
          <div className="d-flex justify-content-around">
            <h5>Total:</h5>
            <h5>{salaryTotal}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
