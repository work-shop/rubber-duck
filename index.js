var port 		= 8000;
var source 		= 'source';

var path 		= require('path');

var express 	= require('express');
var app 		= express();
var http 		= require('http').Server(app);
var io 		= require('socket.io')(http);

var definitions	= require('./definitions')( io );


app.use('/', express.static( path.resolve( __dirname, source ) ) );

io.on('connection', function(socket) {
	console.log('connection registered.');
	definitions.init( socket );
});

http.listen(port, function() {
	console.log( 'listening on *:' + port );
})