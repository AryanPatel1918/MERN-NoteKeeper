import express from "express"
import noteRoutes from "./routes/noteRoutes.js"

const app = express()
// middleware to parse JSON request bodies
app.use(express.json())

app.use('/api/notes', noteRoutes)

app.listen(5000, () => {
    console.log(`Server is listening on port ${5000}`)
})