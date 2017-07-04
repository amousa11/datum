var net = require('net');
var fs = require('fs');
var unixSocket = '/tmp/datum.sock';
var net = require('net');

// This server listens on a Unix socket at /var/run/mysocket
const client = net.createConnection({path: unixSocket}, function() {
    console.log("Connected to Encryption Server via Unix Domain Socket");
});

//TODO: Handle calls to Encryption Server somewhere. This is where the client asks for keys and decryption.

client.on('data', function(data) {
    console.log(data.toString());
});

client.on('end', function() {
    console.log('Disconnected from Encryption Server')
});