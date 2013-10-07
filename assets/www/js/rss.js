/* Javascript for rss feeds
 */
function startRss() {
  $('#rss').on('pagecreate', function() {
    console.log('pagecreate fired on rss');
  });
  $('#rss').on('pageshow', function() {
    console.log('pageshow fired on rss');
  });
  $('#rss').on('pageinit', function() {
    console.log('pageinit fired on rss');
  });
};
