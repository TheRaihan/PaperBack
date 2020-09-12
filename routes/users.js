const express = require("express");
const router = express.Router();
const loginCntrl = require("../controller/login");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

router.get("/login", forwardAuthenticated, (req, res, next) =>
  res.render("login")
);

router.get("/register", forwardAuthenticated, (req, res, next) =>
  res.render("register")
);

// Register handle
router.post("/register", loginCntrl.postRegister);

//Login
router.post("/login", loginCntrl.postLogin);

//logout
router.get("/logout", loginCntrl.logout);

router.get("/:userID", ensureAuthenticated, loginCntrl.profile);

module.exports = router;
