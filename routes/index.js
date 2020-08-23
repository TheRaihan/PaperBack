const express = require("express");
const passport = require("passport");
const router = express();

const Product = require("../models/product");

router.get("/", (req, res, next) => res.render("welcome"));

router.get("/index", (req, res, next) => {
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

router.get("/addBook", (req, res, next) => {
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
    .catch((err) => console.log(err));

  res.redirect("/index");
});

module.exports = router;
