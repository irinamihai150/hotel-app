import React, { useEffect, useState } from "react"
import { Container, Table } from "react-bootstrap"
import axios from "axios"

const Bookings = () => {
	const [bookings, setBookings] = useState([])

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const { data } = await axios.get("api/bookings")
				setBookings(data)
			} catch (error) {
				console.error("Error fetching bookings:", error)
			}
		}

		fetchBookings()
	}, [])

	return (
		<Container className='d-flex justify-content-center align-items-center'>
			<div className='text-center' style={{ overflowX: "auto" }}>
				<h2>Bookings</h2>
				<Table striped bordered hover responsive>
					<thead>
						<tr>
							<th>ID</th>
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
						{bookings.map((booking) => (
							<tr key={booking.id}>
								<td>{booking.id}</td>
								<td>{booking.title}</td>
								<td>{booking.firstName}</td>
								<td>{booking.surname}</td>
								<td>{booking.email}</td>
								<td>{booking.roomId}</td>
								<td>{booking.checkInDate}</td>
								<td>{booking.checkOutDate}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</Container>
	)
}

export default Bookings
