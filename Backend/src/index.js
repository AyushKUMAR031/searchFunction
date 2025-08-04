const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
require('dotenv').config();

console.log(process.env.PORT);

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

mongoose.connect(process.env.MONGODB_URI
).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});