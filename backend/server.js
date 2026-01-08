import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import noteRoutes from "./routes/noteRoutes.js"
import rateLimiter from "./middleware/rateLimiter.js"
import connectDB from "./config/db.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// middleware
app.use(cors({ // allow only API requests from port 5173 (i.e. react frontend)
    origin: "http://localhost:5173"
}))
app.use(express.json()) // parse JSON request bodies
app.use(rateLimiter)

// simple middleware function example
// app.use((req, res, next) => {
//     console.log(`Request method is ${req.method} and Request URL is ${req.url}`)
//     next()
// })

app.use('/api/notes', noteRoutes)

async function startServer() {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`)
        })
    } catch (error) {
        console.log("Error: " + error.message)
    }
}
startServer()


// connectDB()

// app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}...`)
// })