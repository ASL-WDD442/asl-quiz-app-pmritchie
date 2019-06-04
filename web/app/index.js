// pull in the express package
const express = require('express');
// add logger
const log = require('debug')('web:logging');
// adding another logger
const error = require('debug')('web:error');
// create an express app
const app = express();
// setting up folder to hold static files
app.use(express.static('public'));

app.use((req, res, next) => {
    log('\nRUNS ONCE FOR EVERY REQUEST');
    setTimeout(() => {next();},2000);
}, (req, res, next) => {
    log('WILL RUN WHEN NEXT IS CALLLLLED');
    next();
});
// route to specified middleware
app.use('/about', (req, res, next) => {
    log('This will run only on the /about page');
    next(new Error('Not Authorized'));
})

app.use((err, req, res, next) => {
    error('ERROR FOUND:', err);
    res.sendStatus(500);
})

// export the express app
module.exports = app;