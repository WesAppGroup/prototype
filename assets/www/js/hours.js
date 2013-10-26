/* Javascript for rss feeds
 */
function startHours() {
  $('#hours').on('pagecreate', function() {
    console.log('pagecreate fired on hours');
  });
  $('#hours').on('pageshow', function() {
    console.log('pageshow fired on hours');
  });
  $('#hours').on('pageinit', function() {
    console.log('pageinit fired on hours');
  });
};
