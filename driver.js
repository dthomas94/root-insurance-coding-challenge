function Driver(name) {
	this.name = name;
	this.trips = [];
}

Driver.prototype.addTrip = function(startTime, endTime, distance) {
	this.trips.push({
		startTime,
		endTime,
		distance,
	});
};

Driver.prototype.tripsReport = function() {
	return this.calcTripsReport();
};

Driver.prototype.calcTripsReport = function() {
	const totals = this.trips.reduce(
		(prevTrip, trip) => {
			const endTimeAsNum = parseFloat(trip.endTime.replace(":", "."));
			const startTimeAsNum = parseFloat(trip.startTime.replace(":", "."));

			return {
				milesDriven: prevTrip.milesDriven + parseFloat(trip.distance),
				timeSpentDriving:
					prevTrip.timeSpentDriving + (endTimeAsNum - startTimeAsNum),
			};
		},
		{ milesDriven: 0, timeSpentDriving: 0 }
	);

    let averageSpeed = 0;
    // if timeSpentDriving is less than an "hour"
	if (totals.timeSpentDriving < 0.6)
		averageSpeed = (totals.milesDriven / (totals.timeSpentDriving * 100)) * 60;
	else {
		let [hours, minutes] = totals.timeSpentDriving
			.toFixed(2)
			.toString()
			.split(".");
		const totalTimeAsMinutes = (hours * 60) / 100 + minutes / 100;
		averageSpeed = (totals.milesDriven * 60) / totalTimeAsMinutes / 100;
	}

	const report = {
		...totals,
		averageSpeed,
	};

	return report;
};

module.exports = {
	Driver,
};
