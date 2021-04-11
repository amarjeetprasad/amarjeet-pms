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



//login api
router.get('/',function(req, res, next) {
  const userName= localStorage.getItem('userName');
  if(!userName)
  res.render('login', { title: 'Sign-In',msg:"" });
  else
  res.redirect("/password-management-system");
});


router.post("/",(req,res)=>{
  const {userId,password} =req.body;
  User.findOne({$or:[{Username:userId},{Email:userId}]},(err,Res)=>{
    if(err) throw err;
   else if(Res)
    {
      if(bcrypt.compareSync(password,Res.Password))
      {
        const token = jwt.sign({ userID: Res._id }, 'loginToken');
        localStorage.setItem('userToken', token);
        localStorage.setItem('userName', Res.Name);
        res.redirect("/password-management-system");
      }
      else
      res.render('login', { title: 'Sign-In',msg:"you have entered wrong username/password." });
    }
    else
     res.render('login', { title: 'Sign-In',msg:"you have entered wrong username/password." });
  })
})


module.exports = router;
