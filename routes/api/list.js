const router = require("express").Router()
const List = require("../../models/list") 
const User = require("../../models/user") 
const auth =require("../../middleware/auth")
var { check, validationResult} = require("express-validator")




// POSTING A LIST
router.post("/", [auth,[
    check("f_name", "This field is required").not().isEmpty(),
    check("l_name", "This field is required").not().isEmpty(),
    check("email", "This field is required").not().isEmpty(),
    check("height", "This field is required").not().isEmpty(),
    check("weight", "This field is required").not().isEmpty(),
    check("dob", "This field is required").not().isEmpty(),
]
], async (req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
    return    res.status(400).json({errors:errors.array()})
    }
try {
    // const user=  User.findOne({user:req.user.id})
     const {f_name,l_name,email,hair_color,height,weight,dob,linkedin,facebook,twitter } = req.body
   
     // age
    const MilliBtwDobAnd1970  = Date.parse(dob) 
    const MIlliBtwNowAnd1970 = Date.now()
    const ageinmilli = MIlliBtwNowAnd1970-MilliBtwDobAnd1970
    var milli =ageinmilli
    var minutes = 1000*60
    var hours = minutes*60
    var days = hours * 24 
    var years = days * 365
     var age = Math.round(milli/years)
     
    const newlist= new List({
        f_name,
        l_name,
        email,
        hair_color,
        height,
        weight,
        dob,
        linkedin,
        facebook,
        twitter,
        age
 })
    const list = await newlist.save()
    return res.json(list) 
 } catch (error) {
     console.error(error.message)
     res.status(500).send("server error")
 }

})

// GETTING ALL LIST
router.get("/", auth, async(req,res)=>{
    try {
        const lists = await List.find().sort({date:-1})
        res.json(lists )

    } catch (error) {
        console.error(error)
        res.status(500).send("server error")
    }
 })





// get one list
 router.get("/:id", auth, async(req,res)=>{
    try {
        const list = await List.findById(req.params.id).sort({date:-1})
        if (!list) {
        return res.status(404).json({msg:" no list found"})
        }
        res.json(list)

    } catch (error) {
        console.error(error)
        if (error.kind === "ObjectId") {
            return res.status(404).json({msg:" no list found"})
        }
        res.status(500).send("server error")
    }
 })

// update
 router.put("/:id", auth, async (req, res)=>{
    try {
        const list = await List.findByIdAndUpdate(req.params.id, req.body, {new:true})
        if (!list) {
            return  res.status(400).json({msg: "post not found"}) 
        }
        res.json(list)
    } catch (error) {
        
    }
 })




 router.delete("/:id", auth, async (req,res)=>{
    try {
      const list= await List.findById(req.params.id)
        if (!list) {
        return  res.status(400).json({msg: "post not found"})
        }
        await list.remove()
    
        res.json({msg: "list has been removed successfully"})

    } catch (error) {
        console.error(error)
        res.status(500).send("server error")
    }
 })







module.exports= router