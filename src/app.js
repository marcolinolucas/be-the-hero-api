const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/ongs', require('./routes/ongRoutes'));
app.use('/incidents', require('./routes/incidentRoutes'));
app.use('/session', require('./routes/sessionRoutes'));
app.use('/auth', require('./routes/authorizeRoutes'));

app.use(errors());

app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

module.exports = app;
