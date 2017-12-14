const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	if(req.cookies.username){
		res.redirect('/index');
	} else {
		res.render('main', {
			question: "What is your name?",
		});
	}
});

router.post('/', (req, res) => {
	if(req.body.username){
		res.cookie('username', req.body.username);
		res.redirect('index');
	} else {
		res.redirect('/');
	}
});

router.get('/index', (req, res) => {
	if(req.cookies.username){
		res.render('index', {name: req.cookies.username});
	} else {
		res.redirect('/');
	}
});

router.post('/index', (req, res) => {
	res.clearCookie('username');
	res.redirect('/');
});


router.get('/users', (req, res) => {
	res.render('users', {userDetails});
});

module.exports = router;