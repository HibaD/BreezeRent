const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use('/Styles',  express.static(__dirname + '/Styles'));
app.use('/Scripts', express.static(__dirname + '/Scripts'));
app.use('/Views',  express.static(__dirname + '/Views'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Views/index.html');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});