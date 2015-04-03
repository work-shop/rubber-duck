
module.exports = function( io ) {

	function newMessageHandler( msg ) {
		console.log( 'message-received: ' + msg );
	}

	return {
		init: function( socket ) {
			console.log('init handler');
			socket.on('disconnect', function() { console.log('disconnect'); } );

			socket.on('new-message', newMessageHandler );
		}
	};

};