(function() {
  
  var deviceReady = false;
  var jqmInit = false;

  var initApp = function() {
    if (deviceReady && jqmInit) {
      startApp();
      startEvents();
      startWescard();
      startWesmaps();
      startRss();
      startDonate();
    }
  };

  var onDeviceReady = function() {
    deviceReady = true;
		console.log('device ready');
    //alert('dev ready');
    initApp();
		
		//makes bar at bottom blink to indicate device is ready
		var parentElement = document.getElementById('deviceready');
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');
  };

  var onMobileInit = function() {
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    jqmInit = true;
    //alert('jqm ready');
		console.log('jqm ready');
    initApp();
  };

  $(document).bind('mobileinit', onMobileInit);
  document.addEventListener("deviceready", onDeviceReady, false);
})();
