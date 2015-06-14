var socket = io();

var responses = [
	'Quack!', 
	'Quack.',
	// 'Have you tried having coffee? Maybe a large dark?', 
	// 'Are you sure that\'s a real problem?', 
	// 'Have you thought about hiring Work-Shop for this? I really think that could help.',
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
	var submitfield = $('#submit');
	var responsefield = $('#message-log');
	var responselist = $('#message-log ul');
	var responding = false;

	function handle_input() {

		var message = inputfield.val();
		var timestamp = Date.now().toString();
		var response = duck( message );
		var tags = {};

		socket.emit('new-message', '', message, timestamp, response, tags);
		inputfield.val('');
		responsefield[0].scrollTop = responsefield[0].scrollHeight;
	}

	function duck( message ) {

		var thisMessegeElement = createMessageElement( message, undefined );

		if ( !responding ) {
			responding = true;

			var response = randomChoice( responses );

			var thisResponseElement = createResponseElement( message, '...' );

			responselist.append( thisMessegeElement ) 
				.delay( randomChoice( delays ) ) 
				.append( thisResponseElement ) 
				.queue( function( next ) {
				 	thisResponseElement.removeClass('typing');
				 	thisResponseElement.text( response );
				 	responding = false;
				 	next();
				});

		} else {
			responselist.children('li').last().before(thisMessegeElement);
			//responselist.append( thisMessegeElement );
			//responselist.last('li').prev('li').after( thisMessegeElement );
		}

		return response;
	}

	function randomChoice( array ) {
		return array[ Math.floor( Math.random() * array.length ) ];
	} 

	function createMessageElement( message, response ) {
		return $('<li>').attr('class', 'user call message').text( message );
	}

	function createResponseElement( message, response ) {
		return $('<li>').attr('class', 'duck response message typing').text( response );
	}

	function newMessageHandler( user, message, timestamp, response, tags ) {
		console.log( timestamp + ': ' + message + ' => ' + response);
	}

	inputfield.on('keyup', function( e ) { if ( e.keyCode == 13 ) submitfield.click(); } );

	submitfield.on('click', handle_input);

	socket.on( 'new-message', newMessageHandler);

	socket.on( 'new-message', function() {
		responsefield[0].scrollTop = responsefield[0].scrollHeight;
	});

	submitfield.one( "click", function() {
		responsefield.removeClass('hidden').css('margin-top','0')
		.addClass('slideDown')
		;
		$('.input').css('margin-top','0').addClass('slideDown');
		$('textarea').attr('placeholder','').focus();
	} );

});


