import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Employee from "./Components/Employee";
import Category from "./Components/Category";
import Profile from "./Components/Profile";
import Add_category from "./Components/Add_category";
import Add_employee from "./Components/Add_employee";
import Edit_employee from "./Components/Edit_employee";
import Start from "./Components/start";
import Employee_login from "./Components/Employee_login";
import Employee_detail from "./Components/Employee_detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route
          path="/employee_detail/:id"
          element={<Employee_detail />}
        ></Route>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/employee_login" element={<Employee_login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/dashboard/employee" element={<Employee />}></Route>
          <Route path="/dashboard/category" element={<Category />}></Route>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
          <Route
            path="/dashboard/add_category"
            element={<Add_category />}
          ></Route>
          <Route
            path="/dashboard/add_employee"
            element={<Add_employee />}
          ></Route>
          <Route
            path="/dashboard/edit_employee/:id"
            element={<Edit_employee />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
