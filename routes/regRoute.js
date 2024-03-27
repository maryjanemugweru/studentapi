const express = require("express");
const regController = require("../controller/regController");
const router = express.Router();

router.post("/loginUser", regController.loginUser);
router.get("/getAllReg", regController.getAllReg);
router.get("/getReg/:id", regController.getReg);
router.post("/addReg", regController.addReg);
router.patch("/updateReg/:id", regController.updateReg);

module.exports = router;