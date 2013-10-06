/* Javascript for rss feeds
 */
function startRss() {
  $('#rss').on('pagecreate', function() {
    console.log('pagecreate fired on rss');
  });
  $('#rss').on('pageshow', function() {
    console.log('pageshow fired on rss');
  });


  /* Fills Roth rss feed
   */
  $('#roth').on('pageinit', function(event) {
   
    var rothFeed = new google.feeds.Feed('http://roth.org/feed/');

    rothFeed.load(function(result) {
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

  /* Fills wesleying rss feed
   */
  $('#wesleying').on('pageinit', function(event) {
   
    var wesleyingFeed = new google.feeds.Feed('http://wesleying.org/feed/');

    wesleyingFeed.load(function(result) {
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

  /* Fills argus rss feed
   */
  $('#argus').on('pageinit', function(event) {
   
    var argusFeed = new google.feeds.Feed('http://wesleyanargus.com/feed/');

    argusFeed.load(function(result) {
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

  /* Fills events calendar rss feed
   */
  $('#events').on('pageinit', function(event) {
   
    var eventsFeed = new google.feeds.Feed('https://wesep.wesleyan.edu/cgi-bin/custom_events_calendar/rss_calendar.cgi?category=');

    eventsFeed.load(function(result) {
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
};
