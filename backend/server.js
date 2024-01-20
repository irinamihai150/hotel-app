dotenv.config()
import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import bookingRoutes from "./routes/bookingRoutes.js"

const port = process.env.PORT || 6000
connectDB() //connect to mongodb
const app = express()

app.get("/", (req, res) => {
	res.send("Api is running")
})
app.use("/api/bookings", bookingRoutes)

app.listen(port, () => console.log(`Server is running on port ${port}`))
