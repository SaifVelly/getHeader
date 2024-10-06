const express = require('express');
const app = express();
const { AcceptedLanguages, getHost } = require('./modules/Header');  // Import both correctlyconst app = express();
app.use(express.json());




app.get('/',AcceptedLanguages, getHost, (req, res) => {
    res.send(req.headers);
});


app.get('/test', getHost, (req, res) => {
    res.send(req.headers);
});
app.get('/p', (req, res) => {
    res.send(Object.keys(req.headers));
});

app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
});