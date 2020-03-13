const express = require('express');
const app = express();
const article1 = require('./json/article-1.json');
const article2 = require('./json/article-2.json');
const article3 = require('./json/article-3.json');
const article4 = require('./json/article-4.json');
const article5 = require('./json/article-5.json');

/* Serve static assets */

app.use('/assets', express.static(__dirname + '/public'));

/* Web Routes */

const shuffle = function(array) {
	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/articles', (req, res) => {
	const articles = [article1, article2, article3, article4, article5];
	return res.status(200).json(shuffle(articles));
});

app.listen(3000);
