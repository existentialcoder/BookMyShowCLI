'use strict';
const program = require('commander');
// const { getLocation } = require('./src/getLocation');
const { clearFolder } = require('./utils/fileManipulations');

function getUserInputs (user_inputs) {
	const valid_inputs = Object
		.entries(user_inputs)
		.filter(input => input[1]);

	user_inputs = {};
	valid_inputs
		.forEach(input => user_inputs[input[0]] = input[1]);
	return user_inputs;
}

program
	.version('1.0.0')
	.description('CLI application to track movie tickets in BOOKMYSHOW');

program
	.command('check [location] [theater] [movie] [number-of-tickets] [date]')
	.alias('c')
	.description('Look for ticket availability of movies in your favourite theatres')
	.action(
		(location=null, theater=null, movie=null, number_of_tickets=null, date=null) => {
			clearFolder();
			const user_inputs = getUserInputs ({
				location,
				theater,
				movie,
				number_of_tickets,
				date
			});

			console.info(user_inputs);
		}
	);


program.parse(process.argv);
