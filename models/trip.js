const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
	driverId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	locationFrom: { type: String, required: true },
	locationTo: { type: String, required: true },
	startTime: { type: Date, required: true },
	availableSeat: { type: Number, required: true },
	passengerId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	fee: { type: Number, required: true },
	isFinished: { type: Boolean, default: false }
});

const Trip = mongoose.model("Trip", TripSchema);

module.exports = { Trip, TripSchema };
