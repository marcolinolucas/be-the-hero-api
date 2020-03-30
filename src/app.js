const express = require('express');
const cors = require('cors');

const statusError = require('./lib/statusError');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/ongs', require('./routes/ongRoutes'));
app.use('/incidents', require('./routes/incidentRoutes'));
app.use('/session', require('./routes/sessionRoutes'));

app.use((req, res) => statusError(res, 404, 'Not Found'));

app.listen(3333);
