const log = require('debug')('web:logging')

const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, ()=>log(`Web listening on port ${port}!`));