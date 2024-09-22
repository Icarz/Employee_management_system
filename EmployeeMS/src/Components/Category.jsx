import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Category = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="px-5 mt-5">
      <div className="d-flex justify-content-center">
        <h3>Category list</h3>
      </div>
      <Link to="/dashboard/add_category" className="btn btn-success mt-3">
        Add Category
      </Link>
      <div></div>
    </div>
  );
};

export default Category;
