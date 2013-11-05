(function() {
  
  var deviceReady = false;

  var initApp = function() {
    if (deviceReady) {
      startApp();
      startEvents();
      startWesmaps();
      startHours();
      startDonate();
    }
  };

  var onDeviceReady = function() {
    deviceReady = true;
		console.log('device ready');
    //alert('dev ready');
    initApp();
		
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
