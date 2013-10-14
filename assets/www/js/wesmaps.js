/* Javascript for WesMaps 
 */
function startWesmaps() {
  $('#wesmaps').on('pageinit', function() {
    console.log('pageinit fired on wesmaps page');
  });

  $('#wesmaps').on('pageshow', function() {
    console.log('pageshow fired on wesmaps page');
  });

  $('#wesmaps').on('pagecreate', function() {
    console.log('pagecreate fired on wesmaps page');
  });
};

