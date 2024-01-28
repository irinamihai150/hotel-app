import React, { useState } from "react"

const Search = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState("")

	const handleSearch = () => {
		onSearch(searchTerm)
	}

	return (
		<div className='mb-4'>
			<input
				type='text'
				placeholder='Enter Name'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				style={{ marginLeft: "3px" }}
			/>
			<button onClick={handleSearch} style={{ marginLeft: "0.5em" }}>
				Search
			</button>
		</div>
	)
}

export default Search
