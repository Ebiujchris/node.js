//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require('multer'); // Import multer module

const passport = require("passport");
const expressSession = require("express-session")({
  secret: "love",
  resave: false,
  saveUninitialized: false,
});

require("dotenv").config();

//import signuproute with user details
const RegisterStaff = require("./models/RegisterStaff");

const port = 3000;

//for importing routes
const registrationRoutes = require("./routes/registerRoutes");
const contactRoutes = require("./routes/contactRoutes");
const createAccountRoutes = require("./routes/createAccountRoutes");
const authenticationRoutes = require("./routes/authenticationRoutes")

//Instantiations
const app = express();

 //Configurations
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", (err) => {
    console.error(`Connection error: ${err.message}`);
  });


app.set("view engine", "pug"); //setting engine to pug
app.set("views", path.join(__dirname, "views")); //specify the directory where the views are found

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
}).single('dollImage');

// Serve static files
app.use(express.static('public'));

app.get('/store', (req, res) => {
  res.sendFile(path.join(__dirname, 'store'));
});

// Handle file upload
app.post('/store', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.redirect('/store');
    }
  });
});


//Middleware
app.use(express.static(path.join(__dirname, "public"))); //set for directory static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//expression session config
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

//passport config
passport.use(RegisterStaff.createStrategy());
passport.serializeUser(RegisterStaff.serializeUser());
passport.deserializeUser(RegisterStaff.deserializeUser());

//use imported routes
app.use("/", registrationRoutes);
app.use("/", contactRoutes);
app.use("/", createAccountRoutes);
app.use("/",authenticationRoutes);

//For invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL");
});


//Bootstrpping the server
//Always the last line in your code
app.listen(port, () => console.log(`listening on port ${port}`));
