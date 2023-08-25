const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// Middleware for serving static files
app.use(express.static('public'));
app.use("/css", express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/fonts', express.static(__dirname + '/public/fonts'));

// Set template Engine
app.set('view engine', 'ejs');

// Navigation
app.get('', (req, res) => {
    res.render('index');
});

// Start the server
app.listen(port, () => {
    console.info(`App listening on port ${port}`);
});