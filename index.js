/*eslint-disable no-undef*/
var http = require("http");
var fs = require("fs");
var extract = require("./extract");
const mime = require("mime"); // detect file extensions

var handleError = function (err, res) {
  res.writeHead(404); // write eror to browser
  fs.readFile("app/error.html", function(err, data) {
    res.end(data);
  });
};

var server = http.createServer(function(req, res) {
  console.log("Responding to a request.");

  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      var mediaType = mime.getType(filePath);
      // set header to type detected
      //res.setHeader("Content-Type", "text/html"); // MIME types
      res.setHeader("Content-Type", mediaType);
      console.log(mediaType);
      res.end(data);
    }
  });
});
server.listen(3000);
