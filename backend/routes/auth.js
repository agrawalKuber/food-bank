const express = require("express");
const User = require("../models/User");
const session = require("express-session");
const router = express.Router();
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const JWT_SECRET = "helloworld";

const sessionConfig = {
  secret: JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

router.use(session(sessionConfig));
router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.post(
  "/createUser",
  [
    body("username", "Username Should Have a Minimum Of 3 Characters").isLength(
      { min: 3 }
    ),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password Should Have a Minimum Of 4 Characters").isLength(
      { min: 4 }
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let success = false;
      const user = new User({
        username: req.body.username,
        email: req.body.email,
      });
      const newUser = await User.register(user, req.body.password);
      const data = {
        user: {
          username: newUser.username,
          id: newUser._id,
        },
      };

      const token = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, token });
    } catch (err) {
      res.json({ error: "User Already Exists", message: err.message });
    }
  }
);

router.post("/login", passport.authenticate("local"), (req, res) => {
  let success = false;
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  const data = {
    user: {
      username: user.username,
      id: user._id,
    },
  };
  const token = jwt.sign(data, JWT_SECRET, { expiresIn: "24h" });
  success = true;
  res.json({ success, token });
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
  });

  res.json({ success: true });
});

router.get("/getUser", (req, res) => {
  let success = false;
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    if (data !== null) {
      success = true;
      res.json({ success });
    }
  } catch (error) {
    res.json({ success });
  }
});
module.exports = router;
