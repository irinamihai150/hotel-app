import express from "express"
import dotenv from "dotenv"
dotenv.config()
import bookings from "../backend/data/fakeData.js"

const port = process.env.PORT || 6000
const app = express()

app.get("/", (req, res) => {
	res.send("Api is running")
})

app.get("/api/bookings", (req, res) => {
	res.send(bookings)
})

app.get("/api/bookings/:bookingId", (req, res) => {
	const bookingId = parseInt(req.params.bookingId)
	console.log("Searching for booking with id:", bookingId)

	const booking = bookings.find((b) => b.id === bookingId)

	if (booking) {
		// console.log("Booking found:", booking)
		res.json(booking)
	} else {
		console.log("Booking not found")
		res.status(404).json({ error: "Booking not found" })
	}
})

app.listen(port, () => console.log(`Server is running on port ${port}`))
