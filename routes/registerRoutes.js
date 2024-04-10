const express = require("express");
const router = express.Router();

//import model
const Register = require("../models/register")

router.get("/register", (req, res) => {
  res.render("register-baby");
});

router.post("/register", (req, res)=>{
  const baby = new Register(req.body)
  console.log(baby)
  baby.save()
});

module.exports = router;