import express from "express"
const router = express.Router()
import Booking from "../models/bookingModel.js"
// import bookings from "../data/fakeData.js"

router.get("/", async (req, res) => {
	try {
		const bookings = await Booking.find()
		const formattedBookings = bookings.map((booking) => ({
			id: booking.id,
			title: booking.title,
			firstName: booking.firstName,
			surname: booking.surname,
			email: booking.email,
			roomId: booking.roomId,
			checkInDate: booking.getFormattedDate("checkInDate"),
			checkOutDate: booking.getFormattedDate("checkOutDate"),
		}))

		res.json(formattedBookings)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

router.get("/search", async (req, res) => {
	const { query } = req.query

	try {
		const matchingBookings = await Booking.find({
			$or: [
				{ firstName: { $regex: query, $options: "i" } }, // Case-insensitive regex for firstName
				{ surname: { $regex: query, $options: "i" } }, // Case-insensitive regex for surname
			],
		})

		const formattedMatchingBookings = matchingBookings.map((booking) => ({
			id: booking.id,
			title: booking.title,
			firstName: booking.firstName,
			surname: booking.surname,
			email: booking.email,
			roomId: booking.roomId,
			checkInDate: booking.getFormattedDate("checkInDate"),
			checkOutDate: booking.getFormattedDate("checkOutDate"),
		}))

		res.json(formattedMatchingBookings)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
export default router
