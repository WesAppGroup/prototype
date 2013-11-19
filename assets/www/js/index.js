/* Index page javascript
 */
function startApp() {

  /* Links buttons */
  $(".goto_page").on("click", function(e) {
    e.preventDefault();
    console.log("page change");
    console.log($(this).attr('value'));
    if ($(this).attr('value') === "home") {
      $(".page").addClass("hidden");
      $("#home").removeClass("hidden");
    }
    else if ($(this).attr('value') === "wesmaps") {
      $(".page").addClass("hidden");
      console.log($("#wesmaps"));
      $("#wesmaps").removeClass("hidden");
    }
    else if ($(this).attr('value') === "wm_schedule") {
      $(".page").addClass("hidden");
      $("#wm_schedule").removeClass("hidden");
    }
    else if ($(this).attr('value') === "events") {
      $(".page").addClass("hidden");
      $("#events").removeClass("hidden");
    }
    else if ($(this).attr('value') === "hours") { 
      $(".page").addClass("hidden");
      $("#hours").removeClass("hidden");
    }
    else if ($(this).attr('value') === "donate") {
      $(".page").addClass("hidden");
      $("#donate").removeClass("hidden");
    }
    else if ($(this).attr('value') === "landmarks") {
      $(".page").addClass("hidden");
      $("#landmarks").removeClass("hidden");
    }
  });

}

