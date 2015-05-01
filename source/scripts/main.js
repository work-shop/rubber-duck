var socket = io();

var responses = [
	'Quack!', 
	'Have you tried having coffee? Maybe a large dark?', 
	'Are you sure that\'s a real problem?', 
	'Have you thought about hiring Work-Shop for this? I really think that could help.',

];

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
	var submitfield = $('#box-submit');
	var responsefield = $('#message-log');

	function handle_input() {
		console.log('hello?')

		var message = inputfield.val();
		var timestamp = Date.now().toString();
		var response = duck( message );
		var tags = {};

		socket.emit('new-message', '', message, timestamp, response, tags);
		inputfield.val('');
	}

	function duck( message ) {

		console.log('test');

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
	}

	inputfield.on('keyup', function( e ) { if ( e.keyCode == 13 ) handle_input(); } );

	submitfield.on('click', handle_input);

	socket.on( 'new-message', newMessageHandler);

	$('#box-message').keyup(function(event){
	    if(event.keyCode == 13){
	        $('#submit').click();
	    }
	});

	$('#submit').one( "click", function() {
		$('#message-log').removeClass('hidden').css('margin-top','0')
		.addClass('slideDown')
		;
		$('.input').css('margin-top','0').addClass('slideDown');
	} );

});


