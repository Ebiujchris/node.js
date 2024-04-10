//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');// for pug


require("dotenv").config();

//for importing routes
const registrationRoutes = require("./routes/registerRoutes")//for importing routes



//Instantiations
const app = express();


// //Configurations
 mongoose.connect(process.env.DATABASE,{
  useNewUrlParser: true,
   useUnifiedTopology: true,
 });

 mongoose.connection
   .once("open", () => {
     console.log("Mongoose connection open");
   })
   .on("error", err => {
     console.error(`Connection error: ${err.message}`);
 });


//configurations
app.set("view engine", "pug")//setting engine to pug
app.set("views", path.join(__dirname, "views"));//specify the directory where the views are found




//Middleware
app.use(express.static(path.join(__dirname,"public")))//set for directory static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//routes for pug
app.get("/registerbaby",(req, res)=>{
  res.render("register-baby")
})

//This is  a route
app.get("/", (req, res) => {
  // new
  res.send("Homepage! Hello world.");
});

app.get("/about", (req, res) => {
  res.sendFile("About page. Nice.");
});

app.get("/about", (req, res) => {
  res.sendFile("About page. Nice.");
});

//use imported routes
app.use("/",registrationRoutes);


//Syntax of a route
//app.METHOD(PATH, HANDLER);

app.get("/path", (req, res) => {
  res.send("You have hit the home page");
});

app.get("/books/:bookId", (req, res) => {
  res.send(req.params);
});

// app.get("/student/:name", (req, res) => {
// res.send("this is my name" + req.params.name);
// });

//app.get("/student/:id", (req, res) => {
//res.send("this is my id" + req.params.id);
//});

app.get("/index", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.get("/registerbaby", (req, res) => {
  res.sendFile(__dirname + "/register_baby.html");
});

app.post("/registerbaby", (req, res)=>{
  console.log(req.body)
  let baby=req.body
  //res.redirect("/index")
  res.json({message:"baby registered",baby})
})


// QUERY PARAMS
app.get("/student", (req, res) => {
  res.send("This is class " + req.query.class + "cohort " + req.query.cohort);
});

app.get("/babies", (req, res) => {
  res.send("This is a baby " + req.query.name + "age " + req.query.age);
});

//For invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL");
});

//Bootstrpping the server
//Always the last line in your code
app.listen(3000, () => console.log("listening on port 3000"));
