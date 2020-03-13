'use strict';

window.addEventListener('DOMContentLoaded', () => fetchArticles());

async function fetchArticles() {
	try {
		const response = await fetch('/articles');
		const articles = await response.json();
		localStorage.setItem('articles', JSON.stringify(articles));
		renderArticle(articles[0], 1);
	} catch (err) {
		// Handle this error
		console.log(err);
	}
}

function getNextArticle(nextArticleIndex) {
	document.querySelector('main').innerHTML = '';

	setTimeout(function() {
		const articles = localStorage.getItem('articles')
			? JSON.parse(localStorage.getItem('articles'))
			: null;

		if (!articles) {
			// Handle no articles error and add a return
		}

		const nextItemIndex =
			articles.length - 1 === nextArticleIndex ? 0 : nextArticleIndex + 1;

		renderArticle(articles[nextArticleIndex], nextItemIndex);
	}, 10);
}

function renderReadItem(itemIndex) {
	const articles = localStorage.getItem('articles')
		? JSON.parse(localStorage.getItem('articles'))
		: null;

	if (!articles) {
		// handle
	}

	const li = document.createElement('li');
	li.classList.add('article-read-link');

	const a = document.createElement('a');
	a.href = '#';
	a.textContent = articles[itemIndex].title;

	li.append(a);

	document.getElementById('articles-read').append(li);
}

function setAttributes(el, attrs) {
	for (var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}

function renderArticle(data, nextArticleIndex) {
	const main = document.querySelector('main');

	const articleTitle = document.createElement('h1');
	setAttributes(articleTitle, {
		id: 'article-title'
	});
	articleTitle.textContent = data.title;
	main.append(articleTitle);

	for (let i = 0; i < data.body.length; i++) {
		if (data.body[i].type === 'heading') {
			const heading = document.createElement('h2');
			setAttributes(heading, {
				id: 'article-heading'
			});
			heading.textContent = data.body[i].model.text;
			main.append(heading);
		} else if (data.body[i].type === 'image') {
			const image = document.createElement('img');
			setAttributes(image, {
				src: data.body[i].model.url,
				altText: data.body[i].model.altText,
				height: data.body[i].model.height,
				width: data.body[i].model.width
			});
			main.append(image);
		} else if (
			data.body[i].type === 'list' &&
			data.body[i].model.type === 'unordered'
		) {
			const ul = document.createElement('ul');
			for (let j = 0; j < data.body[i].model.items.length; j++) {
				const li = document.createElement('li');
				li.textContent = data.body[i].model.items[j];
				ul.append(li);
			}
			main.append(ul);
		} else {
			const paragraph = document.createElement('p');
			paragraph.textContent = data.body[i].model.text;
			main.append(paragraph);
		}
	}
	const nextArticleBtn = document.createElement('button');
	setAttributes(nextArticleBtn, {
		id: 'next-article-btn'
	});
	nextArticleBtn.textContent = 'Next Article';
	nextArticleBtn.addEventListener('click', e => {
		e.preventDefault();
		getNextArticle(nextArticleIndex);
	});

	const articles = localStorage.getItem('articles')
		? JSON.parse(localStorage.getItem('articles'))
		: null;

	if (!articles) {
		// handle
	}

	if (nextArticleIndex === 0) {
		return null;
	}

	renderReadItem(
		nextArticleIndex === 0 ? articles.length - 1 : nextArticleIndex - 1
	);
	main.append(nextArticleBtn);
}
