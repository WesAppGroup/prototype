/* Javascript for WesMaps 
 */
/* AJAX request */
var httpRequest;
var coursesJSON;
var wmScroll;

var SERVER_URL = "http://stumobile0.wesleyan.edu/courses/all"

function startWesmaps() {}

$(document).ready(function() {
  $("#wm_search_button").on("click", function(e) {
    console.log("search submitted");

    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert("Failed");
      return false;
    }

    httpRequest.onreadystatechange = alertContents;
    httpRequest.open("GET", SERVER_URL, true)
    httpRequest.send();

  });

  function alertContents() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        coursesJSON = $.parseJSON(httpRequest.responseText);
        var counter = 0;
        for (var c in coursesJSON) {
          console.log(coursesJSON[c].value);
          createCourse(coursesJSON[c].value);
           /* for testing only write first 10 */
          if (counter < 10) {
            writeCourse(coursesJSON[c].value); 
          }
          counter++;
        }
      }
      else {
        alert("Failed")
      }
    }
  }

  function writeCourse(c) {
    $("#wm_courses").append("<li><div class='wm_dep_num'>" +
                              "<div class='wm_dep'>" +
                              c.value.courseDepartment +
                              "</div>" + 
                              "<div class='wm_num'>" +
                              c.value.courseNumber +
                              "</div>" +
                              "</div>" +
                              "<div class='wm_course_info'>" +
                              "<div class='wm_course_title'" +
                              c.value.courseTitle + 
                              "</div>" +
                              "<div class='wm_course_prof'>" +
                              c.value.courseProfessor +
                              "</div>" +
                              "<div class='wm_course_time'>" +
                              c.value.courseTime +
                              "</div>" +
                              "</div>" + 
                              "</li>"
                            );
    setTimeout(function() {
      wmScroll.refresh();
    }, 0);
  }
});
