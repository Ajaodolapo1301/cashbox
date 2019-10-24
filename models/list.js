var mongoose = require("mongoose")

const listSchema = new mongoose.Schema({
    f_name:{
        type:"string",
        required: true,
    },
    l_name:{
        type:"string",
        required: true,
    }, 
    email: {
        type: String
    },
    location: {
        type: String
    }, 
        height:{
        type: String,
        required: true
     },
       hair_color: {
        type: String,
        required: true    
       },
       weight: {
        type: String,
        required: true   
       },
        dob:{
        type: Date,
        required: true
    },
    age:{
        type: Number
    },
            twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        instagram: {
            type: String,
    },
    date :{
        type: Date,
        default: Date.now
    }
 
})
var List = mongoose.model("List", listSchema);
module.exports = List