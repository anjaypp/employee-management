import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    userName: "",
    userPassword: ""
  });
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const updateUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    axios
      .post("http://localhost:3000/user/login", user)
      .then((res) => {
        if (res.data.message === "Login Successful") {
          console.log(res);
          localStorage.setItem("token", res.data.usertoken);
          // Navigate to home page
          navigate("/home");
        } else {
          setError(res.data.message); // Display error message
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        setError("An error occurred during login."); // Set error state
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit} // Attach submit handler to form
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <div className="login-container">
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <TextField
          required
          label="Username"
          name="userName"
          value={user.userName}
          onChange={updateUser}
        />

        <TextField
          required
          label="Password"
          type="password"
          name="userPassword"
          value={user.userPassword}
          onChange={updateUser}
        />

        <Button
          type="submit"
          variant="contained"
          color="success"
          className="login-button"
        >
          Login
        </Button>

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
      </div>
    </Box>
  );
};

export default Login;
