const express = require("express");
const passport = require("passport");
const router = express();
const { ensureAuthenticated } = require("../config/auth");
const Product = require("../models/product");

router.get("/", (req, res, next) => res.render("welcome"));

router.get("/index", ensureAuthenticated, (req, res) => {
  Product.fetchAll()
    .then((products) => {
      res.render("index", {
        prods: products,
        pageTitle: "Home",
        path: "/index",
      });
    })
    .catch((err) => console.log(err));
});

router.get("/addBook", ensureAuthenticated, (req, res) => {
  res.render("addBook", {
    pageTitle: "Add Product",
    path: "/addBook",
  });
});

router.post("/addBook", (req, res, next) => {
  const title = req.body.title;
  const imgURL = req.body.imgURL;
  const price = req.body.price;
  const des = req.body.des;
  const product = new Product(title, price, des, imgURL);
  product
    .save()
    .then((result) => {
      console.log("Created Product");
      res.redirect("addBook");
    })
    .catch((err) => console.log("err"));

  res.redirect("/index");
});

router.get("/about", (req, res, next) => {
  res.render("about");
});

module.exports = router;
