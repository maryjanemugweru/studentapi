const express = require("express");
const app = express();
const studentRoute =require("./routes/studentRoute");
require("dotenv").config();
require("./model/dbConnect");

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/students', studentRoute);

app.listen(process.env.port || 4000, function() {
    console.log("Now listening for requests on: http://localhost:4000");
});