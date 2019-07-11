const express = require('express');
const path = require('path');
const router = require('./routes/router');
const morgan = require('morgan');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()) // Use this after the variable declaration
app.use(express.static(path.join(__dirname, '..', 'public/')));

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Check out the app at http://localhost:${PORT}`);
});

app.use(morgan('combined'));
