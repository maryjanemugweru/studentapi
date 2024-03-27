const express = require('express');
const studentController =require('../controller/studentController');
const {verifyAccessToken} = require("../helpers/jwtHelpers");
const router =express.Router();

router.get("/getAllStudents",verifyAccessToken, studentController.getAllStudents);
router.get("/getStudent/:id", studentController.getStudent);
router.post("/addStudent", studentController.addStudent);
router.patch("/updateStudent/:id", studentController.updateStudent);

module.exports=router;