const express = require('express');
const path = require('path');
const cors = require('cors');
const { allowedNodeEnvironmentFlags } = require('process');

const app = express();

const poll = require('./routes/poll');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());

app.use('/poll', poll);

const port = 3000;

app.listen(port, () => console.log('Server started'));

