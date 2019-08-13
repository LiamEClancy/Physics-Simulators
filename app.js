const express = require('express');

const app = express();
app.use(express.static('static'));
app.set('view engine', 'ejs');

const port = 3000;

app.listen(port, () => console.log(`Physics simulation listening on port ${port}!`));

let orbitData = {
	mass1: 1,
	mass2: 1,
	G: 6.67e-11,
	radius: 1
};

app.get('/orbit', (req, res) => {
	res.render('orbitSim', orbitData);
});

app.get('/cannon', (req, res) => {
	res.render('cannonSim');
});

app.get('/threejs', (req, res) => {
	res.render('index');
});
