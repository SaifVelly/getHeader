const express = require('express');
const app = express();
const { AcceptedLanguages, getHost, NavigatorBasedOn, OS } = require('./modules/GetHeader');  // Import both correctlyconst app = express();
app.use(express.json());




app.get('/',AcceptedLanguages, getHost, (req, res) => {
    res.send(req.headers);
});


app.get('/test', OS, (req, res) => {
    res.send(req.headers);
});
app.get('/p',NavigatorBasedOn, (req, res) => {
    res.send(req.headers);
});

app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
});