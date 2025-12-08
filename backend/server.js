import express from "express"
import noteRoutes from "./routes/noteRoutes.js"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

dotenv.config()

const app = express()
app.use(express.json()) // middleware to parse JSON request bodies

app.use('/api/notes', noteRoutes)

const PORT = process.env.PORT || 5000

connectDB()

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`)
})




// async function startServer() {
//     try {
//         await connectDB()
//         app.listen(PORT, () => {
//             console.log(`Server is listening on port ${PORT}...`)
//         })
//     } catch (error) {
//         console.log("Error", error.message)
//     }
// }
// startServer()

