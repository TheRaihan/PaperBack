const { static } = require("express");
const Product = require("../models/product");

exports.home = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("index", {
        name: req.user.name,
        userID: req.user._id,
        prods: products,
        pageTitle: "Home",
        path: "/index",
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddBook = (req, res, next) => {
  res.render("addBook", {
    name: req.user.name,
    userID: req.user._id,
    pageTitle: "Add Product",
    path: "/addBook",
  });
};

exports.postAddBook = (req, res, next) => {
  const title = req.body.title;
  const imgURL = req.body.imgURL;
  const price = req.body.price;
  const des = req.body.des;
  const userID = req.body.userID;

  const product = new Product({
    title: title,
    price: price,
    des: des,
    imgURL: imgURL,
    userID: userID,
  });

  product
    .save()
    .then((result) => {
      console.log("Created Product");
      res.redirect("/index");
    })
    .catch((err) => console.log(err));
};

//edit
// 
// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;
//   Product.findById(prodId)
//     .then((product) => {
//       product.title = updatedTitle;
//       product.price = updatedPrice;
//       product.description = updatedDesc;
//       product.imageUrl = updatedImageUrl;
//       return product.save();
//     })
//     .then((result) => {
//       console.log("UPDATED PRODUCT!");
//       res.redirect("/profile");
//     })
//     .catch((err) => console.log(err));
// };
// exports.getProducts = (req, res, next) => {
//   Product.find()
//     .then((products) => {
//       res.render("profile", {
//         prods: products,
//         pageTitle: "Admin Products",
//         path: "profile",
//       });
//     })
//     .catch((err) => console.log(err));
// };
