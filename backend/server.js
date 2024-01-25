import express from "express"
import dotenv from "dotenv"
import pool from "./config/db.js"
import bookingRoutes from "./routes/bookingRoutes.js"
import path from "path"
import { fileURLToPath } from "url"
import cors from "cors"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const port = process.env.PORT || 6000

dotenv.config()
const app = express()
app.use(cors())
app.use("/api/bookings", bookingRoutes)

if (process.env.NODE_ENV === "production") {
	// set static folder
	app.use(express.static(path.join(__dirname, "../frontend/build")))

	// any route that is not api will be redirected to index.html
	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
	)
} else {
	app.get("/", (req, res) => {
		res.send("Api is running")
	})
}

app.listen(port, () => console.log(`Server is running on port ${port}`))
