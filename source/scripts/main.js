var socket = io();

var responses = ['Quack!', 'Have you tried having coffee?', 'Are you sure that\'s a real problem?'];
var delays = [
	300,	
	1500,
	1200,
	3000,
	100,
	6000
];

$(document).ready( function() {
	var inputfield = $( '#box-message' );
	var responsefield = $('#message-log');

	function inputhandler( event ) {
		if ( event.keyCode != 13 ) return;

		console.log('hello!')

		var message = inputfield.val();
		var timestamp = Date.now().toString();
		var response = duck( message );
		var tags = {};

		socket.emit('new-message', '', message, timestamp, response, tags);
		inputfield.val('');
	}

	function duck( message ) {
		var response = randomChoice( responses );

		var thisMessegeElement = createMessageElement( message, response );
		var thisResponseElement = createResponseElement( message, '...' );

		responsefield.prepend( thisMessegeElement )
				 .delay( randomChoice( delays ) )
				 .prepend( thisResponseElement )
				 .queue( function( next ) {
				 	thisResponseElement.removeClass('typing');
				 	thisResponseElement.text( response );
				 	next();
				 });

		return response;
	}

	function randomChoice( array ) {
		return array[ Math.floor( Math.random() * array.length ) ];
	} 

	function createMessageElement( message, response ) {
		return $('<div>').attr('class', 'user call message').text( message );
	}

	function createResponseElement( message, response ) {
		return $('<div>').attr('class', 'duck response message typing').text( response );
	}

	function newMessageHandler( user, message, timestamp, response, tags ) {
		console.log( timestamp + ': ' + message + ' => ' + response);
		//$('#outside').append(createMessageElement(message,''));
	}

	inputfield.on('keyup', inputhandler );

	socket.on( 'new-message', newMessageHandler);
});


