// function accessHeaders(req, res) {
//     const { host, connection, 'user-agent': userAgent, 'content-type': contentType, 'accept-language':AcceptedLanguages } = req.headers;
//     console.log('Host:', host);
//     console.log('Connection:', connection);
//     console.log('User-Agent:', userAgent);
//     console.log('Content-Type:', contentType);
//     console.log('accept-laanguage',AcceptedLanguages );
  
//   }

// A function to get the host 

function getHost(req, res, next){
    // console.log(req.url)
    const host = req.headers.host;
    if(!host){
        console.error('Host not found');
        return res.status(400).send('Host not found');
    }
    console.log('The host is:', host);
    next();
    }
 

//A function to get the accepted languages by the client 
function AcceptedLanguages(req, res, next){
    // console.log('AcceptedLanguages middleware running');  
    //console.log('URL:', req.url);  
    const acceptedLang = req.headers['accept-language'];

    if (!acceptedLang) {
        console.error('Accept-Language header not found.');
        return res.status(400).send('Accept-Language header is missing.');
    }

    try{
        const languages = acceptedLang.split(',');

    if (!languages || languages.length === 0) {
        console.error('Invalid Accept-Language header format.');
        return res.status(400).send('Invalid Accept-Language header format.');
    }

    languages.forEach((language) => {
        const [langCode, qualityString] = language.split(';');
        let quality = 1.0;  // Default quality
    
        if (qualityString && qualityString.includes('=')) {
            quality = parseFloat(qualityString.split('=')[1]);
        }
        //langCode methode removes any spaces, tabs, newlines, etc from the beggining and the end of langCode
    
        console.log(`${langCode.trim()}: ${quality}`);
    });
    next();
    }catch(err){
        console.log("Error : "+err);
    }

}


module.exports = {
    AcceptedLanguages,
    getHost
};
// module.exports = accessHeaders;