const express = require('express');
const router = express.Router();
const { data } = require('../data/flashCard.json');
const { cards } = data;

router.get('/', (req, res) => {		
	let randomIndex = Math.floor((Math.random() * (cards.length)) + 0);
	res.redirect(`/cards/${randomIndex}?side=question`);
});

router.get('/:index', (req, res) => { // All routes in here will start with /cards. So the root route / is in fact /cards
	const { side } = req.query;
	const { index } = req.params;
	let qa  = cards[index][side];
	const { hint } = cards[index];

	if(side == null || side == 'hint'){
		return res.redirect(`/cards/${index}?side=question`);
	}
	if(!req.cookies.username){
		return res.redirect('/');
	}
	res.render('cards', {
		name: req.cookies.username,
		qa: qa,
		hint: (side == 'question') ? hint : null,
		text: (side == 'question') ? 'Answers': 'Question',
		// url: '/cards/' + index + '?side=' + ((side == 'question') ? 'answer': 'question')
		id: '/cards/' + index,
		sideShow: (side == 'question' ? 'answer' : 'question'),
		side: side
	});
});

module.exports = router;