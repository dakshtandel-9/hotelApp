const { error } = require("console")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const Listing = require("./models/listing.js")
const methodOverride = require('method-override')

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

main()
    .then(() => {
        console.log("connected mongoDB")
    }).catch((err) => {
        console.log(err)
    })

    async function main() {
        await mongoose.connect('mongodb://127.0.0.1:27017/hotelApp');
    }
 
app.get("/", (req, res) => {
    res.send("working")
})

//index route
app.get("/listing",async (req,res)=>{
     let allListings = await Listing.find({})
     res.render("listings/index.ejs",{ allListings })
})

//new route
app.get("/listing/new",(req,res)=>{
    res.render("listings/new.ejs")
})

//show route
app.get("/listing/:id",async (req,res)=>{
    let { id } = req.params
    let listing = await Listing.findById(id)
    res.render("listings/show.ejs", { listing })
})

//new route
app.post("/listing",async (req,res)=>{
    // let {title,description,image,price,location,country} = req.body
    let newListing = new Listing(req.body.listing)
    await newListing.save()
    res.redirect("/listing")
})

//edit route
app.get("/listing/:id/edit",async (req,res)=>{
    let { id } = req.params
    let listing = await Listing.findById(id)
    res.render("listings/edit.ejs",{ listing })
})

app.put("/listing/:id",async (req,res)=>{
    let { id } = req.params
    let editlisting = await Listing.findByIdAndUpdate(id,{...req.body.listing})
    editlisting.save()
    res.redirect(`/listing/${id}`)
    
})

// app.get("/testing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"dakshtandel"
//     })
//     await sampleListing.save()
    
// })


app.listen(8080, (req, res) => {
    console.log("listening to port:8080")
})