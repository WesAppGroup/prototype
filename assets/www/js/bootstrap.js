(function() {
  
  var onDeviceReady = function() {
		console.log('device ready');
    startApp();
    startEvents();
    startWesmaps();
    startHours();
    startDonate();
		
		/*makes bar at bottom blink to indicate device is ready
		var parentElement = document.getElementById('deviceready');
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');
    */
  };


  document.addEventListener("deviceready", onDeviceReady, false);
})();
