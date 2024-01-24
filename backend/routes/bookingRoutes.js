import express from "express"
import pool from "../config/db.js"

const router = express.Router()

const SELECT_ALL_BOOKINGS_QUERY = "SELECT * FROM guest"

router.get("/", async (req, res) => {
	try {
		const { rows } = await pool.query(SELECT_ALL_BOOKINGS_QUERY)

		const formattedBookings = rows.map((booking) => ({
			id: booking.id,
			title: booking.title,
			firstName: booking.firstname,
			surname: booking.surname,
			email: booking.email,
			roomId: booking.roomid,
			checkInDate: new Date(booking.checkindate).toLocaleDateString(),
			checkOutDate: new Date(booking.checkoutdate).toLocaleDateString(),
		}))

		res.json(formattedBookings)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Internal Server Error" })
	}
})

router.get("/search", async (req, res) => {
	const { query } = req.query

	try {
		const SEARCH_BOOKINGS_QUERY = `
      SELECT *
      FROM bookings
      WHERE LOWER(first_name) LIKE LOWER($1) OR LOWER(surname) LIKE LOWER($1)
    `

		const { rows: matchingBookings } = await pool.query(SEARCH_BOOKINGS_QUERY, [
			`%${query}%`,
		])

		const formattedMatchingBookings = matchingBookings.map((booking) => ({
			id: booking.id,
			title: booking.title,
			firstName: booking.first_name,
			surname: booking.surname,
			email: booking.email,
			roomId: booking.room_id,
			checkInDate: booking.check_in_date,
			checkOutDate: booking.check_out_date,
		}))

		res.json(formattedMatchingBookings)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Internal Server Error" })
	}
})

export default router
