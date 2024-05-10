const { url } = require("inspector")
const mongoose = require("mongoose")
const { type } = require("os")
let Schema = mongoose.Schema

let listingSchema = new Schema({
    title:{
        type:String
    },
    image:{
        filename:{
            type:String
        },
        url:{
            type:String
        }
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    }
})

let Listing = mongoose.model("Listing",listingSchema)
module.exports = Listing