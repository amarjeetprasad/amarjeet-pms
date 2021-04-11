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


router.get("/",checkUserLogin,(req,res)=>{
    const userName= localStorage.getItem('userName');
    if(userName)
     res.render("passwordManagementSystem",{title:"password Management System",Name:userName});
   })

module.exports=router;