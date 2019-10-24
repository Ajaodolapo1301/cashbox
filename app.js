var express =require("express")
var bcrypt = require("bcryptjs")
var bodyParser = require("body-parser")
var cors = require("cors")
var db =require("./models")
var app=express()
var authRoute = require("./routes/api/auth")
var userRoute = require("./routes/api/user")
var listRoute = require("./routes/api/list")
var path = require("path")




app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))






app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/list", listRoute)


if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))

    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname,"client", "build", "index.html"))
    })

}

const PORT = process.env.PORT

app.listen( PORT ||5000,function() {
    console.log("server up")
})
