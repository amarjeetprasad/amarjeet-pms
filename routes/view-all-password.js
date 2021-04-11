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
    // const options = {
    //   offset:1,
    //   limit:3
    // };
    // passwordDetails.paginate({},options,(err,data)=>{
    //   if(err) throw err
    //   console.log(data);
    // })
    passwordDetails.find((err,datas)=>{
      if(err) throw err;
      res.render("viewAllPassword",{title:"view-all-password",Name:userName,Datas:datas})
    })
   }
  })
  
  router.get("/delete/:id",checkUserLogin,(req,res)=>{
    const userName= localStorage.getItem('userName');
    if(userName)
    {
      passwordDetails.deleteOne({_id:req.params.id},(err)=>{
        if(err) throw err;
        res.redirect("/view-all-password")
        
      })
    }
  })
  
  router.get("/edit/:id",checkUserLogin,(req,res)=>{
    const userName= localStorage.getItem('userName');
    if(userName)
    {
      passwordCategory.find((err,datas)=>{
        if(err) throw err;
        else
        {
          passwordDetails.findOne({_id:req.params.id},(err,data)=>{
            if(err) throw err;
            res.render("editPasswordDetails",{Datas:datas,Data:data,msg:""})
  
          })
        }
      })
    }
  })
  
  router.post("/edit/:id",(req,res)=>{
    passwordDetails.update({_id:req.params.id},{$set:{catName:req.body.Category,details:req.body.Details}},(err)=>{
      if(err) throw err;
      res.redirect("/view-all-password")
    })
  })

  module.exports=router;