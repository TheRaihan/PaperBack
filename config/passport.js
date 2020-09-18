const LocalSt = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalSt({ usernameField: "email" }, (email, password, done) => {
      //Match User
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          return done(null, false, { message: "Email not registered" });
        }
        if (user.disable == true) {
          return done(null, false, { message: "Your Account is Disabled" });
        }
        //Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        });
      });
      // .catch(err => console.log(err));
    })
  );
  // serialize and deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
