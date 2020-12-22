var http = require('http');
var Static = require('node-static');
var WebSocketServer = new require('ws');

var clients = {};
var server_name = "server-" + Math.random().toString(36).substring(7);

var webSocketServer = new WebSocketServer.Server({port: 8081});
webSocketServer.on('connection', function(ws) {
  var id = "client-" + Math.random().toString(36).substring(7);
  clients[id] = ws;
  console.log("new connection " + id + " (" + Object.keys(clients).length + " clients)");

  ws.on('message', function(message) {
    console.log('recv msg: ' + message);
    for(var key in clients) {
      console.log("push msg to " + key);
      clients[key].send(server_name + ' says "' + message + '"');
    }
  });
  ws.on('close', function() {
    delete clients[id];
    console.log('closed connection ' + id + " (" + Object.keys(clients).length + " clients)");
  });
});

var fileServer = new Static.Server('.');
http.createServer(function (req, res) {
  fileServer.serve(req, res);
}).listen(8080);

console.log(server_name + " is listening on 8080, 8081");

