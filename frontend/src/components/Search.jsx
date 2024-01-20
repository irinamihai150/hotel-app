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
			/>
			<button onClick={handleSearch}>Search</button>
		</div>
	)
}

export default Search
