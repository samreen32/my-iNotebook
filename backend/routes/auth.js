const express = require('express');     //importing express
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');      //provide token to user on terminal for secuirty purpose.
const getuser = require('../middleware/getuser');

const JWT_SECRETE = 'Samreenisagoodgir@l'; 


//1st Route
//Create a User using: POST "api/auth". No login required. 
//Now Creating"api/auth/createuser" instead of router.post( '/'.
router.post( '/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),      /*Copy from express validator website*/
    body('email', 'Enter a valid  email').isEmail(),
    body('password').isLength({ min: 5 }),
    ], 
   async (req, res)=>{
    let success = false;                  
    /* ..........Copy from  express validator website.......... */
        //if error then return bad request and error message as well.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ success, errors: errors.array() });
        }

    /* Check whether the user with same email exsits already.*/
    try{
        let user = await User.findOne({email: req.body.email})    
        if (user){        //user match with already entered email of user, then show error.
          return res.status(400).json({ success, error: "User with this Email already exists" });
        }

        /*..........CREATING NEW USER..........*/
          const salt = await bcrypt.genSalt(10);    //will create salt for your passsword.
          const securePasssword = await bcrypt.hash(req.body.password, salt);
          user = await User.create({       //'User.create({' instead of this now:
          name: req.body.name,
          email: req.body.email,
          password: securePasssword,
        }); 

        /*For returning token to user for the same user who wants to login second time.*/
          const data ={
            user:{
              id: user.id
            }
          }
          const authToken = jwt.sign(data, JWT_SECRETE);    //no need to do await bz sign is already a synchronus method.
          success = true;
          res.json({success, authToken});    //instead of passing user in res.json(user), pass token to it now.
          //res.json(user);       

      }catch(error){
          console.error(error.message);   //for showing error with message.
          res.status(500).send("Internal Server Error");   
      }
    /* For showing particular error e.g.for email only. */
      //  .then(user => res.json(user))
      //  .catch(err => {console.log(err)   //for showing error with message.
      //  res.json({error: 'Please enter valid email', message: err.message})}) 

/* Used only to store or save data in mongose */
   // console.log(req.body);        
   // const user = User(req.body);
   // user.save()
   // res.send(req.body);       
})





//2nd Route
//Authenticat a User using: POST "api/auth/login". No login required. 
router.post( '/login', [
  body('email', 'Enter a valid  email').isEmail(),     /*Copy from express validator website*/
  body('password', 'Password cannot be blank').exists(),
  ], 
 async (req, res)=>{

    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;   //taking email and password from user.
    /* Now comparing user entered email and password with already eneterd or stored email. */
    try {      
      let user = await User.findOne({email});
      if(!user){
        success = false;
        return res.status(400).json({ error: "Enter correct credentials"});
      }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({success, error: "Enter correct credentials"});
    }

    const data ={
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRETE);   
    success = true;
    res.json({success, authToken});

  } catch (error) {
      console.error(error.message);   
      res.status(500).send("Internal Server Error"); 
  }
});




//3rd Route
//Get User logged in details using: POST "api/auth/getuser". Login required.
router.post( '/getuser', getuser, async (req, res)=>{

  try {
    //Here we will get our user by token e.g with its id.
    const userId = req.user.id;
    const user = await User.findById(userId).select("password");
    res.send(user);

  } catch (error) {
      console.error(error.message);   
      res.status(500).send("Internal Server Error"); 
  }

})



module.exports = router;