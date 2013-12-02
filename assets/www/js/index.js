/* Index page javascript
 */
function startApp() {

  /* Links buttons */
  $(document).on("click", ".goto_page",function(e) {
    e.preventDefault();
    console.log("page change");
    console.log($(this).attr('value'));
    if ($(this).attr('value') === "home") {
      $(".page").addClass("hidden");
      $("#home").removeClass("hidden");
    }
    else if ($(this).attr('value') === "wesmaps") {
      $(".page").addClass("hidden");
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
    else if ($(this).attr('value') === "events_list") {
      $(".page").addClass("hidden");
      $("#events_list").removeClass("hidden");
    }
    else if ($(this).attr('value') === "events_read_more") {
      $(".page").addClass("hidden");
      $("#events_read_more").removeClass("hidden");
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

