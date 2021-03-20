const test = require('./routes/test');
const auth = require('./routes/auth');
const users = require('./routes/users');
const coins = require('./routes/coins')
const wallets = require('./routes/wallets');
const express = require('express');

const routes = () => {
	const app = express();
	auth(app);
	test(app);
	users(app);
	coins(app);
	wallets(app);
	return app
}

module.exports = routes;
