const bodyParser = require('body-parser')
const compression = require('compression')
const mongoose = require('mongoose');
const cors = require('cors')

const express = require('express');

const app = express();

require('dotenv').config()

const mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use(express.static('./build'))

const routes = require('./routes')
app.use('/api', routes)

const port = 4000;
app.listen(port, '0.0.0.0', () => {
    console.log(`listening on http://0.0.0.0:${port}`)
});