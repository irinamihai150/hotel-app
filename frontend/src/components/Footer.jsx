const Footer = () => {
	const contacts = [
		"123 Fake Street, London, E1 4UD",
		"hello@fakehotel.com",
		"0123 45678",
	]

	return (
		<footer style={{ backgroundColor: "#f0f0f0" }}>
			<ul>
				{contacts.map((contact, index) => (
					<li
						key={index}
						style={{
							listStyle: "none",
							textAlign: "center",
							marginTop: "4px",
						}}
					>
						{contact}
					</li>
				))}
			</ul>
		</footer>
	)
}

export default Footer
