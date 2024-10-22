const express = require('express');
const cors = require("cors");
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(cors({
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const employeeRoutes = require("./routes/employeeRoutes");
app.use('/api',employeeRoutes);

const userRoutes = require("./routes/userRoutes");
app.use('/user',userRoutes);

require('dotenv').config();
const port = process.env.PORT;
require("./db/connection");




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
