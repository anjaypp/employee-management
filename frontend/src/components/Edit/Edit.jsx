import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosinterceptor";

const Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State to handle form data
  const [formData, setFormData] = useState({
    EmployeeId: "",
    EmployeeName: "",
    EmployeeDesignation: "",
    EmployeeLocation: "",
    Salary: "",
    Department: ""
  });

  // Pre-fill form data when editing
  useEffect(() => {
    if (location.state && location.state.employee) {
      setFormData(location.state.employee);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the existing employee
    axiosInstance
      .put(`http://localhost:3000/api/update/${formData._id}`, formData)
      .then((res) => {
        alert("Employee updated successfully");
        navigate("/home");
      })
      .catch((error) => {
        console.log("Error while updating employee:", error);
      });
  };

  return (
    <>
      {/* Form container */}
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
          margin: "auto",
          mt: 4
        }}
        onSubmit={handleSubmit}
        className="container"
      >
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Edit Employee
        </Typography>

        <TextField
          label="ID"
          name="EmployeeId"
          type="number"
          value={formData.EmployeeId}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          disabled // ID field is disabled in edit mode
        />

        <TextField
          label="Name"
          name="EmployeeName"
          value={formData.EmployeeName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Designation"
          name="EmployeeDesignation"
          type="text"
          value={formData.EmployeeDesignation}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Location"
          name="EmployeeLocation"
          type="text"
          value={formData.EmployeeLocation}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />

        <TextField
          label="Salary"
          name="Salary"
          type="number"
          value={formData.Salary}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />

        <TextField
          label="Department"
          name="Department"
          type="text"
          value={formData.Department}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />

        <Button type="submit" variant="contained" className="submit">
          Update Employee
        </Button>
      </Box>
    </>
  );
};

export default Edit;
