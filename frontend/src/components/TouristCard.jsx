import React from "react"
import { Container, Card, Button } from "react-bootstrap"

const TouristCard = () => {
	return (
		<Container className='d-flex flex-column flex-sm-row'>
			<Card className='mb-3 p-3' style={{ marginRight: "0.5em" }}>
				<Card.Img
					variant='top'
					src='https://images.unsplash.com/photo-1621519604512-85ea63c15ca2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=779&q=80'
					alt='Glasgow'
				/>
				<Card.Body className='text-center'>
					<Card.Title className='text-center'>Glasgow</Card.Title>
					<Card.Text className='card-text'>
						Glasgow is Scotland's largest city, known for its rich history and
						vibrant culture.
					</Card.Text>
					<Button
						variant='primary'
						href='https://peoplemakeglasgow.com/'
						target='_blank'
					>
						Read More
					</Button>
				</Card.Body>
			</Card>

			<Card className='mb-3 p-3' style={{ marginRight: "0.5em" }}>
				<Card.Img
					variant='top'
					src='https://images.unsplash.com/photo-1631473130317-9cd893da371c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
					alt='Manchester'
				/>
				<Card.Body className='text-center'>
					<Card.Title className='text-center'>Manchester</Card.Title>
					<Card.Text className='card-text'>
						Explore the energetic city of Manchester, known for its diversity
						and character.
					</Card.Text>
					<Button
						variant='primary'
						href='http://visitmanchester.com'
						target='_blank'
					>
						Read More
					</Button>
				</Card.Body>
			</Card>

			<Card className='mb-3 p-3' style={{ marginRight: "0.5em" }}>
				<Card.Img
					variant='top'
					src='https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
					alt='London'
				/>
				<Card.Body className='text-center'>
					<Card.Title className='text-center'>London</Card.Title>
					<Card.Text className='card-text'>
						Experience the charm of London, a city with a rich history and
						cosmopolitan vibes.
					</Card.Text>
					<Button
						variant='primary'
						href='http://visitlondon.com'
						target='_blank'
					>
						Read More
					</Button>
				</Card.Body>
			</Card>
		</Container>
	)
}

export default TouristCard
