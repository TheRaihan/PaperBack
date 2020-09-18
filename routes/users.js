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

router.get("/:userID/makeAdmin", ensureAuthenticated, loginCntrl.makeAdmin);

router.get("/:userID/disable", ensureAuthenticated, loginCntrl.disable);

router.get("/:userID/deleteBook/:prodID",ensureAuthenticated,loginCntrl.getDeleteProduct);
// router.get(
//   "/:userID/editBook/:prodID",
//   ensureAuthenticated,
//   loginCntrl.getEditBook
// );

//router.get("/:userID/BookId/:prodID", ensureAuthenticated, loginCntrl.bookDetails);

module.exports = router;
