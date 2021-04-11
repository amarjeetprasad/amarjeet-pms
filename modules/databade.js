const {connect,model,connection,Schema} = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
connect("mongodb+srv://amarjeetprasad:aMARJEET@123@newcluster.1ky9s.mongodb.net/userDB",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err) throw err;
    else console.log("successfully connected to database");
})

const User = new model("userData",{
    Username:String,
    Password:String,
    Email:String,
    Name:String,
    Gender:String
})

const passwordCategory = new model("passwordCategory",{
    catName:String,
    date:Date
})

const passwordDetailsSchema = new Schema({
    catName:String,
    details:String,
    date:Date
})


const passwordDetails = new model("passwordDetail",passwordDetailsSchema)

module.exports={User,passwordCategory,passwordDetails,connection};