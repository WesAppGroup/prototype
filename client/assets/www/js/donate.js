/* Donate page javascript
 */
function startDonate() {
  $('#donate').on('pagecreate', function() {
    console.log('pagecreate fired on donate');
  });
  $('#donate').on('pageshow', function() {
    console.log('pageshow fired on donate');
  });

  $('#donate').on('pageinit', function(event) {
    var ref = window.open('http://thisiswhy.wesleyan.edu/waystogive','_blank');
    ref.addEventListener('exit', function(event) {
      $.mobile.changePage('#home', {
        transition: 'pop'
      });
    });
  });
};
