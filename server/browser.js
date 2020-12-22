if (!window.WebSocket) {
	document.body.innerHTML = 'WebSocket is not supported';
}

var socket = null; //new WebSocket("ws://localhost:8081");

document.forms.wsconnect.onsubmit = function() {
    var wsurl = this.wsurl.value;
    console.log('forms.connect.onsubmit to ' + wsurl);
    socket = new WebSocket(wsurl);
    socket.onmessage = function(event) {
        console.log("socket.onmessage");
        var incomingMessage = event.data;
        showMessage(incomingMessage);
    };
    console.log(socket);
    return false;
};

document.forms.publish.onsubmit = function() {
  var outgoingMessage = this.message.value;
  console.log(socket);
  console.log("sending " + outgoingMessage);
  socket.send(outgoingMessage);
  return false;
};

function showMessage(message) {
  console.log("showMessage " + message);
  var messageElem = document.createElement('div');
  messageElem.appendChild(document.createTextNode(message));
  document.getElementById('subscribe').appendChild(messageElem);
}
