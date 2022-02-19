const express = require('express');
const routes = require('./routes');
const path = require('path');
// Creating an express application
const app = express();

// Using EJS as the default engine
app.set('view engine', 'ejs');

// Letting the app know the location of "views"
app.set('views', path.join(__dirname, 'views'));

// Setting "public" as the default path to the static files of the application
app.use(express.static('public'));

// Middleware
app.use(express.urlencoded({ extended: true }));

// Importing routes to the application
app.use(routes);

// Setting up the server on port 3333
const PORT = 3333;
app.listen(PORT, () => {
  console.log('Server is running on port + ', PORT);
});
