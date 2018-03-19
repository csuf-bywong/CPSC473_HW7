var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];
var topic = ""; // hold topic

console.log("websockets server started");

ws.on("connection", function(socket) {
  console.log("client connection established");

  // after connection, display current topic
  socket.send("*** Topic is '" + topic + "'");

  messages.forEach(function(msg) {
    socket.send(msg);
  });

  socket.on("message", function(data) {
    var x = data.split(" "); // split tokens by white space

    if (x[0] == "/topic") { // if 1st token is..
      var top = x.slice(1); // assign after 1st token to top so the topic
      topic = top.toString().replace(/,/g, " "); // convert to string and replace the value of topic
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send("*** Topic has changed to '" + topic + "'");
      });
    } else {
      console.log("message received: " + data);
      messages.push(data);
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(data);
      });
    }
  });
});
