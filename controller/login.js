const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

exports.postRegister = (req, res, next) => {
  // console.log(req.body);
  const { name, email, password, password2 } = req.body;

  let errors = [];
  const userID = email.substring(0, email.indexOf("@")); // var str = "2017-1-60-072@std.ewubd.edu";
  // var n = str.indexOf("@");
  // console.log(n);
  // var res = str.substring(0, n);
  // console.log(res);
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
        });
      } else {
        const newUser = new User({
          name: name,
          email: email,
          userID: userID,
          password: password,
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
  const email = req.body.email;
  console.log(email);
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
