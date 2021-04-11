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
    {
      passwordCategory.find((err,datas)=>{
        if(err) throw err;
        else
        res.render("addNewPassword",{title:"Add-New-Password",Datas:datas,msg:""})
      })
    }
  })
  
  router.post("/",(req,res)=>{
    console.log(req.body);
    const NewPass = new passwordDetails({
      catName:req.body.Category,
      details:req.body.Details,
      date:new Date
    })
    NewPass.save();
    passwordCategory.find((err,datas)=>{
      if(err) throw err;
      else
      res.render("addNewPassword",{title:"Add-New-Password",Datas:datas,msg:"successfully password details added"})
    })
  })


module.exports=router;