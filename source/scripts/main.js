var socket = io();



$(document).ready( function() {
	var messageBox = $( '#message-box' );

	function inputhandler( event ) {
		if ( event.keyCode != 13 ) return;

		socket.emit('new-message', messageBox.val());

		messageBox.val('');
	}


	messageBox.on('keyup', inputhandler );
});