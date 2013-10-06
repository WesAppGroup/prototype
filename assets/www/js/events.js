/* This file contains javascript relating to the events page.
 */
function startEvents() {
  $('#events').on('pageinit', function() {
    console.log('pageinit fired on events page');
  });
  $('#events').on('pageshow', function() {
    console.log('pageshow fired on events page');
  });
  $('#events').on('pagecreate', function() {
    console.log('pagecreate fired on events page');
  });
};
