const Product = require("../models/product");

exports.home = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("index", {
        prods: products,
        pageTitle: "Home",
        path: "/index",
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddBook = (req, res, next) => {
  res.render("addBook", {
    pageTitle: "Add Product",
    path: "/addBook",
  });
};

exports.postAddBook = (req, res, next) => {
  const title = req.body.title;
  const imgURL = req.body.imgURL;
  const price = req.body.price;
  const des = req.body.des;
  const product = new Product(title, price, des, imgURL);
  //   const product = new Product({
  //     title: title,
  //     price: price,
  //     des: des,
  //     imgURL: imgURL,
  //   });

  product
    .save()
    .then((result) => {
      console.log("Created Product");
      res.redirect("addBook");
    })
    .catch((err) => console.log("err"));

  res.redirect("/index");
};
