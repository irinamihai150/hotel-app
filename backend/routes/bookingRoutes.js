import express from "express"
import pool from "../config/db.js"

const router = express.Router()

const SELECT_ALL_BOOKINGS_QUERY = "SELECT * FROM guests"

router.get("/", async (req, res) => {
	try {
		const { rows } = await pool.query(SELECT_ALL_BOOKINGS_QUERY)

		const formattedBookings = rows.map((guest) => ({
			id: guest.id,
			title: guest.title,
			firstName: guest.firstname,
			surname: guest.surname,
			email: guest.email,
			roomId: guest.roomid,
			checkInDate: new Date(guest.checkindate).toLocaleDateString(),
			checkOutDate: new Date(guest.checkoutdate).toLocaleDateString(),
		}))

		res.json(formattedBookings)
	} catch (error) {
		console.error("Error fetching bookings guests:", error.message)
		res.status(500).json({ message: "Internal Server Error" })
	}
})

router.get("/search", async (req, res) => {
	const { query } = req.query

	try {
		const SEARCH_BOOKINGS_QUERY = `
      SELECT *
      FROM guests
      WHERE LOWER(firstname) LIKE LOWER($1) OR LOWER(surname) LIKE LOWER($1)
    `

		const { rows: matchingBookings } = await pool.query(SEARCH_BOOKINGS_QUERY, [
			`%${query}%`,
		])

		const formattedMatchingBookings = matchingBookings.map((guest) => ({
			id: guest.id,
			title: guest.title,
			firstName: guest.firstname,
			surname: guest.surname,
			email: guest.email,
			roomId: guest.roomid,
			checkInDate: new Date(guest.checkindate).toLocaleDateString(),
			checkOutDate: new Date(guest.checkoutdate).toLocaleDateString(),
		}))

		res.json(formattedMatchingBookings)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Internal Server Error" })
	}
})

export default router
