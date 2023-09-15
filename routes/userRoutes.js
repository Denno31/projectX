const express = require("express");
const User = require("../models/User");
const { db } = require("../config/config");

const router = express.Router();

// main page
router.get("/", async (req, res) => {
  if (!req.session || !req.session.user) {
    console.log("No session or not authenticated");
    return res.render("login", { layout: "login" });
  }
  const conn = await db;
  const [rows, fields] = await conn.execute("select * from weblogintab");

  // get authorized users
  const authorizedUsers = await User.find();
  console.log(authorizedUsers[0].token);

  res.render("main", {
    layout: "main",
    users: rows,
    loggedInUser: req.session.user,
    authorizedUsers: authorizedUsers.map((user) => ({
      email: user.email,
      token: user.token || "",
    })),
  });
});

// login router
router.get("/login", (req, res) => {
  res.render("login", { layout: "login" });
});

// login request
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email exists
    const user = await User.findOne({ email });
    if (!user)
      return res.send({ success: false, message: "Invalid credentials" });
    //compare email and password
    if (password === user.password) {
      req.session.user = { email };
      return res.send({ success: true });
    }
    res.send({ success: false });
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.get("/verify/token", async (req, res) => {
  const { token, email } = req.body;
  try {
    const user = await User.findOne({ token, email });
    console.log(user);
    if (user) return res.send({ verified: true });
    res.send({ verified: false });
  } catch (error) {
    console.log("An error occurred==========================================");
    console.log(error);
    console.log("===========================================================");
    res.send({ verified: false });
  }
});

module.exports = router;
