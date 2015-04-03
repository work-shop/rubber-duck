
module.exports = function( io ) {

	function newMessageHandler( user, message, timestamp, response, tags ) {
		console.log( 'user-received: ' + user );
		console.log( 'message-received: ' + message );
		console.log( 'timestamp-received: ' + timestamp );
		console.log( 'response-received: ' + response );
		console.log( 'tags-received: ' + tags );

		// persistance stuff

		io.emit('new-message', user, message, timestamp, response, tags );
	}

	return {
		init: function( socket ) {
			console.log('init handler');
			socket.on('disconnect', function() { console.log('disconnect'); } );
			socket.on('new-message', newMessageHandler );
		}
	};

};