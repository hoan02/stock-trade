import React, { useState } from "react";
import "./Register.scss";
import NewRequest from "../../utils/NewRequest";
import ToastService from "../../utils/ToastService.js";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await NewRequest.post("auth/register", {
        ...user,
      });
      ToastService.success("Create account successfully!");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="form">
          <h1>Create a new account</h1>
          <label htmlFor="">Username(*)</label>
          <input
            name="username"
            type="text"
            placeholder="hoancute"
            onChange={handleChange}
          />
          <label htmlFor="">Email(*)</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Password(*)</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Việt Nam"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
