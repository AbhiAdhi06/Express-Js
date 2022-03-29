const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../Model/Schema");


router.get("/", (req, res) => {
      res.json({
            "status": "ok",
            "message": "Welcome"
       })
})


router.get("/home", (req, res) => {
  User.find({}, (err, docs) => {
    res.json(docs);
  });
});

router.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;
  const Email = await User.findOne({
    email: email,
  });
  if (!name || !email || !phone || !password) {
    res.status(500).json({
      Error: "All Credentials Required",
    });
  }
  if (Email) {
    res.status(302).json({
      Error: "Email Already Exists",
    });
  } else {
    const user = new User({ name, email, phone, password });
    user.save();
    res.status(201).json({
      Message: "User Registration Successful",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const Email = await User.findOne({
    email: email,
  });
  if (!Email) {
    res.status(400).json({
      Error: "Invalid Credentials",
    });
  } else {
    res.status(200).json({
      message: "Success",
    });
  }
});

router.get("/user", async (req, res) => {
  const user_id = req.query.id;
  const data = await User.findById(user_id);
  res.status(200).json(data);
});

router.post("/hash", async (req, res) => {
  let password = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);
  res.status(200).json({
    HashedPassword: hashPass,
  });
});

module.exports = router;
