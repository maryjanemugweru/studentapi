const express = require('express');
const studentController =require('../controller/studentController');
const router =express.Router();

router.post('/addStudent', studentController.addStudent);

module.exports=router;