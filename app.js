require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose= require('mongoose');
const path = require('path');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
const app = express();

app.set('views', path.join(__dirname, 'src', 'app', 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'src', 'app', 'public')));

require('./src/app/routers/index')(app);

app.listen(process.env.PORT);
