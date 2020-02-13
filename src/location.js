'use strict';
const CITIES = require('../db/cityinfo.json');
const enquirer = require('enquirer');
const capitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

function retrieveCity(city) {
	const cities = CITIES.allCities
		.includes(`${city[0].toLowerCase()}${city.slice(1)}`) ? CITIES.allCities :
		CITIES.allNCRRegions;

	return cities
		.find(cityName => capitalize(cityName) === city);
}

const allCities = CITIES.allCities
	.map(city => capitalize(city))
	.sort();

const ncrCities = CITIES.allNCRRegions
	.map(ncrRegion => capitalize(ncrRegion))
	.sort();

const promptCity = (params) => new enquirer.Select(params);

async function getLocation() {
	try {
		const promptParams = {
			name: 'selectedCity',
			message: 'Choose your location',
			choices: allCities
		};
		const cityPrompt = await promptCity(promptParams);
		let selectedCity = await cityPrompt.run();

		if (selectedCity !== 'Ncr') {
			return retrieveCity(selectedCity);
		}
		promptParams.message = 'Where at NCR?';
		promptParams.choices = ncrCities;
		const ncrPrompt = await promptCity(promptParams);

		selectedCity = await ncrPrompt.run();
		return retrieveCity(selectedCity);
	}
	catch (er) {
		console.error(er);
	}
}

module.exports = {
	getLocation
};