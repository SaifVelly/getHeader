// In this file there are multiple modules to get informations form the header's req of GET HTTP method

function getHost(req, res, next){
    // console.log(req.url)
    const host = req.headers.host;
    if(!host){
        console.error('Host not found');
        return res.status(400).send('Host not found');
        next();

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
        next();

    }

    try{
        const languages = acceptedLang.split(',');

    if (!languages || languages.length === 0) {
        console.error('Invalid Accept-Language header format.');
        return res.status(400).send('Invalid Accept-Language header format.');
        next();

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
    const UserAgent = req.headers['user-agent'];
    if(!UserAgent || UserAgent.length == 0){
        console.error("There is no user-agent at the header");
        res.status(400).send("No user-agent found");
        next();

    }
    try{
    const StrArr = UserAgent.split('/');
    const version = StrArr[1].split('(');
    console.log(StrArr[0]+ ' : '+version[0] );
    next();
    } catch(err){
        console.error("Error : "+ err);
        return next(err);
    }


}


// A function that helps u get the client's Navigator

function Navigator(req, res, next){
    const UserAgent = req.headers['user-agent'];
    if(!UserAgent || UserAgent.length == 0){
        console.error("There is no user-agent at the header");
        res.status(400).send("No user-agent found");
    }
    try{
    const elts = UserAgent.split(' ');
    console.log(elts[elts.length - 1]);
    next();
    } catch(err){
        console.error("Error : "+err);
        return(next(err));
    }
}



// A function to get the operating system of the client
function OS(req, res, next) {
    const userAgent = req.headers['user-agent'];

    if (!userAgent || userAgent.length === 0) {
        console.error("There is no user-agent in the header");
        res.status(400).send("No user-agent found");
        next();
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

// A function to get the data format accepted by the client 
function AcceptedData(req, res, next){
    const accept = req.headers.accept;
    if(!accept || accept.length == 0){
        console.erroe("Accepted data can't be accessible");
        res.status(400).send("No accepted data found !");
    } try{
        const Accepteddata = accept.split(',');
        console.log(Accepteddata);
        next();
        
    } catch(err){
        console.error("Error extracting Accepted data information : " + err);
        return next(err);

    }
}

// A functino to get the type of estabilished connection between the server and the nav
function ConnectionType (req, res, next){
    const connection = req.headers.connection;
    if(!ConnectionType) {
        console.error("Connection type can't be accessible");
        res.status(400).send("No connection element found at the header !");
    } 
    try{
        console.log("The type of connection is : "+connection);
        next();
    } catch(err){
        console.error("Error extracting the type of connection : " + err);
        return next(err);
    }
}

//A fucntion to get the types of content encoding that the client is willing to accept in the response 
function EncodingType (req, res, next){
    const encoding = req.headers['accept-encoding'];
    const EncodType = encoding.split(',');
    if(!encoding){
        console.error("The data encoding type cannot be accessible !");
        res.status(400).send("No data encoding type found at the header !");

    }
    try{
        console.log(EncodType);
        next();
    } catch(err){
        console.error("Error extracting the data type encoding : "+err);
        return next(err);
    }
}



// A function to check if the HTTPS is allowed or not 
function HTTPSAccepted (req, res, next){
    const accepted = req.headers['upgrade-insecure-requests'];
    if(!accepted){
        console.error("Checking if HTTPS is allowed can't be accessible !");
    }
    try{
        if(accepted == 1){
            console.log("Yes, HTTPS is allowed");
        } else{
            console.log("HTTPS is not allowd !");
        }
        next();

    } catch(err){
        console.error("Error checking is HTTPS is allowed or not : "+err);
        return next(err);
    }
}







module.exports = {
    AcceptedLanguages,
    getHost,
    NavigatorBasedOn,
    OS,
    Navigator,
    AcceptedData,
    ConnectionType,
    EncodingType,
    HTTPSAccepted
    
};
// module.exports = accessHeaders;