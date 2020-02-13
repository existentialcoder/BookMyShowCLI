
  
'use strict';
const request = require('request');
const cheerio = require('cheerio');
const { getLocation } = require('./getLocation');
const URLS = require('../db/URLS.json');
const { writeFile } = require('../utils/fileManipulations');
const SUCCESS_CODE = 200;

function pushMovieDetails(movieHTML, allMovies) {
	allMovies.push({
		name : movieHTML.children().attr('title'),
		categories : movieHTML.attr('data-filter').split('|').slice(1),
		link : `${URLS.BASE_URL}${movieHTML.children().attr('href')}`,
		image : movieHTML.find('.__poster').attr('data-src').slice(2),
		rating : movieHTML.find('.__percentage').text(),
		votes : movieHTML.find('.card-left .popularity .__votes .__count').text(),
		censor : movieHTML.find('.censor').text().split(' ')[0],
		language : movieHTML.find('.__language').text()
	});
	return allMovies;
}


async function scrapeLocationPage(user_location) {
	const moviePageURL = `${URLS.BASE_URL}/${user_location}/${URLS.MOVIES_URL}`;

	try {
		request(moviePageURL, (er, response, html) => {
			if (!er && response.statusCode === SUCCESS_CODE) {
				const $ = cheerio.load(html);
				const moviesHTML = $('.movie-card-container');
				let allMovies = [];

				moviesHTML.each((i, el) => {
					allMovies = pushMovieDetails($(el), allMovies);
				});
				writeFile(allMovies, 'movies', user_location);
			}
		});
	} catch (er) {
		console.info(er);
	}
}



module.exports = {
	generateMoviesByLocation : async() => {
		const user_location = await getLocation();

		await scrapeLocationPage(user_location);
	}
};
