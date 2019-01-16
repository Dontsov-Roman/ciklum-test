const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const randomError = require('./middlewares/randomError');
const routes = require('./routes');

const port    = process.env.PORT;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_name = process.env.DB_NAME;
const db_url = `mongodb://${db_host}:${db_port}/${db_name}`;

const app = express();

mongoose.connect(db_url).then(() => {
    console.info('Successfully connected to DB')
}).catch(err => {
    console.error(err)
});

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(cors());

// app.use(randomError);

app.use('/api', routes);

app.listen(port, () => console.log(`App is listening on port ${port}`));
