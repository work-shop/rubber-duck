var port 		= 8000;
var source 		= 'source';

var express 	= require('express');
var app 		= express();
var http 		= require('http').Server(app);
var path 		= require('path');

app.use('/', express.static( path.resolve( __dirname, source ) ) );

http.listen(port, function() {
	console.log( 'listening on *:' + port );
})