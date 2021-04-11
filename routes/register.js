var express = require('express');
var router = express.Router();
const {User,passwordCategory,passwordDetails,connection} = require("../modules/databade")
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');


if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
/* GET home page. */


function checkUserLogin(req,res,next)
{
  var userToken = localStorage.getItem("userToken")
  try {
    var decoded = jwt.verify(userToken, 'loginToken');
  } catch(err) {
    res.redirect("/");
  }
  next();
}


router.get('/', function(req, res, next) {
    const userName= localStorage.getItem('userName');
    if(!userName)
    res.render('register', { title: 'Register',msg:"" ,username:"",password:"",email:"",fullname:""});
    else
    res.redirect("/password-management-system")
  });
  
  router.post("/",(req,res)=>{
      const {username,password,cpassword,email,fullname,gender} =req.body;
  
      if(password!==cpassword)
      {
        res.render("register",{title: 'Register',msg:"password and confirm password doesn't matched",username:username,password:password,email:email,fullname:fullname})
      }
      else
      User.findOne({ $or: [ { Username: username }, { Email: email } ] },(err,Res)=>{
        if(err) throw err;
       else if(Res)
        res.render("register",{title: 'Register',msg:"this username or email already taken",username:"",password:"",email:"",fullname:""})
        else
        {
          const user = new User({
            Username:username,
            Password:bcrypt.hashSync(password,10),
            Email:email,
            Name:fullname,
            Gender:gender
          })
          user.save((err,data)=>{
            if(err) throw err;
          });
          res.render('register', { title: 'Register',msg:"successfully registered !" ,username:"",password:"",email:"",fullname:""});
        }
      });
  })

  module.exports=router;