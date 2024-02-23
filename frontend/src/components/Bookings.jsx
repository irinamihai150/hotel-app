import React, { useEffect, useState } from "react"
import { Container, Table } from "react-bootstrap"
import axios from "axios"
import SearchButton from "./Search.jsx"

const Bookings = () => {
	const [bookings, setBookings] = useState([])
	const [selectedBooking, setSelectedBooking] = useState(null)

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await axios.get(
					"http://ec2-3-255-191-145.eu-west-1.compute.amazonaws.com:5000/api/bookings",
					{
						headers: {
							method: "GET",
							mode: "cors",
							body: JSON.stringify(),
							headers: { ContentType: "application/json" },
						},
					}
				)
				const { data } = response

				if (Array.isArray(data)) {
					setBookings(data)
				} else {
					console.error("Invalid data format:", data)
				}
			} catch (error) {
				console.error("Error fetching bookings:", error)
			}
		}

		fetchBookings()
	}, [])

	const handleSearch = async (query) => {
		try {
			const response = await axios.get(
				`http://ec2-3-255-191-145.eu-west-1.compute.amazonaws.com:5000/api/bookings/search?query=${query}`
			)
			setBookings(response.data)
			// Reset selectedBooking when performing a new search
			// setSelectedBooking(null)
		} catch (error) {
			console.error("Error searching for booking:", error)
			setBookings([])
			setSelectedBooking(null)
		}
	}

	const handleBookingClick = (booking) => {
		setSelectedBooking(booking)
	}

	return (
		<Container className='d-flex justify-content-center align-items-center'>
			<div className='text-center' style={{ overflowX: "auto" }}>
				<h2>Bookings</h2>
				<SearchButton onSearch={handleSearch} />
				<Table striped bordered hover responsive>
					<thead>
						<tr>
							<th>Title</th>
							<th>First Name</th>
							<th>Surname</th>
							<th>Email</th>
							<th>Room ID</th>
							<th>Check In Date</th>
							<th>Check Out Date</th>
						</tr>
					</thead>
					<tbody>
						{bookings.length > 0 ? (
							bookings.map((booking) => (
								<tr
									key={booking.id}
									onClick={() => handleBookingClick(booking)}
								>
									<td>{booking.title}</td>
									<td>{booking.firstName}</td>
									<td>{booking.surname}</td>
									<td>{booking.email}</td>
									<td>{booking.roomId}</td>
									<td>{booking.checkInDate}</td>
									<td>{booking.checkOutDate}</td>
								</tr>
							))
						) : (
							<tr>
								<td> No bookings found</td>
							</tr>
						)}
					</tbody>
				</Table>

				{selectedBooking && (
					<div>
						<h3>Selected Booking Details:</h3>
						<p>ID: {selectedBooking.id}</p>
						<p>Title: {selectedBooking.title}</p>
						<p>First Name: {selectedBooking.firstName}</p>
						<p>Surname: {selectedBooking.surname}</p>
						<p>Email: {selectedBooking.email}</p>
						<p>Room ID: {selectedBooking.roomId}</p>
						<p>Check In Date: {selectedBooking.checkInDate}</p>
						<p>Check Out Date: {selectedBooking.checkOutDate}</p>
					</div>
				)}
			</div>
		</Container>
	)
}

export default Bookings
