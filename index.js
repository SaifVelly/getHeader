const express = require('express');
const app = express();
const {HTTPSAccepted, EncodingType, AcceptedLanguages, getHost,ConnectionType, NavigatorBasedOn, OS,Navigator,AcceptedData } = require('./modules/GetHeader');  // Import both correctlyconst app = express();
app.use(express.json());




app.get('/', HTTPSAccepted, (req, res) => {
    res.send(req.headers);
});


app.get('/test', Navigator, (req, res) => {
    // console.log(req.headers);
    res.send(req.headers);
});
app.get('/p',NavigatorBasedOn, (req, res) => {
    res.send(req.headers);
});

app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
});