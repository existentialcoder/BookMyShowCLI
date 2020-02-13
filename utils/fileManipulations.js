'use strict';
const SOURCE_FOLDER = 'api/';
const fse = require('fs-extra');

module.exports = {
	writeFile : (data, fileName, user_location) => fse.outputFileSync(`${SOURCE_FOLDER}/${user_location}/${fileName}.json`, JSON.stringify(data)),
	clearFolder : () => fse.remove(SOURCE_FOLDER)
};