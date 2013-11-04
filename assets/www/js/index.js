/* Index page javascript
 */
function startApp() {
  console.log('app started');

}

// make clicking home page buttons actually work
$(document).ready(function() {
  $('#home_content ul li .ui-li').each(function() {
    $(this).on('click', function(e) {
      // prevent an endless loop of click propagation
      if(!$(e.target).is($(this).find('a'))) {
        $(this).find('a').trigger('click');
      }
    }); 
  });
});
