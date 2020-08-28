const express = require("express");
const router = express();
const { ensureAuthenticated } = require("../config/auth");
const intrfc = require("../controller/interface");

router.get("/", (req, res, next) => res.render("welcome"));

router.get("/index", ensureAuthenticated, intrfc.home);

router.get("/addBook", ensureAuthenticated, intrfc.getAddBook);

router.post("/addBook", intrfc.postAddBook);

router.get("/about", (req, res, next) => res.render("about"));

module.exports = router;
