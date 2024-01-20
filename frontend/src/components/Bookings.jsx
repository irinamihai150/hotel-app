import React from "react"
import fakeData from "../data/fakeData"
import { Container, Table } from "react-bootstrap"

const Bookings = () => {
	return (
		<Container
			className='d-flex justify-content-center align-items-center'
			// style={{ minHeight: "100vh" }}
		>
			<div className='text-center'>
				<h2>Bookings</h2>
				<Table striped bordered hover>
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
						{fakeData.map((booking) => (
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
