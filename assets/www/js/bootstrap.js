(function() {
  
  var searchListen = function() {
    console.log("search button clicked");
    /* Search bar for wesmaps page */
    if (!$("#wesmaps").hasClass("hidden")) {
      console.log("submitting search to wesmaps");
      $("#wm_icon").click();
    }
    /* search bar for landmarks page */
    else if (!$("#landmarks").hasClass("hidden")) {
      console.log("submitting search to landmarks");
      $("#landmarks_icon").click();
    }
  };
  var onDeviceReady = function() {
		console.log('device ready');
    startApp();
    // startEvents();
    startWesmaps();
    startMenus();
    startDonate();
    /* Search bar listener */
    document.addEventListener("searchbutton", searchListen, false);
  };


  document.addEventListener("deviceready", onDeviceReady, false);
})();
