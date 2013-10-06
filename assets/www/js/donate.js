/* Donate page javascript
 */
function start_donate() {
  $('#donate').on('pagecreate', function() {
    console.log('pagecreate fired on donate');
  });
  $('#donate').on('pageshow', function() {
    console.log('pageshow fired on donate');
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
};
