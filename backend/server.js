import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import noteRoutes from "./routes/noteRoutes.js"
import rateLimiter from "./middleware/rateLimiter.js"
import connectDB from "./config/db.js"
import path from "path"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// middleware
if (process.env.NODE_ENV !== "production") {
    app.use(cors({ // allow only API requests from port 5173 (i.e. react frontend)
        origin: "http://localhost:5173"
    }))
}
app.use(express.json()) // parse JSON request bodies
app.use('/api/notes', rateLimiter, noteRoutes)

// simple middleware function example
// app.use((req, res, next) => {
//     console.log(`Request method is ${req.method} and Request URL is ${req.url}`)
//     next()
// })

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(path.resolve(), "../frontend/dist")))
    
    app.get("/*splat", (req, res) => {
        res.sendFile(path.join(path.resolve(), "../frontend/dist/index.html"))
    })
}


async function startServer() {
    await connectDB()

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}...`)
    })
}

startServer()