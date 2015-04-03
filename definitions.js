
module.exports = function( io ) {

	return {
		init: function( socket ) {
			console.log('init handler');
			socket.on('disconnect', function() { console.log('disconnect'); } );
		}
	};
		
};