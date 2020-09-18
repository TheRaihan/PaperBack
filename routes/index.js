const e = require("express");
const express = require("express");
const router = express();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const intrfc = require("../controller/interface");

router.get("/", forwardAuthenticated, (req, res, next) => res.render("hi"));

router.get("/index", ensureAuthenticated, intrfc.home);

router.get("/addBook", ensureAuthenticated, intrfc.getAddBook);

router.get("/editBook/:bookID", ensureAuthenticated, intrfc.getEditBook);

router.post("/editBook", ensureAuthenticated, intrfc.postEditBook);

router.post("/addBook", intrfc.postAddBook);

router.get("/about", (req, res, next) => res.render("about"));

router.get("/books/:bookID", ensureAuthenticated, intrfc.bookDetails);

router.get("/search/:key", ensureAuthenticated, intrfc.getSearch);

router.post("/search", ensureAuthenticated, intrfc.postSearch);
// localhost/

//edit book

module.exports = router;
