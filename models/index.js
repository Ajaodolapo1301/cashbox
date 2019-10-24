var mongoose = require ("mongoose")

mongoose.set("debug",true)

data={
    database: process.env.MONGODB_URL || "mongodb://localhost/test",
  }
mongoose.connect(data.database,{ useNewUrlParser: true, useCreateIndex:true })



// mongodb+srv://dollypearl1301:<ajaodolapo1301>@cluster0-5i7wh.mongodb.net/test?retryWrites=true&w=majority


mongoose.Promise = Promise 

module.exports.User =require("./user")

module.exports.List =require("./list")

