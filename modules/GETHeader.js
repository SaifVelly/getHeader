// In this file there are multiple modules to get informations form the header's req of GET HTTP method

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
        return next(err);
    }

}

// A function to get what the navigator is based on
function NavigatorBasedOn(req, res, next){
    const str = req.headers['user-agent'];
    if(!str || str.length == 0){
        console.error("There is no user-agent at the header");
        return next(new Error("No user-agent found"));
    }
    try{
    const StrArr = str.split('/');
    const version = StrArr[1].split('(');
    console.log(StrArr[0]+ ' : '+version[0] );
    next();
    } catch(err){
        console.error("Error : "+ err);
        return next(err);
    }


}



// A function to get the operating system of the client
function OS(req, res, next) {
    const userAgent = req.headers['user-agent'];

    if (!userAgent || userAgent.length === 0) {
        console.error("There is no user-agent in the header");
        return next(new Error("No user-agent found"));
    }

    try {
        const osRegex = /Windows NT|Mac OS X|Linux|Android|iOS/;
        const osMatch = userAgent.match(osRegex);

        if (osMatch) {
            const operatingSystem = osMatch[0];
            console.log("Operating System:", operatingSystem);
            res.locals.operatingSystem = operatingSystem;
        } else {
            console.error("Could not determine operating system");
            return next(new Error("Could not determine operating system"));
        }

        next();
    } catch (err) {
        console.error("Error extracting operating system information: " + err);
        return next(err);
    }
}



module.exports = {
    AcceptedLanguages,
    getHost,
    NavigatorBasedOn,
    OS
};
// module.exports = accessHeaders;