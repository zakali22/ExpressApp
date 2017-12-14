const express = require('express'); // Allows us to use the Express module
const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser');
const router = express.Router();
const app = express(); // Calls the Express application to use


app.use(bodyParser.urlencoded({ extended: false })); // Specifically using the middleware body-parser to handle data from HTML forms
app.use(cookieParser());
app.use('/static', express.static('public'))
app.set('view engine', 'pug'); // Sets the view to be pug files


const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

// Middleware for error handling

app.use((req, res, next) => { // Middleware must contain next
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => { // Middleware must contain next
	res.status(err.status);
	res.render('error', { error: err });
});

app.listen(3000, () => {
	console.log('App is running in localhost:3000');
}); // Uses the localhost:3000 as the browser