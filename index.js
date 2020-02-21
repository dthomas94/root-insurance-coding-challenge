const readline = require("readline");
const fs = require("fs");
const { Driver } = require("./driver");

let drivers = [];

const readInterface = readline.createInterface({
	input: fs.createReadStream("input.txt"),
	console: false,
});

readInterface.on("line", function(line) {
	const lineArray = line.toString().split(" ");
	const [command, ...data] = lineArray;
	
	if (command === "Driver") {
		const driver = createDriver(data[0]);
		drivers.push(driver);
	} else {
		addDriverTrip(data);
	}
});

// print results when the end of the file has been reached
readInterface.on("close", function() {
	generateAllDriversReport();
});

const createDriver = name => {
	const driver = new Driver(name);
	return driver;
};

const addDriverTrip = args => {
	const [name, startTime, endTime, distance] = args;
	const [existingDriver] = drivers.filter(driver => driver.name === name);
	existingDriver.addTrip(startTime, endTime, distance);
};

const generateAllDriversReport = () => {
	const allDriversReport = drivers.reduce((prevVal, driver) => {
		return [
			...prevVal,
			{
				name: driver.name,
				...driver.tripsReport(),
			},
		];
	}, []);

	const sortedAllDriversReport = allDriversReport.sort(
		(driverReport1, driverReport2) =>
			driverReport2.milesDriven - driverReport1.milesDriven
	);

	sortedAllDriversReport.forEach(driverReport => {
		console.log(
			`${driverReport.name}: ${Math.round(driverReport.milesDriven)} miles ${
				!isNaN(driverReport.averageSpeed)
					? `@ ${Math.round(driverReport.averageSpeed)} mph`
					: ""
			}`
		);
	});
};

fs.createReadStream("input.txt");
