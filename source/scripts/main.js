var socket = io();

var responses = ['Quack!'];
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
		var tags = JSON.stringify({});

		socket.emit('new-message', '', message, timestamp, response, {});
		inputfield.val('');
	}

	function duck( message ) {
		var response = randomChoice( responses );

		var thisMessegeElement = createMessageElement( message, response );
		var thisResponseElement = createResponseElement( message, '...' );

		responsefield.append( thisMessegeElement )
				 .delay( randomChoice( delays ) )
				 .append( thisResponseElement )
				 .queue( function( next ) {
				 	thisResponseElement.removeClass('typing');
				 	thisResponseElement.text( response );
				 	next();
				 });

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
		// console.log( user );
		// console.log( message );
		// console.log( timestamp );
		// console.log( response );
		// console.log( tags );
	}

	inputfield.on('keyup', inputhandler );

	socket.on( 'new-message', newMessageHandler);
});


