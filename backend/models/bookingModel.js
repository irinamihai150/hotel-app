import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
	id: { type: Number, required: true },
	title: { type: String, required: true },
	firstName: { type: String, required: true },
	surname: { type: String, required: true },
	email: { type: String, required: true },
	roomId: { type: Number, required: true },
	checkInDate: { type: Date, required: true },
	checkOutDate: { type: Date, required: true },
})


bookingSchema.methods.getFormattedDate = function (dateField) {
	const date = this[dateField] // Access the value of the specified date field (e.g., 'checkInDate' or 'checkOutDate')
	return date ? date.toLocaleDateString() : ""
}

const Booking = mongoose.model("Booking", bookingSchema)

export default Booking
