const router = require("express").Router()
const auth = require("../../middleware/auth")
const Profile = require("../../models/list")
const User = require("../../models/user")
const config = require("../../config/secret")
var { check, validationResult} = require("express-validator")
const request = require("request")

// @ GET API/Profile/me
// @desc  get current users profile
 //@access private
 router.get("/me", auth, async (req, res)=>{
    try {
        let profile= await Profile.findOne({user:req.user.id}).populate("user",["avatar", "name" ])

        if (!profile) {
      return   res.status(400).json({msg: "profile not found"})
        }
        res.json(profile)


    } catch (error) {
        console.error(error.message)
        res.status(400).send(" server error")
    }
 })


// @ POST API/Profile/me
// @desc  CREATE  and UPDATE current users profile
 //@access private

router.post("/me", [auth, [
    // check("dob", "dob is required").not().isEmpty(),
    check("status", "This field is required").not().isEmpty(),

]

], async (req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
    }

const {bio, dob,height, weight,hair_colour, facebook, twitter, instagram, website,location,status} = req.body
// build profile field
    const profileField = {};
    profileField.user = req.user.id
   
    // if (dob) profileField.dob= dob
    if(bio)profileField.bio = bio
    if(website)profileField.website = website
    if(location)profileField.location = location
    if(status)profileField.status = status
    
    // build social field
 profileField.social= {} 
    if (instagram) profileField.social.instagram = instagram
    if (facebook) profileField.social.facebook = facebook
    if (twitter) profileField.social.twitter = twitter
    
//    build physical attribute
profileField.physical_attribute= {} 
if (dob) profileField.physical_attribute.dob = dob
if (height) profileField.physical_attribute.height = height
if (weight) profileField.physical_attribute.weight = weight
if (hair_colour) profileField.physical_attribute.hair_colour = hair_colour

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
     

    // inserting data
        try {
            let profile =  await Profile.findOne({user:req.user.id})

            if (profile) {
                // updating if found
              profile = await Profile.findOneAndUpdate(
                  {user: req.user.id},
                  { $set: profileField},
                  {new:true})
                return  res.json(profile)
            }            
           
            profile = new Profile(profileField)
            await profile.save()
            res.json(profile)
          
        } catch (error) {
            console.error(error.message)
            res.status(500).send("error")
        }
})




// @ Get API/Profile
// @desc  get all profiles
 //@access Public
 router.get("/", async (req, res)=>{

    try {
     let profile = await Profile.find().populate("user",["name", "avatar"])
     res.json(profile)   

    } catch (error) {
        console.error(error.message)
        res.status(500).send(error)
    }
 })


 // @ Get API/Profile/user/:user_id
// @desc  get profile by user id
 //@access Public
 router.get("/user/:user_id", async (req, res)=>{
    try {
     let profile = await Profile.findOne({user:req.params.user_id}).populate("user",["name", "avatar"])
     if (!profile) {

        return  res.status(400).json({msg: "no profile for this user"})
     }
     res.json(profile)   

    } catch (error) {
        console.error(error.message)

        if (error.kind ==="ObjectId") {
            return res.status(400).json({msg: "no profile for this user"})
        }
        res.status(500).send("server error")
    }
 })





// @ DELETE API/Profile
// @desc  DELETE  profiles
 //@access PRIVATE
 router.delete("/", auth, async (req, res)=>{
    try {
      await Profile.findOneAndRemove({user: req.user.id})
      await User.findOneAndRemove({id: req.user.id})
     res.json({msg:"user and profile has been sucessfully deleted"})   

    } catch (error) {
        console.error(error.message)
        res.status(500).send(error)
    }
 })


// @ PUT API/Profile/physical_attribute
// @desc  ADD  profiles experience
 //@access PRIVATE

// router.put("/physical_attribute", [auth,[
// check("dob"," dob is required").not().isEmpty(),
// check("height", "height is required").not().isEmpty(),
// check("weight"," weight is required").not().isEmpty(),
// check("hair_colour"," hair_colour is required").not().isEmpty(),


// ] ], async (req,res)=>{
//     const errors = validationResult(req)

//     if (!errors.isEmpty()) {
//         return res.status(400).json(errors.array())
//     } 
    
//     const { dob, height, weight,hair_colour} = req.body
   
//     //age
//     const MilliBtwDobAnd1970  = Date.parse(dob) 
//     const MIlliBtwNowAnd1970 = Date.now()
//     const ageinmilli = MIlliBtwNowAnd1970-MilliBtwDobAnd1970

//     var milli =ageinmilli
//     var minutes = 1000*60
//     var hours = minutes*60
//     var days = hours * 24 
//     var years = days * 365

//     var age = Math.round(milli/years)


//     const phy = {
//         age,
//         dob,
//          height, 
//          weight,
//         hair_colour
//     }       
//     try {
//         const profile = await Profile.findOne({user:req.user.id})
//         profile.physical_attribute.unshift(phy)
        
//         await profile.save()
        
//         res.status(200).json(profile)
//     } catch (error) {
//         console.error(error.message)
//         res.status(500).send("server error")
//     }

// })



// @ DELETE API/Profile/experience/:exp_id
// @desc  DELETE experience from profiles
 //@access PRIVATE

router.delete("/experience/:exp_id", auth , async (req,res)=>{
    try {
        let profile = await Profile.findOne({user:req.user.id})

        // get remove index
        const removeIndex = profile.experience.map(item=>item.id).indexOf(req.params.exp_id)

        profile.experience.splice(removeIndex, 1)

        await profile.save()
        res.status(200).json(profile)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
})


// @ PUT API/Profile/education
// @desc  ADD education to profile
 //@access PRIVATE

router.put("/education", [auth,[
check("school"," school is required").not().isEmpty(),
check("degree"," degree is required").not().isEmpty(),
check("fieldofstudy"," fieldofstudy is required").not().isEmpty(),
check("from"," from date is required").not().isEmpty(),


] ], async (req,res)=>{
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    } 
    
    const { school, degree, fieldofstudy,from, description, to, current} = req.body
   
    const newEdu = {
        school, 
        degree,
        fieldofstudy,
         from,
         description,
          to,
         current
    }
    try {
        const profile = await Profile.findOne({user:req.user.id})
        profile.education.unshift(newEdu)
        
        await profile.save()
        
        res.status(200).json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }

})

// @ DELETE API/Profile/education/:edu_id
// @desc  DELETE education from profiles
 //@access PRIVATE

 router.delete("/education/:edu_id", auth , async (req,res)=>{
    try {
        let profile = await Profile.findOne({user:req.user.id})

        // get remove index
        const removeIndex = profile.education.map(item=>item.id).indexOf(req.params.edu_id)

        profile.education.splice(removeIndex, 1)

        await profile.save()
        res.status(200).json(profile)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
})




// @ Get API/Profile/github/:username
// @dess GET user repo from github
 //@access Public

router.get("/github/:username", (req,res)=>{
    try {
        const options={
            uri :`https://api.github.com/users/${req.params.username}
            /repos?per_page=5&sort=created:asc&client_id=${config.githubclientid}
            &client_secret=${config.githubclientsecret}`,
            method: "GET",
            headers: {"user-agent": "node.js"}
        }
        request(options,(error, response, body)=>{
            if (error) console.error(error)
           
            if(response.statusCode !== 200){
               return res.status(404).json({msg:" no github profile"})
            }
           
            res.json(JSON.parse(body))
        })

    } catch (error) {
       console.error(error.message)
       res.status(500).send("server error") 
    }
})












 module.exports = router