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
        res.render("viewAllCategory",{title:"view-all-category",Name:userName,datas:datas})
  
      })
    }
  })
  
  router.get("/delete/:id",checkUserLogin,(req,res)=>{
    const userName= localStorage.getItem('userName');
    if(userName){
    passwordCategory.deleteOne({_id:req.params.id},(err)=>{
      if(err) throw err;
      res.redirect("/view-all-category");
    })
  }
  })
  
  router.get("/edit/:id",checkUserLogin,(req,res)=>{
    const userName= localStorage.getItem('userName');
    if(userName)
    {
    passwordCategory.findOne({_id:req.params.id},(err,data)=>{
      if(err) throw err;
      res.render("editCategory",{category:data})
    })
  }
  })
  
  
  router.post("/edit/:id",(req,res)=>{
    passwordCategory.update({_id:req.params.id},{$set:{catName:req.body.Category}},(err)=>{
      if(err) throw err;
      res.redirect("/view-all-category");
    })
  
  })

  module.exports=router;