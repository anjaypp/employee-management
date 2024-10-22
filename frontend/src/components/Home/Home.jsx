import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; // Import Button
import { useEffect, useState } from "react";
import axiosInstance from '../../axiosinterceptor';
import { useNavigate } from 'react-router-dom';

const bull = (
  <Box
    component="span"
    className="bull"
  >
  </Box>
);

export default function BasicCard() {
  const [employee, setEmployee] = useState([]);
  const [error, setError] = useState(null);
  const navigate =useNavigate()

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get("http://localhost:3000/api/employee");
        setEmployee(response.data);
      } catch (error) {
        setError("Error fetching employees");
        console.error("Employee fetching error", error);
      }
    };
    fetchEmployees();
  }, []);


  const handleDelete = async (_id) => {
    try {
      await axiosInstance.delete(`http://localhost:3000/api/delete/${_id}`);
      setEmployee(preEmployee => preEmployee.filter((employee) => employee._id !== _id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEdit = (employee) => {
    navigate("/edit", { state: { employee } });
  };

  return (
    <div>
      {error ? <p>{error}</p> : (
        employee.map((emp) => (
          <Card
            key={emp._id}
            id="basic-card"
            className="radio-card"
            sx={{ margin: '16px' }}
          >
            <CardContent className="card-content">
              <Typography variant="h5" component="div" className="card-label">
                {emp.EmployeeName}
              </Typography>
              <Typography gutterBottom className="card-location">
                Location: {emp.EmployeeLocation}
              </Typography>
              <Typography variant="body2" className="card-designation">
                Designation: {emp.EmployeeDesignation}
              </Typography>
              <Typography variant="body2" className="card-salary">
                Salary: {emp.Salary}
              </Typography>
              <Button variant="contained" onClick={() => handleEdit(emp)}>
                Edit Employee
              </Button>
              <Button className="delete-btn" onClick={() => handleDelete(emp._id)}>
                Delete Employee
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
