
import "./App.css"
import Heading from "./components/Heading"
import Bookings from "./components/Bookings"
import TouristCard from "./components/TouristCard"
import Footer from "./components/Footer"

function App() {
	return (
		<div className='App'>
			<Heading />
			<TouristCard />
			<Bookings />
			<Footer />
		</div>
	)
}

export default App
