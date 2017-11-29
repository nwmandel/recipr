var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 5000;

// dont know but it works
app.use('/dist', express.static('dist'));

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

app.listen(port, error => {
    error
    ? console.error(error)
    : console.info('Listening on port'+ port);
});
