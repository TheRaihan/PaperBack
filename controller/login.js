const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");
const Product = require("../models/product");

exports.postRegister = (req, res, next) => {
  // console.log(req.body);
  const { name, email, password, password2 } = req.body;

  let errors = [];

  const userID = email.substring(0, email.indexOf("@")); // var str = "mhkhan@std.ewubd.edu";
  // var n = str.indexOf("@");
  // console.log(n);
  // var res = str.substring(0, n);
  // console.log(res);
  let dept;
  const deptid = email.substring(7, 9);
  if (deptid === "60") dept = "Student of CSE ";
  if (deptid === "10") dept = "Student of BBA  ";
  if (deptid === "50") dept = "Student of EEE  ";
  if (deptid === "55") dept = "Student of CIVIL";
  else dept = "Faculty";
  if (!name || !email || !password || !password2)
    errors.push({ msg: "Please fill all fields" });

  if (password != password2) errors.push({ msg: "Password didn't match" });

  if (email.endsWith("ewubd.edu") != true)
    errors.push({ msg: "Enter your EWU mail" });

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
      deptid,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //user exists
        errors.push({ msg: "Email is already registered" });
        res.render("register", {
          errors: errors,
          name: name,
          email: email,
          password: password,
          password2: password2,
          deptid: deptid,
        });
      } else {
        const newUser = new User({
          _id: userID,
          name: name,
          email: email,
          password: password,
          dept: dept,
        });

        //hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;

            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and Can Log in"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
};

exports.postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout();
  req.flash("success_msg", "You have successfully logged out");
  res.redirect("/users/login");
};

exports.profile = async (req, res, next) => {
  const rUserID = req.params.userID;
  let prods = [];

  try {
    let user = await User.findById(rUserID);

    if (user !== null) {
      let products = await Product.find();
      prods = products;
      res.render("profile", {
        user: user,
        name: req.user.name,
        userID: req.user._id,
        deptid: req.user.dept,
        rName: user.name,
        rUserID: user._id,
        rdeptid: user.dept,
        prods: prods,
        // rUserID: rUserID,
        email: user.email,
      });
    } else {
      res.render("404", {
        name: req.user.name,
        userID: req.user._id,
        ERROR: "User Not Found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
// .catch((err) => console.log(err));
