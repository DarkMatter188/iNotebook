const express = require('express')
const User = require('../Models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "ApoorvIsGood$boy"


// ROUTE-1 Create a user - POST "/api/auth/" - Does not need Auth No login required
router.post('/createuser',[
    body('email','Enter a vaid email').isEmail(),
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('password','Enter valid password').isLength({ min: 5 }),
    
] ,async (req,res)=>{

    let success = false
// Check for errors and return bad requests with errors

    // console.log(req.body)
    // const user = User(req.body)
    // user.save()
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // res.send(req.body)

    //Check whether user with same email exists or not
    try {
        
    let user = await User.findOne({success, email : req.body.email})
    if(user){
        return res.status(400).json({error: 'Sorry a user with same email already exists'})

    }


    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(req.body.password,salt)


    //Create a new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      })

      const data = {
        user : {
            id : user.id
        }
      }

      //Sending jwt token after signing in with web token
      const authtoken = jwt.sign(data,JWT_SECRET)
      success = true
    //   console.log(jwtData)
      res.json({success, authtoken})
    }
      
    //   .then(user => res.json(user))
    //   .catch(err=>{console.log(err)
    // res.json({error: 'Please enter unique value for email',message: err.message})})
    catch (error) {
        console.error(error.message)
        res.status(500).send('Some error occured')
    }

})

// ROUTE-2 Authenticate a user using  - POST "/api/auth/login" - Does not need Auth No login required
router.post('/login',[
    body('email','Enter a vaid email').isEmail(),
    body('password','Cannot be blank').exists(),
] ,async (req,res)=>{

    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //If valid email,pwd given then fetch from req.body

    const {email,password} = req.body
    try {
        
        let user = await User.findOne({email})
        if(!user){
            success=false
            return res.status(400).json({error: "Please try to login with correct credentials!"})
        }
    
        const passwordCompare = await bcrypt.compare(password,user.password);

        if(!passwordCompare){
            success = false
            return res.status(400).json({success,error: "Please try to login with correct credentials!"})
        }


        const data = {
            user : {
                id : user.id
            }
          }
          const authtoken = jwt.sign(data,JWT_SECRET)
          success = true
          res.send({success,authtoken})
        
    }catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server error occured')
    }

})



// ROUTE-3 Get loggedIn user details - POST "/api/auth/getuser" - Login required


router.post('/getuser', fetchuser, async (req,res)=>{

    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server error occured')
    }
})

module.exports = router