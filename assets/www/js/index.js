/* Index page javascript
 */
function startApp() {
  console.log('app started');

  /* Links buttons */
  $(".goto_page").on("click", function() {
    console.log("page change");
    if (this.value === "home") {
      $(".page").addClass("hidden");
      $("#home").removeClass("hidden");
    }
    else if (this.value === "wesmaps") {
      $(".page").addClass("hidden");
      $("#wesmaps").removeClass("hidden");
    }
    else if (this.value === "wm_schedule") {
      $(".page").addClass("hidden");
      $("#wm_schedule").removeClass("hidden");
    }
    else if (this.value === "events") {
      $(".page").addClass("hidden");
      $("#events").removeClass("hidden");
    }
    else if (this.value === "hours") { 
      $(".page").addClass("hidden");
      $("#hours").removeClass("hidden");
    }
    else if (this.value === "donate") {
      $(".page").addClass("hidden");
      $("#donate").removeClass("hidden");
    }
  });
}




/* make clicking home page buttons actually work
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
*/
