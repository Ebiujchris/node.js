const express = require("express");
const router = express.Router();

//import model
const Register = require("../models/register");


router.get("/register",(req, res)=>{
  res.render("register-baby");
});

//post route 
//using the async function
router.post("/register", async(req, res)=>{
  try{
    const baby = new Register(req.body)
    console.log(baby);
    await baby.save();
    res.redirect("/babieslist");
    
  } catch (error) {
     res.status(400).send("error, baby not registered")
     console.log("Error registering baby..",error);
  }
 
});

//fetching babies from the database 
router.get("/babieslist",async(req, res)=>{
  try{
    let babies = await Register.find()
    res.render("babiesregistered",{babies:babies})
  } catch (error) {
     res.status(400).send("unable to fetch babies from database")
  }
  
})

//deleting
router.post("/delete", async(req, res)=>{
  try{
    await Register.deleteOne({_id:req.body.id});
    res.redirect("back");
    
  } catch (error) {
     res.status(400).send("Unable to delete baby from db")
     console.log("Error deleting baby..",error);
  }
 
});


//updating a baby in the database
router.get("/babiesUpdate/:id", async(req, res)=>{
  try{
     const babyUpdate = await Register.findOne({_id: req.params.id});
     res.render("Update-baby",{baby:babyUpdate})

  } catch (error) {
      console.log("error finding baby!",error);
      res.status(400).send("unable to find baby from db!");
  }
})

router.post("/babiesUpdate", async(req, res)=> {
  try {
     await Register.findOneAndUpdate({_id: req.query.id}, req.body);
     res.redirect("/babieslist");

  } catch (error) {
     res.status(404).send("unable to update baby in the db!");  
  }
})

module.exports = router;