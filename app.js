const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/pub'));

app.get('/', (req, res) => {
    res.send('<h1>Demo</h1>');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});