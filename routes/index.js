const express = require("express");
const router = express();
const { ensureAuthenticated ,forwardAuthenticated} = require("../config/auth");
const intrfc = require("../controller/interface");

router.get("/", forwardAuthenticated,(req, res, next) => res.render("hi"));

router.get("/index", ensureAuthenticated, intrfc.home);

router.get("/addBook", ensureAuthenticated, intrfc.getAddBook);

router.post("/addBook", intrfc.postAddBook);

router.get("/about", ensureAuthenticated, (req, res, next) => res.render("about"));

module.exports = router;
