const express = require("express");
const app = express();
const studentRoute =require("./routes/studentRoute");
const courseRoute = require("./routes/courseRoute");
const regRoute = require("./routes/regRoute");
require("dotenv").config();
require("./model/dbConnect");

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/students', studentRoute);
app.use("/api/courses", courseRoute);
app.use('/api/reg', regRoute);

app.listen(process.env.port || 4000, function() {
    console.log("Now listening for requests on: http://localhost:4000");
});