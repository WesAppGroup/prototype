/* Javascript for WesMaps 
 */
function startWescard() {
  $('#wescard').on('pageinit', function() {
    console.log('pageinit fired on wescard page');
  });

  $('#wescard').on('pageshow', function() {
    console.log('pageshow fired on wescard page');
  });

  $('#wescard').on('pagecreate', function() {
    console.log('pagecreate fired on wescard page');
  });
};

