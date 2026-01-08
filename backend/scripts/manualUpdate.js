import mongoose from "mongoose"
import dotenv from "dotenv"
import Note from "../models/Note.js" 

dotenv.config()

console.log("Loaded MONGO_URI:", JSON.stringify(process.env.MONGO_URI))

// Deletes ALL documents and ADDS some default notes
await mongoose.connect(process.env.MONGO_URI)
await Note.deleteMany()
await Note.insertMany([
    {
        title: "Title 1",
        content: "Content 1",
    },
    {
        title: "Title 2",
        content: "Content 2",
    },
    {
        title: "Title 3",
        content: "Content 3",
    }
])

console.log("Manual query completed")
await mongoose.disconnect()
