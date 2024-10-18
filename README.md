## HTTP GET Header Extractor

### Introduction

This Node.js module provides a collection of modular functions designed to extract information from the request headers of a GET HTTP request. It's a valuable tool for applications that need to analyze client information or tailor responses based on header data.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SaifVelly/getHeader.git
   ```

### Usage

#### Import the module:
```javascript
const getHeader = require('.modules/GETHeader.js'); 
```

#### Use the functions in your Express application:
```javascript
const express = require('express');
const app = express();

app.get('/', getHeader.getHost, (req, res) => {
  // Access extracted information from req object (e.g., req.host)
  console.log('Host:', req.host);
  res.send('Hello World!');
});

app.listen(3000, () => console.log('Server listening on port 3000'));
```

### Available Functions

**1. getHost(req, res, next):**

* Extracts the `Host` header value.
* Logs the extracted host name to the console.
* Sets the extracted host name on `req.host` for further use.

**2. AcceptedLanguages(req, res, next):**

* Extracts the accepted languages from the `Accept-Language` header.
* Logs each accepted language and its quality value to the console.

**3. NavigatorBasedOn(req, res, next):**

* Extracts the browser name and version from the `User-Agent` header.
* Logs the browser name and version to the console.

**4. Navigator(req, res, next):**

* Extracts the entire client browser information from the `User-Agent` header.
* Logs the complete user-agent string to the console.

**5. OS(req, res, next):**

* Extracts the operating system of the client from the `User-Agent` header.
* Logs the detected operating system to the console.
* Sets the detected operating system on `req.locals.operatingSystem` for further use.

**6. AcceptedData(req, res, next):**

* Extracts the data formats the client is willing to accept from the `Accept` header.
* Logs the list of accepted data formats to the console.

**7. ConnectionType(req, res, next):**

* Extracts the type of connection established between the server and client from the `Connection` header.
* Logs the connection type to the console.

**8. EncodingType(req, res, next):**

* Extracts the content encoding types the client can accept from the `Accept-Encoding` header.
* Logs the list of accepted encoding types to the console.

**9. HTTPSAccepted(req, res, next):**

* Checks if the client allows HTTPS connections based on the `Upgrade-Insecure-Requests` header (optional header).
* Logs whether HTTPS is allowed or not to the console.

### Error Handling
All functions handle potential errors by logging them and calling `next(err)` to propagate the error to the error handler middleware in your Express application.

### Example Usage
```javascript
app.get('/', headerExtractor.getHost, headerExtractor.AcceptedLanguages, (req, res) => {
  console.log('Host:', req.host);
  console.log('Accepted languages:', req.acceptedLanguages); // Assuming you've stored extracted languages on req
  res.send('Hello World!');
});
```

### Additional Notes
* This module is designed to be used in a Node.js environment with Express.
* You can customize the functions to extract additional information or format the output as needed.
* Consider using a more robust HTTP header parsing library for complex scenarios.

By following these guidelines, you can effectively use this module to extract valuable information from HTTP request headers in your Node.js applications.
