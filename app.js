const { error } = require("console")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const Listing = require("./models/listing.js")

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

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

app.get("/listing",async (req,res)=>{
     let allListings = await Listing.find({})
     res.render("index.ejs",{ allListings })
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