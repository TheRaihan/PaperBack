const express = require("express");
const router = express.Router();
const loginCntrl = require("../controller/login");

router.get("/login", (req, res, next) => res.render("login"));

router.get("/register", (req, res, next) => res.render("register"));

// Register handle
router.post("/register", loginCntrl.postRegister);

//Login
router.post("/login", loginCntrl.postLogin);

//logout
router.get("/logout", loginCntrl.logout);

module.exports = router;
