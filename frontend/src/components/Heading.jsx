import "../App.css"

const Heading = () => {
	return (
		<div className='logo-container mb-3'>
			<header className='App-header'>CYF Hotel</header>
			<div className='logo-wrapper'>
				<img
					src='https://images.unsplash.com/photo-1518556737724-e362c03e8740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvdGVsJTIwbG9nb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
					alt='CYF Hotel Logo'
					width={70}
					height={70}
				/>
			</div>
		</div>
	)
}

export default Heading
