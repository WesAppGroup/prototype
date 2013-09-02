function start_app() {
  console.log('app started');


  $('#map').on('pageshow', function(event) {
    //get devices geographical location and return a position object
    //navigator.geolocation.getCurrentPosition(on_success, on_error);

    var my_location = new google.maps.LatLng(41.556653,-72.657355);
      
    //function on_success(position) { 
      //my_location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //}
    
    //function on_error(e) {}


    //if the location could not be found we set it to the admissions office
    //function on_error() {
      //alert('Could not establish location');
    //}

    map  = new google.maps.Map(document.getElementById('map_canvas'), {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: my_location,
      zoom: 15
    }); 
  });

  $('#donate').on('pageinit', function(event) {
    var ref = window.open('http://thisiswhy.wesleyan.edu/waystogive','_blank');
    ref.addEventListener('exit', function(event) {
      alert(event.type);
      $.mobile.changePage('#home', {
        transition: 'pop'
      });
    });
  });

  /*
   * Fills Roth rss feed
   */
  $('#roth').on('pageinit', function(event) {
   
    var roth_feed = new google.feeds.Feed('http://roth.org/feed/');

    roth_feed.load(function(result) {
      if (!result.error) {
        var container = document.getElementById("roth_feed");
        for (var i = 0; i < result.feed.entries.length; i++) {
          var entry = result.feed.entries[i];
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(entry.title));
            container.appendChild(li);
        }
      }
    });
  });

  /*
   * Fills wesleying rss feed
   */
  $('#wesleying').on('pageinit', function(event) {
   
    var wesleying_feed = new google.feeds.Feed('http://wesleying.org/feed/');

    wesleying_feed.load(function(result) {
      if (!result.error) {
        var container = document.getElementById("wesleying_feed");
        for (var i = 0; i < result.feed.entries.length; i++) {
          var entry = result.feed.entries[i];
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(entry.title));
            container.appendChild(li);
        }
      }
    });
  });

  /* 
   * Fills argus rss feed
   */
  $('#argus').on('pageinit', function(event) {
   
    var argus_feed = new google.feeds.Feed('http://wesleyanargus.com/feed/');

    argus_feed.load(function(result) {
      if (!result.error) {
        var container = document.getElementById("argus_feed");
        for (var i = 0; i < result.feed.entries.length; i++) {
          var entry = result.feed.entries[i];
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(entry.title));
            container.appendChild(li);
        }
      }
    });
  });

  /*
   * Fills events calendar rss feed
   */
  $('#events').on('pageinit', function(event) {
   
    var events_feed = new google.feeds.Feed('https://wesep.wesleyan.edu/cgi-bin/custom_events_calendar/rss_calendar.cgi?category=');

    events_feed.load(function(result) {
      if (!result.error) {
        var container = document.getElementById("events_feed");
        for (var i = 0; i < result.feed.entries.length; i++) {
          var entry = result.feed.entries[i];
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(entry.title));
            container.appendChild(li);
        }
      }
    });
  });
}
