/* Javascript for WesMaps 
 */
/* AJAX request */
var wmHttpRequest;
var coursesJSON;
var wmScroll;
var coursesCounter = 0;

var SERVER_URL = "http://stumobile0.wesleyan.edu/courses/all"
var SECTURNS_URL = "http://stumobile0.wesleyan.edu/sections/"

function startWesmaps() {

  var wmScroll = new iScroll('wm_wrapper', { hScrollBar : false,
                                             vScrollBar : false,
                                             hScroll    : false,
                                             bounce     : true
                                            });
  /* AJAX request for all the course information */
  console.log("search submitted");

  wmHttpRequest = new XMLHttpRequest();

  if (!wmHttpRequest) {
    alert("Failed");
    return false;
  }

  wmHttpRequest.onreadystatechange = alertContents;
  wmHttpRequest.open("GET", SERVER_URL, true)
  wmHttpRequest.send();

  function alertContents() {
    if (wmHttpRequest.readyState === 4) {
      if (wmHttpRequest.status === 200) {
        coursesJSON = $.parseJSON(wmHttpRequest.responseText);
      }
      else {
        alert("Failed")
      }
    }
  }

  $(document).on("click","#wm_icon", function() {
    coursesCounter = 0;
    $("#wm_courses").empty();

    var search = $("#wm_bar > input").val();
    console.log("SEARCH >>>>>>>>>>> " + search);
    var searchRE = new RegExp(search, 'i');
    console.log(coursesJSON);
    for (var c in coursesJSON) {

      if (coursesCounter < 10) {  //limit to 50 results
        console.log(c);
        console.log(coursesJSON[c].value);
        console.log(coursesJSON[c].value.courseTitle);
        if (searchRE.test(coursesJSON[c].value.courseTitle)) {
          writeCourse(coursesJSON[c]);
          coursesCounter++;
        }
      }
      else {
        break
      }
    }
    setTimeout(function() {
      wmScroll.refresh();
    }, 0);
  });

  function writeCourse(c) {
    coursesCounter++;
    $("#wm_courses").append("<li><div class='wm_dep_num'>" +
                              "<div class='wm_dep'>" +
                              c.value.courseDepartment +
                              "</div>" + 
                              "<div class='wm_num'>" +
                              c.value.courseNumber +
                              "</div>" +
                              "</div>" +
                              "<div class='wm_course_info'>" +
                              "<div class='wm_course_title'>" +
                              c.value.courseTitle + 
                              "</div>" +
                              "</div>" + 
                              "</li>"
                            );
  }
}
